import React from 'react';
import {
  Map,
} from 'immutable';

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


  getInitialState() {
    return {
      selectedAudioInterface: null,
      selectedClient: null,
      selectedLinkRule: null,
    };
  },


  onClientDragMove(client, x, y) {
    this.clientsCoordinates =
      this.clientsCoordinates.set(client.get('id'), Map({ x, y }));
    this.forceUpdate();
  },


  onClientDragStop(client, x, y) {
    if (this.props.onClientDragStop) {
      this.props.onClientDragStop(client, x, y);
    }
  },


  getLinkRulesOfAudioInterface(audioInterface) {
    return this.props.linkRules.filter((linkRule) => {
      return (
        linkRule.get('source_audio_interface_id') === audioInterface.get('id')
      );
    });
  },


  onAudioInterfaceClick(audioInterface) {
    if (this.state.selectedAudioInterface === null) {
      this.setState({
        selectedAudioInterface: audioInterface,
        selectedLinkRule: null,
        selectedClient: null,
      });
    } else {
      if (this.state.selectedAudioInterface.get('id') === audioInterface.get('id')) {
        this.setState({
          selectedAudioInterface: null,
        });
      } else {
        if (this.state.selectedAudioInterface.get('direction') !== audioInterface.get('direction')) {
          let sourceAudioInterface;
          let destinationAudioInterface;

          if (this.state.selectedAudioInterface.get('direction') === 'capture') {
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
              .record('plumber', 'Config.Routing.LinkRule')
              .create({
                source_audio_interface_id: sourceAudioInterface.get('id'),
                destination_audio_interface_id: destinationAudioInterface.get('id'),
              });
          });
        } else {
          this.setState({
            selectedAudioInterface: audioInterface,
          });
        }
      }
    }
  },


  onLinkRuleClick(linkRule) {
    if (this.state.selectedLinkRule) {
      if (this.state.selectedLinkRule.get('id') === linkRule.get('id')) {
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
        selectedAudioInterface: null,
        selectedLinkRule: linkRule,
      });
    }
  },


  onClientBoxClick(client, x, y) {
    const clientX = client.get('extra').get('electron').get('diagram').get('x');
    const clientY = client.get('extra').get('electron').get('diagram').get('y');

    if (clientX === x && clientY === y) {
      if (this.state.selectedClient) {
        if (this.state.selectedClient.get('id') === client.get('id')) {
          this.setState({
            selectedClient: null,
          });
        } else {
          this.setState({
            selectedClient: client,
            selectedLinkRule: null,
            selectedAudioInterface: null,
          });
        }
      } else {
        this.setState({
          selectedLinkRule: null,
          selectedAudioInterface: null,
          selectedClient: client,
        });
      }
    }
  },


  componentWillMount() {
    // We do not use state as it's updates are not not happening immediately
    // which results in sluggish UI
    this.clientsCoordinates = Map();
  },


  getSelectedRecord() {
    if (this.state.selectedLinkRule) {
      return ({
        record: this.state.selectedLinkRule,
        id: this.state.selectedLinkRule.get('id'),
        model: 'Config.Routing.LinkRule',
        app: 'plumber',
        active: this.state.selectedLinkRule.get('active').toString(),
      });
    }

    if (this.state.selectedClient) {
      return ({
        record: this.state.selectedClient,
        id: this.state.selectedClient.get('id'),
        model: 'Client.Standalone',
        app: 'auth',
      });
    }

    if (this.state.selectedAudioInterface) {
      return ({
        record: this.state.selectedAudioInterface,
        id: this.state.selectedAudioInterface.get('id'),
        model: 'Resource.Architecture.AudioInterface',
        app: 'plumber',
      });
    }

    return { record: null, model: 'no-model', id: 'no-id', app: 'no-app' }; // FIXME use undefined
  },


  componentWillUnmount() {
    delete this.clientsCoordinates;
  },

  onUpdateSuccess() {
    this.setState({
      selectedLinkRule: null,
      selectedClient: null,
      selectedAudioInterface: null,
    });
  },

  render() {
    let filteredLinkRules = this.props.linkRules
      .filter((linkRule) => {
        return ( // FIXME should be obsolete if backend was returing limited data
          this.props.audioInterfaces.find((audioInterface) => { return audioInterface.get('id') === linkRule.get('source_audio_interface_id'); }) ||
          this.props.audioInterfaces.find((audioInterface) => { return audioInterface.get('id') === linkRule.get('destination_audio_interface_id'); })
        ) && (
          linkRule.get('source_audio_interface_id') !== null &&
          linkRule.get('destination_audio_interface_id') !== null
        );
      });


    // Render whole canvas, clients above link rules
    return (
      <div>
        <DevicesToolbar
          selectedRecord={this.getSelectedRecord()}
          onUpdateSuccess={this.onUpdateSuccess}
        />

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
            selectedClient={this.state.selectedClient}
          />
          <RoutingDiagramLinkRuleLayer
            clients={this.props.clients}
            audioInterfaces={this.props.audioInterfaces}
            linkRules={filteredLinkRules}
            selectedLinkRule={this.state.selectedLinkRule}
            onLinkRuleClick={this.onLinkRuleClick}
            clientsCoordinates={this.clientsCoordinates}
          />
        </svg>
      </div>
    );
  }
});
