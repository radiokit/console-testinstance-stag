import React from 'react';

import Loading from '../../../widgets/general/loading_widget.jsx';
import Alert from '../../../widgets/admin/alert_widget.jsx';
import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import TableBrowser from '../../../widgets/admin/table_browser_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';
import CardBody from '../../../widgets/admin/card_body_widget.jsx';
import CardHeader from '../../../widgets/admin/card_header_widget.jsx';
import ToolBar from '../../../widgets/admin/toolbar_widget.jsx';
import ToolBarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolBarButton from '../../../widgets/admin/toolbar_button_widget.jsx';


export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    app: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
    tabs: React.PropTypes.arrayOf(React.PropTypes.string),
  },


  contextTypes: {
    history: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
  },


  getInitialState: function() {
    return {
      record: null,
      loaded: false,
      error: false,
    }
  },


  onBackClick: function(e) {
    e.preventDefault();
    let currentLocation = this.context.location.pathname.split("/");
    currentLocation.pop();
    currentLocation.pop();
    let newLocation = currentLocation.join("/") + "/index";
    this.context.history.replaceState(null, newLocation);
  },


  componentDidMount: function() {
    this.recordQuery = window.data
      .record(this.props.app, this.props.model, this.context.params.id)
      .on("loaded", (_eventName, _record, data) => {
        if(this.isMounted()) {
          this.setState({
            record: data,
            loaded: true,
          });
        }
      })
      .on("loading", () => {
        if(this.isMounted()) {
          this.setState({
            loaded: false,
          });
        }
      })
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({
            loaded: true,
            error: true,
          });
        }
      })
      .show();
  },


  componentWillUnmount: function() {
    this.recordQuery.teardown();
  },


  render: function() {
    if(this.state.loaded === false) {
      return <Loading />;

    } else {
      if(this.state.error === false) {
        return (
          <Section>
            <GridRow>
              <GridCell size="large" center={true}>
                <Card contentPrefix={`${this.props.contentPrefix}.show`} cardTabs={this.props.tabs}>
                  <CardHeader headerText={this.state.record.get("name")} />
                  <CardBody>
                    <ToolBarGroup>
                      <ToolBarButton icon="keyboard-backspace" labelTextKey={`${this.props.contentPrefix}.show.actions.back`} onClick={this.onBackClick} />
                    </ToolBarGroup>
                    <ToolBarGroup>
                      <ToolBarButton icon="delete" labelTextKey={`${this.props.contentPrefix}.show.actions.delete`} onClick={this.onDeleteButtonClick} />
                    </ToolBarGroup>
                  </CardBody>
                </Card>
              </GridCell>
            </GridRow>
          </Section>
        );
      } else {
        return <Alert type="error" infoTextKey="general.errors.communication.general" />;
      }
    }
  }
});
