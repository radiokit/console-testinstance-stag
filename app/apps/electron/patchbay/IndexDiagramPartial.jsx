import React from 'react';
import Immutable from 'immutable';
import { Data } from 'radiokit-api';

import RoutingDiagramCanvas from './RoutingDiagramCanvas.jsx';


export default React.createClass({
  contextTypes: {
    currentUserAccount: React.PropTypes.object.isRequired,
  },


  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
  },


  getInitialState: function() {
    return {
      loadedClients: null,
      loadedAudioInterfaces: null,
    }
  },


  loadClients: function() {
    window.data
      .query("auth", "Client.Standalone")
      .select("id", "name", "extra")
      .where("application", "eq", "electron")
      .where("account_id", "eq", this.context.currentUserAccount.get("id"))
      .on("fetch", (_event, _query, data) => {
        if(this.isMounted()) {
          this.setState({
            loadedClients: data
          }, () => {
            this.loadAudioInterfaces();
          });
        }
      })
      .fetch();
  },


  loadAudioInterfaces: function() {
    let clientsGlobalIDs = this.state.loadedClients.map((client) => { return Data.buildRecordGlobalID("auth", "Client.Standalone", client.get("id")); }).toJS();
    let clientsCondition = ["references", "din", "owner"].concat(clientsGlobalIDs)

    let query = window.data
      .query("plumber", "Resource.Architecture.AudioInterface")
      .select("id", "name", "direction", "config_routing_link_rules_as_source", "config_routing_link_rules_as_destination", "references")
      .joins("config_routing_link_rules_as_source")
      .joins("config_routing_link_rules_as_destination")
      .order("name", "asc")
      // .where.apply(this, clientsCondition)
      .on("fetch", (_event, _query, data) => {
        if(this.isMounted()) {
          this.setState({
            loadedAudioInterfaces: data
          });
        }
      })
      .fetch();
  },


  componentDidMount: function() {
    this.loadClients();
  },


  buildMergedClients: function(clients, audioInterfaces) {
    return clients.map((client) => {
      let audioInterfacesOfClient = audioInterfaces.filter((audioInterface) => {
        return (
          audioInterface.has("references") && audioInterface.get("references") !== null &&
          audioInterface.get("references").has("owner") && audioInterface.get("references").has("owner") !== null &&
          audioInterface.get("references").get("owner") === Data.buildRecordGlobalID("auth", "Client.Standalone", client.get("id"))
        );
      });

      return client.set("audio_interfaces", audioInterfacesOfClient);
    });
  },


  render: function() {
    if(this.state.loadedClients === null || this.state.loadedAudioInterfaces === null) {
      return (
        <div>Loading</div>
      ); // FIXME use LoadingWidget

    } else {
      let mergedClients = this.buildMergedClients(this.state.loadedClients, this.state.loadedAudioInterfaces);

      return (
        <RoutingDiagramCanvas clients={mergedClients} />
      );
    }
  }
});
