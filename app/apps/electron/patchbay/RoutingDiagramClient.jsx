import React from 'react';

import SVGDraggable from '../../../widgets/svg/draggable.jsx';

import RoutingDiagramDimensions from './RoutingDiagramDimensions.js';

export default React.createClass({
  propTypes: {
    client: React.PropTypes.object.isRequired,
  },


  getInitialState: function() {
    return {
      x: this.props.client.get("extra").get("electron").get("diagram").get("x"),
      y: this.props.client.get("extra").get("electron").get("diagram").get("y"),
    }
  },


  render: function() {
    return (
      <SVGDraggable x={this.state.x} y={this.state.y}>
        <rect
          x="0"
          y="0"
          width={RoutingDiagramDimensions.getClientWidth()}
          height={RoutingDiagramDimensions.getClientHeight(3)}
          fill="#f00"
          stroke="#000" />

        <text
          x="0"
          y="0"
          textAnchor="middle"
          fontFamily="Arial"
          fontSize="10px"
          stroke="none"
          fill="#000000">
          {this.props.client.get("name")}
        </text>

        <rect
          x="0"
          y="0"
          width={30}
          height={30}
          fill="#fff"
          stroke="#000" />
      </SVGDraggable>
    );
  }
});
