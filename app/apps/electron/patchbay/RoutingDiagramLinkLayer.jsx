import React from 'react';

import RoutingDiagramLinkPath from './RoutingDiagramLinkPath.jsx';


const RoutingDiagramLinkLayer = (props) => {
  let links = props.links
    .map((link) => {
      return (
        <RoutingDiagramLinkPath
          key={link.get('id')}
          link={link}
          clients={props.clients}
          clientsCoordinates={props.clientsCoordinates}
          selectedLink={props.selectedLink}
          onLinkClick={props.onLinkClick.bind(null, link)}
          audioInterfaces={props.audioInterfaces} />
      );
    });

  return (
    <g>
      {links}
    </g>
  );
};

export default RoutingDiagramLinkLayer;
