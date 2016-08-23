import React from 'react';

import RoutingDiagramDimensions from './RoutingDiagramDimensions.js';


const RoutingDiagramClientAudioInterface = (props) => {
  const audioInterfaceX = (props.audioInterface.get("direction") === "capture" ? RoutingDiagramDimensions.getClientWidth() : 0) + RoutingDiagramDimensions.getAudioInterfaceWidth() / -2;
  const audioInterfaceY = (props.index * (RoutingDiagramDimensions.getAudioInterfaceMargin() + RoutingDiagramDimensions.getAudioInterfaceHeight()) + RoutingDiagramDimensions.getAudioInterfaceMargin());
  const textWidth = RoutingDiagramDimensions.getClientWidth() / 2 - RoutingDiagramDimensions.getAudioInterfaceMargin();

  // Render box + interface's name
  return (
    <g key={props.audioInterface.get("id")}
      transform={`translate(${audioInterfaceX},${audioInterfaceY})`}>
      <rect
        style={{cursor: "pointer"}}
        x="0"
        y="0"
        rx="2"
        ry="2"
        width={RoutingDiagramDimensions.getAudioInterfaceWidth()}
        height={RoutingDiagramDimensions.getAudioInterfaceHeight()}
        fill={props.selectedAudioInterface && props.selectedAudioInterface.get("id") === props.audioInterface.get("id") ? "#fff0a0" : "#fff"}
        stroke="#2b323a"
        onClick={props.onAudioInterfaceClick.bind(null, props.audioInterface)} />

      <clipPath id={`audio-interface-clip-${props.audioInterface.get('id')}`}>
        <rect
          x={props.audioInterface.get('direction') === 'capture' ? -1 * textWidth : 0} 
          y="0"
          width={textWidth}
          height="16"/>
      </clipPath>

      <text
        x={props.audioInterface.get("direction") === "capture" ? RoutingDiagramDimensions.getAudioInterfaceWidth() * -0.25 : RoutingDiagramDimensions.getAudioInterfaceWidth() * 1.25}
        y="12"
        textAnchor={props.audioInterface.get("direction") === "capture" ? "end" : "start"}
        fontFamily="Roboto,Helvetica,Arial,sans"
        fontSize="10px"
        stroke="none"
        clipPath={`url(#audio-interface-clip-${props.audioInterface.get('id')})`}
        fill={props.selectedClient && props.selectedClient.get("id") === props.client.get("id") ? "#000" : "#fff" }>
        {props.audioInterface.get("name") === "" ? props.audioInterface.get("os_name") : props.audioInterface.get("name") }
      </text>
    </g>
  );
}


export default RoutingDiagramClientAudioInterface;
