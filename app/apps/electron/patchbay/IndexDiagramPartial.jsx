import React from 'react';
import * as Immutable from 'immutable';
import { Data } from 'radiokit-api';

import RoutingDiagramCanvas from './RoutingDiagramCanvas.jsx';


export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
  },

  contextTypes: {
    currentUserAccount: React.PropTypes.object.isRequired,
  },


  getInitialState() {
    return {
      loadedClients: null,
      loadedAudioInterfaces: null,
      loadedLinkRules: null,
    };
  },


  loadClients() {
    if (!this.clientsQuery) {
      this.clientsQuery = window.data
        .query('auth', 'Client.Standalone')
        .select('id', 'name', 'extra')
        .where('application', 'eq', 'electron')
        .where('account_id', 'eq', this.context.currentUserAccount.get('id'))
        .on('fetch', (_event, _query, data) => {
          if (this.isMounted()) {
            this.setState({
              loadedClients: this.buildClientsWithExtra(data),
            }, () => {
              this.loadAudioInterfaces();
            });
          }
        })
        .enableAutoUpdate();
    }
  },


  buildClientsWithExtra(clients) {
    // TODO improve algorithm that will append X/Y positions to clients
    // if it's necessary so it does not assign 0, 0 all the time
    return clients.map((client) => {
      if (!this.clientHasExtra(client)) {
        return this.setDefaultClientExtra(client);
      }

      return client;
    });
  },


  clientHasExtra(client) {
    return (
      client.has('extra') && client.get('extra') !== null &&
      client.get('extra').has('electron') && client.get('extra').get('electron') !== null &&
      client.get('extra').get('electron').has('diagram') && client.get('extra').get('electron').get('diagram') !== null &&
      client.get('extra').get('electron').get('diagram').has('x') && client.get('extra').get('electron').get('diagram').get('x') !== null &&
      client.get('extra').get('electron').get('diagram').has('x') && client.get('extra').get('electron').get('diagram').get('y') !== null
    );
  },


  buildDefaultClientExtra() {
    return Immutable.fromJS({
      electron: {
        diagram: {
          x: 480,
          y: 280,
        },
      },
    }
   );
  },


  setDefaultClientExtra(client) {
    if (!client.has('extra') || client.get('extra') === null) {
      return client.set('extra', this.buildDefaultClientExtra());
    }

    return client.set('extra', client.get('extra').merge(this.buildDefaultClientExtra()));
  },


  loadAudioInterfaces() {
    if (!this.audioInterfacesQuery) {
      let clientsGlobalIDs = this.state.loadedClients.map((client) => { return Data.buildRecordGlobalID('auth', 'Client.Standalone', client.get('id')); }).toJS();
      let clientsCondition = ['references', 'din', 'owner'].concat(clientsGlobalIDs)

      this.audioInterfacesQuery = window.data
        .query('plumber', 'Resource.Architecture.AudioInterface')
        .select('id', 'name', 'os_name', 'direction', 'references')
        .order('name', 'asc')
        .where.apply(this, clientsCondition)
        .on('fetch', (_event, _query, data) => {

          if(this.isMounted()) {
            this.setState({
              loadedAudioInterfaces: data
            }, () => {
              this.loadLinkRules();
            });
          }
        })
        .enableAutoUpdate();
    }
  },


  loadLinkRules() {
    if (!this.linkRulesQuery) {
      this.linkRulesQuery = window.data
        .query('plumber', 'Config.Routing.LinkRule')
        .select('id', 'source_audio_interface_id', 'destination_audio_interface_id', 'active')
        .where('source_audio_interface_id', 'in', this.state.loadedAudioInterfaces.map((audioInterface) => { return audioInterface.get('id'); }).toJS())
        .on('fetch', (_event, _query, data) => {
          if(this.isMounted()) {
            this.setState({
              loadedLinkRules: data
            });
          }
        })
        .enableAutoUpdate();
    }
  },


  onClientDragStop(client, x, y) {
    window.data.record('auth', 'Client.Standalone', client.get('id'))
      .update({
        extra: {
          electron: {
            diagram: {
              x,
              y,
            },
          },
        },
      });
  },


  componentDidMount() {
    this.loadClients();
  },


  componentWillUnmount() {
    if (this.linkRulesQuery) {
      this.linkRulesQuery.teardown();
      delete this.linkRulesQuery;
    }

    if (this.audioInterfacesQuery) {
      this.audioInterfacesQuery.teardown();
      delete this.audioInterfacesQuery;
    }

    if (this.clientsQuery) {
      this.clientsQuery.teardown();
      delete this.clientsQuery;
    }
  },


  render() {
    if (this.state.loadedClients === null || this.state.loadedAudioInterfaces === null || this.state.loadedLinkRules === null) {
      return (
        <div>Loading</div>
      ); // FIXME use LoadingWidget
    }

    return (
      <RoutingDiagramCanvas
        clients={this.state.loadedClients}
        audioInterfaces={this.state.loadedAudioInterfaces}
        linkRules={this.state.loadedLinkRules}
        onClientDragStop={this.onClientDragStop}
      />
    );
  },
});
