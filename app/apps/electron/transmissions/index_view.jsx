import React from 'react';
import { Data } from 'radiokit-api';

import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Loading from '../../../widgets/general/loading_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';
import Alert from '../../../widgets/admin/alert_widget.jsx';
import VolumeTracker from '../../../widgets/general/volume_tracker_widget.jsx';


export default React.createClass({
  contextTypes: {
    currentUserAccount: React.PropTypes.object.isRequired,
  },


  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
  },


  getDefaultProps: function() {
    return {
      contentPrefix: "apps.electron.transmissions",
    };
  },


  getInitialState: function() {
    return {
      loadedClients: false,
      availableClients: null,
      loadedInputsRtp: false,
      availableInputsRtp: null,
    };
  },


  componentDidMount: function() {
    this.loadClients();
  },


  loadClients: function() {
    window.data
      .query("auth", "Client.Standalone")
      .select("id", "name")
      .where("account_id", "eq", this.context.currentUserAccount.get("id"))
      .on("fetch", (_event, _query, data) => {
        if(this.isMounted()) {
          this.setState({
            loadedClients: true,
            availableClients: data
          }, () => {
            this.loadInputs();
          });
        }
      })
      .fetch();
  },


  loadInputs: function() {
    window.data
      .query("plumber", "Media.Input.Stream.RTP")
      .select("id", "audio_interface")
      .joins("audio_interface")
      .on("fetch", (_event, _query, data) => {
        if(this.isMounted()) {
          this.setState({
            loadedInputsRtp: true,
            availableInputsRtp: data
          });
        }
      })
      .enableAutoUpdate();
  },


  render: function() {
    if(this.state.loadedClients === false) {
      return (<Loading info={true} infoTextKey={this.props.contentPrefix + ".loading"} />);
    }

    if(this.state.loadedInputsRtp === false) {
      return (<Loading info={true} infoTextKey={this.props.contentPrefix + ".loading"} />);
    }

    if(this.state.availableClients.size === 0) {
      return (<Alert type="warning" fullscreen={true} infoTextKey={`${this.props.contentPrefix}.errors.no_clients`} />);
    }

    if(this.state.availableInputsRtp.size === 0) {
      return (<Alert type="warning" fullscreen={true} infoTextKey={`${this.props.contentPrefix}.errors.no_transmissions`} />);
    }

    return (
      <Section>
        {() => {
          return this.state.availableInputsRtp.map((input) => {
            let clientName = this.state.availableClients.find((client) => { return Data.buildRecordGlobalID("auth", "Client.Standalone", client.get("id")) === input.get("audio_interface").get("references").get("owner") }).get("name");
            let audioInterfaceName = input.get("audio_interface").get("name");
            let name = `${clientName}: ${audioInterfaceName}`;

            return (
              <GridRow key={input.get("id")}>
                <GridCell size="large" center={true}>
                  <Card headerText={name}>
                    <VolumeTracker model="Media.Input.Stream.RTP" record={input} />
                  </Card>
                </GridCell>
              </GridRow>
            );
          });

        }()}
      </Section>
    );
  }
});
