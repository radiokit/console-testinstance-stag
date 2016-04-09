import React from 'react';

import RaphaelPaper from './RaphaelPaper.jsx';
import RaphaelRect from './RaphaelRect.jsx';

import RoutingClient from './RoutingClient.jsx';
import RoutingDiagramDimensions from './RoutingDiagramDimensions.js';



export default React.createClass({
  propTypes: {
    clients: React.PropTypes.object.isRequired,
    audioInterfaces: React.PropTypes.object.isRequired,
  },


  render: function() {
    var offsetY = 0;

    return (
      <RaphaelPaper width={600} height={600}>
        {this.props.clients.map((client) => {
          return (
            <RoutingClient
              key={client.get("id")}
              client={client}
              audioInterfaces={this.props.audioInterfaces}
              x={16}
              y={offsetY} />
          );
        })}
      </RaphaelPaper>
    );
  }
});
