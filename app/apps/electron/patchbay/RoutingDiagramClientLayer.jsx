import React from 'react';

import RoutingDiagramClientDraggable from './RoutingDiagramClientDraggable.jsx';


const RoutingDiagramClientLayer = (props) => {
  let clients = props.clients.map((client) => {
    // If client was moved, use its new coordinates, otherwise get one that came with props
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
        onDragStop={props.onClientDragStop.bind(null, client)} />
    );
  });

  return (
    <g>
      {clients}
    </g>
  );
}


export default RoutingDiagramClientLayer;
