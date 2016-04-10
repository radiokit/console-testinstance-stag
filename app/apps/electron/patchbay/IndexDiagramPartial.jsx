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
      loadedLinkRules: null,
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
      .select("id", "name", "direction", "references")
      .order("name", "asc")
      // .where.apply(this, clientsCondition) // FIXME
      .on("fetch", (_event, _query, data) => {
        if(this.isMounted()) {
          this.setState({
            loadedAudioInterfaces: data
          }, () => {
            this.loadLinkRules();
          });
        }
      })
      .fetch();
  },


  loadLinkRules: function() {
    let query = window.data
      .query("plumber", "Config.Routing.LinkRule")
      .select("id", "source_audio_interface_id", "destination_audio_interface_id")
      .where("source_audio_interface_id", "in", this.state.loadedAudioInterfaces.map((audioInterface) => { return audioInterface.get("id"); }).toJS())
      .on("fetch", (_event, _query, data) => {
        if(this.isMounted()) {
          this.setState({
            loadedLinkRules: data
          });
        }
      })
      .fetch();
  },


  componentDidMount: function() {
    this.loadClients();
  },





  render: function() {
    if(this.state.loadedClients === null || this.state.loadedAudioInterfaces === null || this.state.loadedLinkRules === null) {
      return (
        <div>Loading</div>
      ); // FIXME use LoadingWidget

    } else {

      return (
        <RoutingDiagramCanvas clients={this.state.loadedClients} audioInterfaces={this.state.loadedAudioInterfaces} linkRules={this.state.loadedLinkRules} />
      );
    }
  }
});
