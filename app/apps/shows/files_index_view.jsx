import React from 'react';

import GridRow from '../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../widgets/admin/grid_cell_widget.jsx';
import Card from '../../widgets/admin/card_widget.jsx';
import CardBody from '../../widgets/admin/card_body_widget.jsx';
import CardHeader from '../../widgets/admin/card_header_widget.jsx';
import CardToolBar from '../../widgets/admin/card_tool_bar_widget.jsx';
import CardToolBarCreate from '../../widgets/admin/card_tool_bar_create_widget.jsx';
import Table from '../../widgets/admin/table_widget.jsx';
import TableActionShow from '../../widgets/admin/table_action_show.jsx';
import Alert from '../../widgets/admin/alert_widget.jsx';
import Section from '../../widgets/admin/section_widget.jsx';
import Loading from '../../widgets/general/loading_widget.jsx';
import RoutingHelper from '../../helpers/routing_helper.js';
import AccountHelper from '../../helpers/account_helper.js';

export default React.createClass({
  getInitialState: function() {
    return {
      recordRepository: null,
      availableFiles: null,
      loadedFiles: false
    };
  },


  componentDidMount: function() {
    window.data
      .query("vault", "Record.Repository")
      .select("id")
      .where("references", "deq", "user_account_id", AccountHelper.getCurrentAccountIdFromContext(this))
      .where("references", "deq", "role", "shows")
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({
            loadingError: true
          })
        }
      }).on("update", (_, query) => {
        if(this.isMounted()) {

          if(query.getData().count() != 0) {
            this.setState({
              recordRepository: query.getData().first()
            });

            window.data
              .query("vault", "Record.File")
              .select("id", "name")
              .where("record_repository_id", "eq", query.getData().first().get("id"))
              .on("error", () => {
                if(this.isMounted()) {
                  this.setState({
                    loadingError: true
                  })
                }
              }).on("update", (_, query) => {
                if(this.isMounted()) {
                  this.setState({
                    availableFiles: query.getData(),
                    loadedFiles: true
                  })
                }
              }).fetch();

          } else {
            this.setState({
              loadingError: true
            })
          }
        }
      }).fetch();

  },


  render: function() {
    if(this.state.loadingError) {
      return (<Alert type="error" fullscreen={true} infoTextKey="general.errors.communication.general" />);

    } else {
      if(this.state.loadedFiles === false) {
        return (<Loading info={true} infoTextKey="apps.shows.files.index.loading"/>);

      } else if(this.state.availableFiles.size === 0) {
        return (<Alert type="error" fullscreen={true} infoTextKey="apps.shows.files.index.none"/>);

      } else {
        var that = this;
        return (
          <Section>
            <GridRow>
              <GridCell size="medium" center={true}>
                <Card>
                  <CardHeader headerTextKey="apps.shows.files.index.header">
                    <CardToolBar>
                      <CardToolBarCreate path={RoutingHelper.apps.shows.files.create(this)} hintTooltipKey="apps.shows.files.create.form.header" />
                    </CardToolBar>
                  </CardHeader>
                  <CardBody>
                    <Table attributes={{ name: { renderer: "text", props: { context: this, link: RoutingHelper.apps.shows.files.show } }}} actions={[]} contentPrefix="apps.shows.files.index.table" records={this.state.availableFiles} />
                  </CardBody>
                </Card>
              </GridCell>
            </GridRow>
          </Section>
        );
      }
    }
  }
});
