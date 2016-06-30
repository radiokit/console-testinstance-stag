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
        selectedClient={props.selectedClient} />
    );
  }

  const clients = props.selectedClient ? props.clients
    .filter((client) => {
      return client.get('id') !== props.selectedClient.get('id')
    }) : props.clients

  const selectedClient = props.selectedClient ? props.clients
    .find((client) => {
      return client.get('id') === props.selectedClient.get('id')
    }) : null


  const allClients = clients ? clients
    .map((client) => {
      return renderClient(client);
    }) : [];

  const topClient = selectedClient ?
      renderClient(selectedClient) :
      null;

  return (
    <g>
      {allClients}
      {topClient}
    </g>
  );
}


export default RoutingDiagramClientLayer;
