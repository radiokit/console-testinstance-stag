import React from 'react';

import RoutingDiagramLinkRulePath from './RoutingDiagramLinkRulePath.jsx';


const RoutingDiagramLinkRuleLayer = (props) => {
  let links = props.linkRules
    .map((linkRule) => {
      return (
        <RoutingDiagramLinkRulePath
          key={linkRule.get("id")}
          linkRule={linkRule}
          clients={props.clients}
          clientsCoordinates={props.clientsCoordinates}
          audioInterfaces={props.audioInterfaces} />
      );
    });

  return (
    <g>
      {links}
    </g>
  );
}


export default RoutingDiagramLinkRuleLayer;
