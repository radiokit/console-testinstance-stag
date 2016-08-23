import React from 'react';

import RoutingDiagramDimensions from './RoutingDiagramDimensions.js';
import RoutingDiagramHelpers from './RoutingDiagramHelpers.js';

import RoutingDiagramClientAudioInterface from './RoutingDiagramClientAudioInterface.jsx';

const RoutingDiagramClientBox = (props) => {
  const audioInterfacesOfClient = RoutingDiagramHelpers.getAudioInterfacesOfClient(props.client, props.audioInterfaces);
  const clientHeight = RoutingDiagramDimensions.getClientHeight(
    Math.max(
      audioInterfacesOfClient.filter(audioInterface => audioInterface.get('direction') === 'capture').count(),
      audioInterfacesOfClient.filter(audioInterface => audioInterface.get('direction') === 'playback').count()
    )
  );

  return (
    <g>
      <rect
        x="2"
        y="2"
        rx="4"
        ry="4"
        width={RoutingDiagramDimensions.getClientWidth()-2}
        height={clientHeight}
        opacity="0.2"
        fill="#000000"
     />

      <rect
        style={{cursor: "move"}}
        x="0"
        y="0"
        rx="2"
        ry="2"
        width={RoutingDiagramDimensions.getClientWidth()-2}
        height={clientHeight}
        fill={props.selectedClient && props.selectedClient.get("id") === props.client.get("id") ? "#fff0a0" : "#006c90" }
        stroke="#2b323a"
        onClick={props.onClientBoxClick} />

      <text
        style={{cursor: "move"}}
        transform={`translate(${RoutingDiagramDimensions.getClientWidth()/2},${-1 * RoutingDiagramDimensions.getHeaderHeight()})`}
        x="0"
        y="0"
        textAnchor="middle"
        fontFamily="Roboto,Helvetica,Arial,sans"
        fontSize="14px"
        stroke="none"
        fill="#2b323a">
        {props.client.get("name")}
      </text>


      {audioInterfacesOfClient
        .filter(audioInterface => audioInterface.get('direction') === 'capture')
        .map((audioInterface, index) => {
          return (
            <RoutingDiagramClientAudioInterface
              key={audioInterface.get('id')}
              index={index}
              audioInterface={audioInterface}
              onAudioInterfaceClick={props.onAudioInterfaceClick} />
          );
        }
      )}

      {audioInterfacesOfClient
        .filter(audioInterface => audioInterface.get('direction') === 'playback')
        .map((audioInterface, index) => {
          return (
            <RoutingDiagramClientAudioInterface
              key={audioInterface.get('id')}
              index={index}
              audioInterface={audioInterface}
              onAudioInterfaceClick={props.onAudioInterfaceClick} />
          );
        }
      )}
    </g>
  );
}


export default RoutingDiagramClientBox;
