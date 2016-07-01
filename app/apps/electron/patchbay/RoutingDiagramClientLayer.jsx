import React from 'react';

import RoutingDiagramClientDraggable from './RoutingDiagramClientDraggable.jsx';


const RoutingDiagramClientLayer = (props) => {
  function renderClient(client) {
    let clientX = props.clientsCoordinates.has(client.get("id")) ? props.clientsCoordinates.get(client.get("id")).get("x") : client.get("extra").get("electron").get("diagram").get("x");
    let clientY = props.clientsCoordinates.has(client.get("id")) ? props.clientsCoordinates.get(client.get("id")).get("y") : client.get("extra").get("electron").get("diagram").get("y");

    return (
      <RoutingDiagramClientDraggable
        key={client.get("id")}
        x={clientX}
        y={clientY}
        client={client}
        onAudioInterfaceClick={props.onAudioInterfaceClick}
        selectedAudioInterface={props.selectedAudioInterface}
        audioInterfaces={props.audioInterfaces}
        clientsCoordinates={props.clientsCoordinates}
        onDragMove={props.onClientDragMove.bind(null, client)}
        onDragStop={props.onClientDragStop.bind(null, client)}
        onClientBoxClick={props.onClientBoxClick.bind(null, client, clientX, clientY)}
        selectedClient={props.selectedClient}
        lastSelectedClient={props.lastSelectedClient} />
    );
  }

  function filterClients(clients, clientToFilter) {
    return clients
      .filter((client) => {
        return client.get('id') !== clientToFilter.get('id')
      });
  }

  let clients = props.clients;
  if (props.selectedClient) {
    clients = filterClients(props.clients, props.selectedClient);
  } else if (props.lastSelectedClient) {
    clients = filterClients(props.clients, props.lastSelectedClient);
  }

  let selectedClient = null;
  if (props.selectedClient) {
    selectedClient = props.selectedClient;
  } else if (props.lastSelectedClient) {
    selectedClient = props.lastSelectedClient;
  }

  const clientToRenderOnTop =
    selectedClient ?
      props.clients
      .find((client) => {
        return client.get('id') === selectedClient.get('id')
      }) :
      null;

  const allClients = clients ? clients
    .map((client) => {
      return renderClient(client);
    }) : [];

  const topClient = clientToRenderOnTop ?
      renderClient(clientToRenderOnTop) :
      null;

  return (
    <g>
      {allClients}
      {topClient}
    </g>
  );
}


export default RoutingDiagramClientLayer;
