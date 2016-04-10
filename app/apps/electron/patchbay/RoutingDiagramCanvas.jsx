import React from 'react';
import Immutable from 'immutable';
import { Data } from 'radiokit-api';


import RoutingDiagramClientLayer from './RoutingDiagramClientLayer.jsx';
import RoutingDiagramLinkRuleLayer from './RoutingDiagramLinkRuleLayer.jsx';


export default React.createClass({
  propTypes: {
    clients: React.PropTypes.object.isRequired,
    audioInterfaces: React.PropTypes.object.isRequired,
    linkRules: React.PropTypes.object.isRequired,
    onClientDragStop: React.PropTypes.func,
  },


  getLinkRulesOfAudioInterface: function(audioInterface) {
    return this.props.linkRules.filter((linkRule) => {
      return (
        linkRule.get("source_audio_interface_id") === audioInterface.get("id")
      );
    });
  },


  onClientDragMove: function(client, x, y) {
    this.clientsCoordinates = this.clientsCoordinates.set(client.get("id"), new Immutable.Map({x: x, y: y}));
    this.forceUpdate();
  },


  onClientDragStop: function(client, x, y) {
    if(this.props.onClientDragStop) {
      this.props.onClientDragStop(client, x, y);
    }
  },


  onAudioInterfaceClick: function() {
    // TODO
  },


  componentWillMount: function() {
    // We do not use state as it's updates are not not happening immediately
    // which results in sluggish UI
    this.clientsCoordinates = new Immutable.Map();
  },


  componentWillUnount: function() {
    delete this.clientsCoordinates;
  },


  render: function() {



    let filteredLinkRules = this.props.linkRules
      .filter((linkRule) => {
        return ( // FIXME should be obsolete if backend was returing limited data
          this.props.audioInterfaces.find((audioInterface) => { return audioInterface.get("id") === linkRule.get("source_audio_interface_id"); }) ||
          this.props.audioInterfaces.find((audioInterface) => { return audioInterface.get("id") === linkRule.get("destination_audio_interface_id"); })
        ) && (
          linkRule.get("source_audio_interface_id") !== null &&
          linkRule.get("destination_audio_interface_id") !== null
        );
      });


    // Render whole canvas, clients above link rules
    return (
      <svg version="1.1" height="600" width="100%">
        <RoutingDiagramClientLayer
          clients={this.props.clients}
          audioInterfaces={this.props.audioInterfaces}
          clientsCoordinates={this.clientsCoordinates}
          onClientDragMove={this.onClientDragMove}
          onClientDragStop={this.onClientDragStop} />
        <RoutingDiagramLinkRuleLayer
          clients={this.props.clients}
          audioInterfaces={this.props.audioInterfaces}
          linkRules={filteredLinkRules}
          clientsCoordinates={this.clientsCoordinates} />
      </svg>
    );
  }
});
