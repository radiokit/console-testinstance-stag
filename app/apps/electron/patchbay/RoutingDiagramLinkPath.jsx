import React from 'react';

import RoutingDiagramDimensions from './RoutingDiagramDimensions.js';
import RoutingDiagramHelpers from './RoutingDiagramHelpers.js';

const RoutingDiagramLinkPath = (props) => {
  const linkCoordinates = {};

  // Compute link coordinates
  props.clients.forEach((client) => {
    // If client was moved, use its new coordinates, otherwise get one that came with object
    let clientX = props.clientsCoordinates.has(client.get('id')) ? props.clientsCoordinates.get(client.get('id')).get('x') : client.get('extra').get('electron').get('diagram').get('x');
    let clientY = props.clientsCoordinates.has(client.get('id')) ? props.clientsCoordinates.get(client.get('id')).get('y') : client.get('extra').get('electron').get('diagram').get('y');

    let audioInterfacesOfClient = RoutingDiagramHelpers.getAudioInterfacesOfClient(client, props.audioInterfaces);

    audioInterfacesOfClient
      .filter(audioInterface => audioInterface.get('direction') === 'capture')
      .forEach((audioInterface, index) => {
        let audioInterfaceX = (audioInterface.get('direction') === 'capture' ? RoutingDiagramDimensions.getClientWidth() : 0) + RoutingDiagramDimensions.getAudioInterfaceWidth() / -2;
        let audioInterfaceY = (index * (RoutingDiagramDimensions.getAudioInterfaceMargin() + RoutingDiagramDimensions.getAudioInterfaceHeight()) + RoutingDiagramDimensions.getAudioInterfaceMargin());

        linkCoordinates[audioInterface.get('id')] = {
          x: clientX + audioInterfaceX + (audioInterface.get('direction') === 'playback' ? 0 : RoutingDiagramDimensions.getAudioInterfaceWidth()),
          y: clientY + audioInterfaceY + (RoutingDiagramDimensions.getAudioInterfaceHeight() / 2)
        };
      });

    audioInterfacesOfClient
      .filter(audioInterface => audioInterface.get('direction') === 'playback')
      .forEach((audioInterface, index) => {
        let audioInterfaceX = (audioInterface.get('direction') === 'capture' ? RoutingDiagramDimensions.getClientWidth() : 0) + RoutingDiagramDimensions.getAudioInterfaceWidth() / -2;
        let audioInterfaceY = (index * (RoutingDiagramDimensions.getAudioInterfaceMargin() + RoutingDiagramDimensions.getAudioInterfaceHeight()) + RoutingDiagramDimensions.getAudioInterfaceMargin());

        linkCoordinates[audioInterface.get('id')] = {
          x: clientX + audioInterfaceX + (audioInterface.get('direction') === 'playback' ? 0 : RoutingDiagramDimensions.getAudioInterfaceWidth()),
          y: clientY + audioInterfaceY + (RoutingDiagramDimensions.getAudioInterfaceHeight() / 2)
        };
      });
  });

  // Cache some values
  let linkSourceX = linkCoordinates[props.link.get('source_resource_audio_interface_id')].x;
  let linkSourceY = linkCoordinates[props.link.get('source_resource_audio_interface_id')].y;
  let linkDestinationX = linkCoordinates[props.link.get('destination_resource_audio_interface_id')].x;
  let linkDestinationY = linkCoordinates[props.link.get('destination_resource_audio_interface_id')].y;
  const horizontalDistance = linkDestinationX - linkSourceX;
  let horizontalCurveOffset;
  if (linkDestinationX <= linkSourceX) {
    horizontalCurveOffset = 192;
  } else {
    horizontalCurveOffset = horizontalDistance / 2 < 96 ? 96 : horizontalDistance / 2;
  }

  // Compute coordinates of starting point
  const startPoint = `${linkSourceX} ${linkSourceY}`;

  // Compute bezier curve's anchors coordinates
  const startPointCurveX = linkSourceX + horizontalCurveOffset;
  const startPointCurveY = linkSourceY;
  const startPointCurve = `${startPointCurveX} ${startPointCurveY}`;

  const stopPointCurveX = linkDestinationX - horizontalCurveOffset;
  const stopPointCurveY = linkDestinationY;
  const stopPointCurve = `${stopPointCurveX} ${stopPointCurveY}`;

  // Compute coordinates of stopping point
  const stopPoint = `${linkDestinationX} ${linkDestinationY}`;

  // Render path
  return (
    <g>
      <path
        style={{ cursor: 'pointer', opacity: 0.0000001 }}
        d={`M ${startPoint}
            C ${startPointCurve}
              ${stopPointCurve}
              ${stopPoint}`}
        strokeWidth="10"
        stroke="#fff"
        fill="none"
        onClick={props.onLinkClick} />
      <path
        style={{ cursor: 'pointer' }}
        d={`M ${startPoint}
            C ${startPointCurve}
              ${stopPointCurve}
              ${stopPoint}`}
        strokeWidth="2"
        stroke={props.selectedLink && props.selectedLink.get('id') === props.link.get('id') ? '#fff0a0' : '#2b323a'}
        strokeDasharray={props.link.toJS().active ? '0' : '5'}
        fill="none"
        onClick={props.onLinkClick} />
      </g>
    );
};

export default RoutingDiagramLinkPath;
