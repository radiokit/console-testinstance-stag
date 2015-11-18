import React from 'react';

import GridRow from '../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../widgets/admin/grid_cell_widget.jsx';
import Card from '../../widgets/admin/card_widget.jsx';
import CardBody from '../../widgets/admin/card_body_widget.jsx';
import CardHeader from '../../widgets/admin/card_header_widget.jsx';
import CardToolBar from '../../widgets/admin/card_tool_bar_widget.jsx';
import CardToolBarCreate from '../../widgets/admin/card_tool_bar_create_widget.jsx';
import Table from '../../widgets/admin/table_widget.jsx';
import Alert from '../../widgets/admin/alert_widget.jsx';
import Section from '../../widgets/admin/section_widget.jsx';
import Loading from '../../widgets/general/loading_widget.jsx';
import RoutingHelper from '../../helpers/routing_helper.js';

export default React.createClass({
  getInitialState: function() {
    return { 
      availableDevices: null,
      loadedDevices: false,
      loadingError: false
    };
  },


  componentDidMount: function() {
    window.data
      .query("plumber", "Resource.Architecture.ClientNode")
      .select("id", "name")
      .order("name", "asc")
      .on("error", () => {
        if(this.isMounted()) { 
          this.setState({ 
            loadingError: true
          })
        }
      })
      .on("fetch", (_event, _query, data) => {
        if(this.isMounted()) { 
          this.setState({ 
            availableDevices: data,
            loadedDevices: true
          }) 
        }
      })
      .fetch();
  },


  render: function() {
    if(this.state.loadingError) {
      return (<Alert type="error" fullscreen={true} infoTextKey="general.errors.communication.general" />);

    } else {
      if(this.state.loadedDevices === false) {
        return (<Loading info={true} infoTextKey="apps.joint.devices.index.loading"/>);

      } else if(this.state.availableDevices.size === 0) {
        return (<Alert type="error" fullscreen={true} infoTextKey="apps.joint.devices.index.none"/>);

      } else {
        return (
          <Section>
            <GridRow>
              <GridCell size="medium" center={true}>
                <Card>
                  <CardHeader headerTextKey="apps.joint.devices.index.header">
                    <CardToolBar>
                      <CardToolBarCreate path={RoutingHelper.apps.joint.devices.create(this)} hintTooltipKey="apps.joint.devices.create.form.header" />
                    </CardToolBar>
                  </CardHeader>
                  <CardBody>
                    <Table attributes={["name", "os_type"]} contentPrefix="apps.joint.devices.index.table" records={this.state.availableDevices} />
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