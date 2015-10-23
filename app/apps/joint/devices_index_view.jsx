import React from 'react';

import Grid from '../../widgets/admin/grid_widget.jsx';
import Card from '../../widgets/admin/card_widget.jsx';
import CardBody from '../../widgets/admin/card_body_widget.jsx';
import Table from '../../widgets/admin/table_widget.jsx';
import Alert from '../../widgets/admin/alert_widget.jsx';
import Section from '../../widgets/admin/section_widget.jsx';
import Loading from '../../widgets/general/loading_widget.jsx';

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
      .on("update", (_, query) => {
        if(this.isMounted()) { 
          this.setState({ 
            availableDevices: query.getData(),
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
            <Grid size="medium">
              <Card header={true} headerTextKey="apps.joint.devices.index.header">
                <CardBody>
                  <Table attributes={["name", "os_type"]} contentPrefix="apps.joint.devices.index.table" records={this.state.availableDevices} />
                </CardBody>
              </Card>
            </Grid>
          </Section>
        );
        // return (<div>{this.state.availableDevices.map(x => <Channel key={`joint.channel.${x.get("id")}`} broadcastChannel={x}/>)}</div>);
      }
    } 
  }
});