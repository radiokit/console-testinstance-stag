import React from 'react';
import * as Immutable from 'immutable';
import { Data } from 'radiokit-api';

import LoadingWidget from '../../../widgets/general/loading_widget.jsx';
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
      loadedLinks: null,
    };
  },


  loadClients() {
    if (!this.clientsQuery) {
      this.clientsQuery = window.data
        .query('jungle', 'Device.Client')
        .select('id', 'name', 'extra')
        .where('references', 'deq', 'account',
          Data.buildRecordGlobalID('auth', 'Account', this.context.currentUserAccount.get('id')))
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
      const clientsIDs = this.state.loadedClients.map((client) =>
        client.get('id')
      ).toJS();
      const clientsCondition = ['device_client_id', 'in'].concat(clientsIDs);

      this.audioInterfacesQuery = window.data
        .query('jungle', 'Resource.AudioInterface')
        .select('id', 'device_client_id', 'name', 'os_name', 'direction', 'references')
        .order('name', 'asc')
        .where.apply(this, clientsCondition)
        .on('fetch', (_event, _query, data) => {
          if(this.isMounted()) {
            this.setState({
              loadedAudioInterfaces: data,
            }, () => {
              this.loadLinks();
            });
          }
        })
        .enableAutoUpdate();
    }
  },


  loadLinks() {
    if (!this.linksQuery) {
      const audioInterfaceIDs = this.state.loadedAudioInterfaces
        .filter((audioInterface) =>
          audioInterface.get('direction') === 'capture'
        ).map((audioInterface) =>
          audioInterface.get('id')
        ).toJS();

      const linksCondition = ['references', 'din', 'electron.source_audio_interface_id']
        .concat(audioInterfaceIDs);

      this.linksQuery = window.data
        .query('medium', 'Endpoint.UDP')
        .select('id', 'active', 'references', 'extra')
        .where.apply(this, linksCondition)
        .on('fetch', (_event, _query, data) => {
          if(this.isMounted()) {
            this.setState({
              loadedLinks: data,
            });
          }
        })
        .enableAutoUpdate();
    }
  },


  onClientDragStop(client, x, y) {
    window.data.record('jungle', 'Device.Client', client.get('id'))
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
    if (this.linksQuery) {
      this.linksQuery.teardown();
      delete this.linksQuery;
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
    if (this.state.loadedClients === null ||
      this.state.loadedAudioInterfaces === null ||
      this.state.loadedLinks === null) {
      return <LoadingWidget />;
    }

    return (
      <RoutingDiagramCanvas
        clients={this.state.loadedClients}
        audioInterfaces={this.state.loadedAudioInterfaces}
        links={this.state.loadedLinks}
        onClientDragStop={this.onClientDragStop}
      />
    );
  },
});
