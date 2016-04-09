import React from 'react';

import SVGDraggable from '../../../widgets/svg/SVGDraggable.jsx';

import RoutingDiagramAudioInterface from './RoutingDiagramAudioInterface.jsx';
import RoutingDiagramDimensions from './RoutingDiagramDimensions.js';

export default React.createClass({
  propTypes: {
    client: React.PropTypes.object.isRequired,
    backgroundColor: React.PropTypes.string.isRequired,
    foregroundColor: React.PropTypes.string.isRequired,
    borderColor: React.PropTypes.string.isRequired,
  },


  getInitialState: function() {
    return {
      x: this.props.client.get("extra").get("electron").get("diagram").get("x"),
      y: this.props.client.get("extra").get("electron").get("diagram").get("y"),
      width: RoutingDiagramDimensions.getClientWidth(),
      height: RoutingDiagramDimensions.getClientHeight(3),
    }
  },


  getDefaultProps: function() {
    return {
      backgroundColor: "#006c90",
      foregroundColor: "#fff",
      borderColor: "#2b323a",
    }
  },


  onDragStop: function(x, y) {
    window.data.record("auth", "Client.Standalone", this.props.client.get("id"))
      .update({
        extra: {
          electron: {
            diagram: {
              x: x,
              y: y
            }
          }
        }
      });
  },


  render: function() {
    return (
      <SVGDraggable
        x={this.state.x}
        y={this.state.y}
        onDragStop={this.onDragStop}>
        <rect
          x="2"
          y="2"
          rx="4"
          ry="4"
          width={this.state.width-2}
          height={this.state.height-2}
          opacity="0.2"
          fill="#000000" />

        <rect
          x="0"
          y="0"
          rx="2"
          ry="2"
          width={this.state.width-2}
          height={this.state.height-2}
          fill={this.props.backgroundColor}
          stroke={this.props.borderColor} />

        <text
          transform={`translate(${this.state.width/2},${20})`}
          x="0"
          y="0"
          textAnchor="middle"
          fontFamily="Roboto,Helvetica,Arial,sans"
          fontSize="14px"
          stroke="none"
          fill={this.props.foregroundColor}>
          {this.props.client.get("name")}
        </text>

        {this.props.client.get("audio_interfaces").map((audioInterface) => {
          return (<RoutingDiagramAudioInterface key={audioInterface.get("id")} />);
        })}

      </SVGDraggable>
    );
  }
});
