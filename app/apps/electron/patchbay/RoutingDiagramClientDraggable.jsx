import React from 'react';

import SVGDraggable from '../../../widgets/svg/SVGDraggable.jsx';
import RoutingDiagramClientBox from './RoutingDiagramClientBox.jsx';


const RoutingDiagramClientDraggable = (props) => {
  return (
    <SVGDraggable
      x={props.x}
      y={props.y}
      onDragMove={props.onDragMove}
      onDragStop={props.onDragStop}
      onElementClick={props.onClientBoxClick}>

      <RoutingDiagramClientBox
        client={props.client}
        selectedAudioInterface={props.selectedAudioInterface}
        onAudioInterfaceClick={props.onAudioInterfaceClick}
        audioInterfaces={props.audioInterfaces} 
        selectedClient={props.selectedClient} />

    </SVGDraggable>
  );
}


export default RoutingDiagramClientDraggable;
