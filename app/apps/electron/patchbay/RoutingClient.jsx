import React from 'react';

import RoutingDiagramDimensions from './RoutingDiagramDimensions.js';

import RaphaelSet from './RaphaelSet.jsx';
import RaphaelRect from './RaphaelRect.jsx';
import RaphaelText from './RaphaelText.jsx';

export default React.createClass({
  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    client: React.PropTypes.object.isRequired,
    audioInterfaces: React.PropTypes.object.isRequired,
  },


  render: function() {
    return (
      <RaphaelSet>
        <RaphaelRect
          x={this.props.x}
          y={this.props.y}
          width={RoutingDiagramDimensions.getClientWidth()}
          height={RoutingDiagramDimensions.getClientHeight(3)}
          attrs={{
            fill: "#f00",
            stroke: "#000"
          }} />

        <RaphaelText
          x={20}
          y={50}
          text={this.props.client.get("name")} />

        <RaphaelRect
          x={this.props.x}
          y={this.props.y}
          width={30}
          height={30}
          attrs={{
            fill: "#fff",
            stroke: "#000"
          }} />

      </RaphaelSet>
    );
  }
});
