import React from 'react';
import Immutable from 'immutable';

import Toolbar from '../../../widgets/admin/toolbar_widget.jsx';
import ToolbarButton from '../../../widgets/admin/toolbar_button_widget.jsx';
import ToolbarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import DevicesToolbar from './DevicesToolbar.jsx';


import RoutingDiagramClientLayer from './RoutingDiagramClientLayer.jsx';
import RoutingDiagramLinkRuleLayer from './RoutingDiagramLinkRuleLayer.jsx';


export default React.createClass({
  propTypes: {
    clients: React.PropTypes.object.isRequired,
    audioInterfaces: React.PropTypes.object.isRequired,
    linkRules: React.PropTypes.object.isRequired,
    onClientDragStop: React.PropTypes.func,
  },


  getInitialState: function() {
    return {
      selectedAudioInterface: null,
      selectedClient: null,
      selectedLinkRule: null,
    };
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


  onAudioInterfaceClick: function(audioInterface) {
    if(this.state.selectedAudioInterface === null) {
      this.setState({
        selectedAudioInterface: audioInterface,
      });
    } else {
      if(this.state.selectedAudioInterface.get("direction") !== audioInterface.get("direction")) {
        let sourceAudioInterface;
        let destinationAudioInterface;

        if(this.state.selectedAudioInterface.get("direction") === "capture") {
          sourceAudioInterface = this.state.selectedAudioInterface;
          destinationAudioInterface = audioInterface;
        } else {
          sourceAudioInterface = audioInterface;
          destinationAudioInterface = this.state.selectedAudioInterface;
        }

        this.setState({
          selectedAudioInterface: null,
        }, () => {
          window.data
            .record("plumber", "Config.Routing.LinkRule")
            .create({
              source_audio_interface_id: sourceAudioInterface.get("id"),
              destination_audio_interface_id: destinationAudioInterface.get("id"),
            });
        });

      } else {
        this.setState({
          selectedAudioInterface: audioInterface,
        });
      }
    }
  },


  onLinkRuleClick: function(linkRule) {
    if(this.state.selectedLinkRule) {
      if(this.state.selectedLinkRule.get("id") === linkRule.get("id")) {
        this.setState({
          selectedLinkRule: null,
        });

      } else {
        this.setState({
          selectedLinkRule: linkRule,
        });
      }

    } else {
      this.setState({
        selectedClient: null,
        selectedLinkRule: linkRule
      });
    }
  },


  onClientBoxClick: function(client) {
    if(this.state.selectedClient) {
      if(this.state.selectedClient.get("id") === client.get("id")) {
        this.setState({
          selectedClient: null,
        });

      } else {
        this.setState({
          selectedClient: client,
        });
      }

    } else {
      this.setState({
        selectedLinkRule: null,
        selectedClient: client
      });
    }
  },


  componentWillMount: function() {
    // We do not use state as it's updates are not not happening immediately
    // which results in sluggish UI
    this.clientsCoordinates = new Immutable.Map();
  },


  componentWillUnount: function() {
    delete this.clientsCoordinates;
  },


  getSelectedRecord: function() {
    var selectedRecord = {"record": null, "model": "no-model", "id": "no-id"};

    if(this.state.selectedLinkRule || this.state.selectedClient) {
      if(this.state.selectedLinkRule){
        selectedRecord["record"] = this.state.selectedLinkRule
        selectedRecord["id"]     = this.state.selectedLinkRule.get('id')
        selectedRecord["model"]  = "Config.Routing.LinkRule"
      } else {
        selectedRecord["record"] = this.state.selectedClient
        selectedRecord["id"]     = this.state.selectedClient.get('id'),
        selectedRecord["model"]  = "Client.Standalone"
      };
    };

    return(selectedRecord);
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
      <div>
        <Toolbar>
          <DevicesToolbar 
            selectedRecord={this.getSelectedRecord()}
          />
        </Toolbar>

        <svg version="1.1" height="560" width="100%">
          <RoutingDiagramClientLayer
            clients={this.props.clients}
            audioInterfaces={this.props.audioInterfaces}
            clientsCoordinates={this.clientsCoordinates}
            onAudioInterfaceClick={this.onAudioInterfaceClick}
            selectedAudioInterface={this.state.selectedAudioInterface}
            onClientDragMove={this.onClientDragMove}
            onClientDragStop={this.onClientDragStop}
            onClientBoxClick={this.onClientBoxClick}
            selectedClient={this.state.selectedClient} />
          <RoutingDiagramLinkRuleLayer
            clients={this.props.clients}
            audioInterfaces={this.props.audioInterfaces}
            linkRules={filteredLinkRules}
            selectedLinkRule={this.state.selectedLinkRule}
            onLinkRuleClick={this.onLinkRuleClick}
            clientsCoordinates={this.clientsCoordinates} />
        </svg>
      </div>
    );
  }
});
