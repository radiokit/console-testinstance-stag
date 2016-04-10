import React from 'react';

import RoutingDiagramDimensions from './RoutingDiagramDimensions.js';
import RoutingDiagramHelpers from './RoutingDiagramHelpers.js';

const RoutingDiagramLinkRulePath = (props) => {
  var linkCoordinates = {};

  // Compute link coordinates
  props.clients.forEach((client) => {
    // If client was moved, use its new coordinates, otherwise get one that came with object
    let clientX = props.clientsCoordinates.has(client.get("id")) ? props.clientsCoordinates.get(client.get("id")).get("x") : client.get("extra").get("electron").get("diagram").get("x");
    let clientY = props.clientsCoordinates.has(client.get("id")) ? props.clientsCoordinates.get(client.get("id")).get("y") : client.get("extra").get("electron").get("diagram").get("y");

    let audioInterfacesOfClient = RoutingDiagramHelpers.getAudioInterfacesOfClient(client, props.audioInterfaces);

    audioInterfacesOfClient
      .forEach((audioInterface, index) => {
        let audioInterfaceX = (audioInterface.get("direction") === "capture" ? RoutingDiagramDimensions.getClientWidth() : 0) + RoutingDiagramDimensions.getAudioInterfaceWidth() / -2;
        let audioInterfaceY = (index * (RoutingDiagramDimensions.getAudioInterfaceMargin() + RoutingDiagramDimensions.getAudioInterfaceHeight()) + RoutingDiagramDimensions.getAudioInterfaceMargin());

        linkCoordinates[audioInterface.get("id")] = {
          x: clientX + audioInterfaceX + (audioInterface.get("direction") === "playback" ? 0 : RoutingDiagramDimensions.getAudioInterfaceWidth()),
          y: clientY + audioInterfaceY + (RoutingDiagramDimensions.getAudioInterfaceHeight() / 2)
        };
    });
  });

  // Cache some values
  let linkRuleSourceX = linkCoordinates[props.linkRule.get("source_audio_interface_id")].x;
  let linkRuleSourceY = linkCoordinates[props.linkRule.get("source_audio_interface_id")].y;
  let linkRuleDestinationX = linkCoordinates[props.linkRule.get("destination_audio_interface_id")].x;
  let linkRuleDestinationY = linkCoordinates[props.linkRule.get("destination_audio_interface_id")].y;
  let horizontalDistance = linkRuleDestinationX - linkRuleSourceX;
  let horizontalCurveOffset = horizontalDistance / 2 < 96 ? 96 : horizontalDistance / 2;

  // Compute coordinates of starting point
  let startPoint = `${linkRuleSourceX} ${linkRuleSourceY}`;

  // Compute bezier curve's anchors coordinates
  let startPointCurveX = linkRuleSourceX + horizontalCurveOffset;
  let startPointCurveY = linkRuleSourceY;
  let startPointCurve = `${startPointCurveX} ${startPointCurveY}`;

  let stopPointCurveX = linkRuleDestinationX - horizontalCurveOffset;
  let stopPointCurveY = linkRuleDestinationY;
  let stopPointCurve = `${stopPointCurveX} ${stopPointCurveY}`;

  // Compute coordinates of stopping point
  let stopPoint = `${linkRuleDestinationX} ${linkRuleDestinationY}`;

  // Render path
  return (
    <path
      d={`M ${startPoint}
          C ${startPointCurve}
            ${stopPointCurve}
            ${stopPoint}`}
      strokeWidth="2"
      stroke="red"
      fill="none" />
    );
}


export default RoutingDiagramLinkRulePath;
