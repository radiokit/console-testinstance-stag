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
      .select("id", "name")
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

    let query = window.data
      .query("plumber", "Resource.Architecture.AudioInterface")
      .select("id", "name", "config_routing_link_rules_as_source", "config_routing_link_rules_as_destination")
      .joins("config_routing_link_rules_as_source")
      .joins("config_routing_link_rules_as_destination")
      .where.apply(this, ["references", "din", "owner"].concat(clientsGlobalIDs))
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


  render: function() {
    if(this.state.loadedClients === null || this.state.loadedAudioInterfaces === null) {
      return (
        <div>Loading</div>
      ); // FIXME

    } else {
      return (
        <RoutingDiagramCanvas clients={this.state.loadedClients} audioInterfaces={this.state.loadedAudioInterfaces} />
      );
    }
  }
});
