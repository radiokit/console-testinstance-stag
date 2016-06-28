import React from 'react';

import RoutingDiagramDimensions from './RoutingDiagramDimensions.js';
import RoutingDiagramHelpers from './RoutingDiagramHelpers.js';


const RoutingDiagramClientBox = (props) => {
  let audioInterfacesOfClient = RoutingDiagramHelpers.getAudioInterfacesOfClient(props.client, props.audioInterfaces);
  let audioInterfacesOfClientCount = audioInterfacesOfClient.count();

  return (
    <g>
      <rect
        x="2"
        y="2"
        rx="4"
        ry="4"
        width={RoutingDiagramDimensions.getClientWidth()-2}
        height={RoutingDiagramDimensions.getClientHeight(audioInterfacesOfClientCount)-2}
        opacity="0.2"
        fill="#000000" />

      <rect
        style={{cursor: "move"}}
        x="0"
        y="0"
        rx="2"
        ry="2"
        width={RoutingDiagramDimensions.getClientWidth()-2}
        height={RoutingDiagramDimensions.getClientHeight(audioInterfacesOfClientCount)-2}
        fill={props.selectedClient && props.selectedClient.get("id") === props.client.get("id") ? "#fff0a0" : "#006c90" }
        stroke="#2b323a" />

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
        .map((audioInterface, index) => {
          // Use audio interface box position as internal relative origin.
          // Put it on the right edge of client's box if it's "capture"
          // interface, or on the left otherwise.
          let audioInterfaceX = (audioInterface.get("direction") === "capture" ? RoutingDiagramDimensions.getClientWidth() : 0) + RoutingDiagramDimensions.getAudioInterfaceWidth() / -2;
          let audioInterfaceY = (index * (RoutingDiagramDimensions.getAudioInterfaceMargin() + RoutingDiagramDimensions.getAudioInterfaceHeight()) + RoutingDiagramDimensions.getAudioInterfaceMargin());

          // Render box + interface's name
          return (
            <g key={audioInterface.get("id")}
              transform={`translate(${audioInterfaceX},${audioInterfaceY})`}>
              <rect
                style={{cursor: "pointer"}}
                x="0"
                y="0"
                rx="2"
                ry="2"
                width={RoutingDiagramDimensions.getAudioInterfaceWidth()}
                height={RoutingDiagramDimensions.getAudioInterfaceHeight()}
                fill={props.selectedAudioInterface && props.selectedAudioInterface.get("id") === audioInterface.get("id") ? "#fff0a0" : "#fff"}
                stroke="#2b323a"
                onClick={props.onAudioInterfaceClick.bind(null, audioInterface)} />

              <text
                x={audioInterface.get("direction") === "capture" ? RoutingDiagramDimensions.getAudioInterfaceWidth() * -0.25 : RoutingDiagramDimensions.getAudioInterfaceWidth() * 1.25}
                y="12"
                textAnchor={audioInterface.get("direction") === "capture" ? "end" : "start"}
                fontFamily="Roboto,Helvetica,Arial,sans"
                fontSize="10px"
                stroke="none"
                fill={props.selectedClient && props.selectedClient.get("id") === props.client.get("id") ? "#000" : "#fff" }>
                {audioInterface.get("name") === "" ? audioInterface.get("os_name") : audioInterface.get("name") }
              </text>
            </g>
          );
      })}
    </g>
  );
}


export default RoutingDiagramClientBox;
