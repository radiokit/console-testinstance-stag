import React from 'react';
import { Link } from 'react-router';

import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';
import CardBody from '../../../widgets/admin/card_body_widget.jsx';
import CardHeader from '../../../widgets/admin/card_header_widget.jsx';
import CardToolBar from '../../../widgets/admin/card_tool_bar_widget.jsx';
import CardToolBarCreate from '../../../widgets/admin/card_tool_bar_create_widget.jsx';
import Table from '../../../widgets/admin/table_widget.jsx';
import TableActionShow from '../../../widgets/admin/table_action_show.jsx';
import Alert from '../../../widgets/admin/alert_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Loading from '../../../widgets/general/loading_widget.jsx';
import TagSelector from '../../../widgets/vault/tag_selector_widget.jsx';

import RoutingHelper from '../../../helpers/routing_helper.js';
import VaultHelper from '../../../helpers/vault_helper.js';

import OverviewTab from './show_overview_tab.jsx';
import MetadataTab from './show_metadata_tab.jsx';

export default React.createClass({
  getInitialState: function() {
    return {
      currentRepository: null,
      loadedRepository: false,
      currentFile: null,
      loadedFile: false,
      loadingError: false,
    };
  },


  componentDidMount: function() {
    VaultHelper.loadRepository(this, "music");
    this.loadFile();
  },


  loadFile: function() {
    window.data
      .query("vault", "Data.Record.File")
      .select("id", "name")
      .where("id", "eq", this.props.params.fileId)
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({
            loadingError: true
          })
        }
      }).on("update", (_, response) => {
        if(this.isMounted()) {

          if(response.getData().count() != 0) {
            this.setState({
              currentFile: response.getData().first(),
              loadedFile: true
            });

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
      if(this.state.loadedRepository === false || this.state.loadedFile === false) {
        return (<Loading info={true} infoTextKey="apps.music.files.show.loading"/>);

      } else {
        var that = this;
        return (
          <Section>
            <GridRow>
              <GridCell size="large" center={true}>
                <Card contentPrefix="apps.music.files.show" cardTabs={["overview", "metadata"]}>
                  <CardHeader headerText={this.state.currentFile.get("name")} />
                  <CardBody>
                    <OverviewTab currentFile={this.state.currentFile} currentRepository={this.state.currentRepository} />
                    <MetadataTab currentFile={this.state.currentFile} currentRepository={this.state.currentRepository} />
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
