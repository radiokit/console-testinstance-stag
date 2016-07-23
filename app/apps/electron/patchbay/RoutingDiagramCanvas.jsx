import React from 'react';
import {
  Map,
} from 'immutable';

import DevicesToolbar from './DevicesToolbar.jsx';


import RoutingDiagramClientLayer from './RoutingDiagramClientLayer.jsx';
import RoutingDiagramLinkLayer from './RoutingDiagramLinkLayer.jsx';


export default React.createClass({
  propTypes: {
    clients: React.PropTypes.object.isRequired,
    audioInterfaces: React.PropTypes.object.isRequired,
    links: React.PropTypes.object.isRequired,
    onClientDragStop: React.PropTypes.func,
  },


  getInitialState() {
    return {
      selectedAudioInterface: null,
      selectedClient: null,
      selectedLink: null,
      draggingClient: false,
      lastSelectedClient: null,
    };
  },

  onClientDragStart(client) {
    this.setState({
      draggingClient: true,
      dragStartX: client.get('extra')
    })
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

    this.setState({
      draggingClient: false,
    })
  },


  onAudioInterfaceClick(audioInterface) {
    if (this.state.selectedAudioInterface === null) {
      this.setState({
        selectedAudioInterface: audioInterface,
        selectedLink: null,
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
              .record('medium', 'Endpoint.UDP')
              .create({
                references: {
                  'electron.source_audio_interface_id': sourceAudioInterface.get('id'),
                  'electron.destination_audio_interface_id': destinationAudioInterface.get('id'),
                },
                extra: {
                  electron: {
                    bitrate: 64,
                    latency: 100,
                    audio_type: 'generic',
                  },
                }
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


  onLinkClick(link) {
    if (this.state.selectedLink) {
      if (this.state.selectedLink.get('id') === link.get('id')) {
        this.setState({
          selectedLink: null,
        });
      } else {
        this.setState({
          selectedLink: link,
        });
      }
    } else {
      this.setState({
        selectedClient: null,
        selectedAudioInterface: null,
        selectedLink: link,
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
            lastSelectedClient: client,
            selectedLink: null,
            selectedAudioInterface: null,
          });
        }
      } else {
        this.setState({
          selectedLink: null,
          selectedAudioInterface: null,
          selectedClient: client,
          lastSelectedClient: client,
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
    if (this.state.selectedLink) {
      return ({
        record: this.state.selectedLink,
        id: this.state.selectedLink.get('id'),
        model: 'Endpoint.UDP',
        app: 'medium',
        active: this.state.selectedLink.get('active').toString(),
      });
    }

    if (this.state.selectedClient) {
      return ({
        record: this.state.selectedClient,
        id: this.state.selectedClient.get('id'),
        model: 'Device.Client',
        app: 'jungle',
      });
    }

    if (this.state.selectedAudioInterface) {
      return ({
        record: this.state.selectedAudioInterface,
        id: this.state.selectedAudioInterface.get('id'),
        model: 'Resource.AudioInterface',
        app: 'jungle',
      });
    }

    return { record: null, model: 'no-model', id: 'no-id', app: 'no-app' }; // FIXME use undefined
  },


  componentWillUnmount() {
    delete this.clientsCoordinates;
  },


  onUpdateSuccess() {
    this.setState({
      selectedLink: null,
      selectedClient: null,
      selectedAudioInterface: null,
    });
  },


  deselectAll(e) {
    if (e.target.getAttribute('data-role') === 'background') {
      this.setState({
        selectedClient: null,
        selectedAudioInterface: null,
        selectedLink: null,
      });
    }
  },


  render() {
    let filteredLinks = this.props.links
      .filter((link) => {
        return ( // FIXME should be obsolete if backend was returing limited data
          this.props.audioInterfaces.find((audioInterface) => { return audioInterface.get('id') === link.get('references').get('electron.source_audio_interface_id'); }) ||
          this.props.audioInterfaces.find((audioInterface) => { return audioInterface.get('id') === link.get('references').get('destination_audio_interface_id'); })
        ) && (
          link.get('references').get('electron.source_audio_interface_id') !== null &&
          link.get('references').get('destination_audio_interface_id') !== null
        );
      });


    // Render whole canvas, clients above link rules
    return (
      <div>
        <DevicesToolbar
          selectedRecord={this.getSelectedRecord()}
          onUpdateSuccess={this.onUpdateSuccess}
        />

      <svg version="1.1" height="560" width="100%" data-role="background" onClick={this.deselectAll}>
          <RoutingDiagramClientLayer
            clients={this.props.clients}
            audioInterfaces={this.props.audioInterfaces}
            clientsCoordinates={this.clientsCoordinates}
            onAudioInterfaceClick={this.onAudioInterfaceClick}
            selectedAudioInterface={this.state.selectedAudioInterface}
            onClientDragMove={this.onClientDragMove}
            onClientDragStart={this.onClientDragStart}
            onClientDragStop={this.onClientDragStop}
            onClientBoxClick={this.onClientBoxClick}
            selectedClient={this.state.selectedClient}
            lastSelectedClient={this.state.lastSelectedClient}
          />
          <RoutingDiagramLinkLayer
            clients={this.props.clients}
            audioInterfaces={this.props.audioInterfaces}
            links={filteredLinks}
            selectedLink={this.state.selectedLink}
            onLinkClick={this.onLinkClick}
            clientsCoordinates={this.clientsCoordinates}
          />
        {() => {
          if(this.state.draggingClient === true) {
            return (
              <rect fillOpacity="0" height="100%" width="100%" onMouseMove={this.onMouseMove} />
            )
          }
        }()}
        </svg>
      </div>
    );
  }
});
