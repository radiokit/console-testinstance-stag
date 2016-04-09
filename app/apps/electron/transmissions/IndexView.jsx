import React from 'react';
import Immutable from 'immutable';
import { Data } from 'radiokit-api';
import Counterpart from 'counterpart';

import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Loading from '../../../widgets/general/loading_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';
import Alert from '../../../widgets/admin/alert_widget.jsx';
import VolumeTracker from '../../../widgets/general/VolumeTrackerWidget.jsx';


Counterpart.registerTranslations("en", require('./IndexView.locale.en.js'));
Counterpart.registerTranslations("pl", require('./IndexView.locale.pl.js'));


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
      availableClients: new Immutable.Seq().toIndexedSeq(),
      loadedInputsRtp: false,
      availableInputsRtp: new Immutable.Seq().toIndexedSeq(),
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
    this.inputsQuery = window.data
      .query("plumber", "Media.Input.Stream.RTP")
      .select("id", "audio_interface") // FIXME add where!
      .joins("audio_interface")
      .order("id", "asc") // Better than nothing, FIXME should be inserted_at asc
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


  componentWillUnmount: function() {
    if(this.inputsQuery) {
      this.inputsQuery.teardown();
    }
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
            if(input.has("audio_interface") && input.get("audio_interface") !== null && input.get("audio_interface").has("references") && input.get("audio_interface").get("references") !== null) {
              let audioInterfaceOwnerGlobalID = input.get("audio_interface").get("references").get("owner");
              let audioInterfaceOwner = this.state.availableClients.find((client) => {
                let clientGlobalID = Data.buildRecordGlobalID("auth", "Client.Standalone", client.get("id"));
                return clientGlobalID === audioInterfaceOwnerGlobalID;
              });

              let clientName = audioInterfaceOwner.get("name");
              let audioInterfaceName = input.get("audio_interface").get("name");
              let name = `${clientName}: ${audioInterfaceName}`;
            } else {
              // It is unlikely that electron client will not be bound to
              // any audio interface but let's handle this
              let name = input.get("id");
            }

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
