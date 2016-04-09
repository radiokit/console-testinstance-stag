import React from 'react';

import RoutingDiagramDimensions from './RoutingDiagramDimensions.js';

export default React.createClass({
  propTypes: {
    audioInterface: React.PropTypes.object.isRequired,
    onStartLink: React.PropTypes.func,
    borderColor: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
  },


  getInitialState: function() {
    return {
      linking: false,
    }
  },


  getDefaultProps: function() {
    return {
      borderColor: "#2b323a",
    }
  },


  onClick: function(e) {
    if(this.state.linking) {
      // TODO

    } else {
      this.setState({
        linking: true,
      }, () => {
        if(this.onStartLink) {
          this.onStartLink();
        }
      });
    }
  },


  render: function() {
    let backgroundColor;
    if(this.state.linking) {
      backgroundColor = "#f00";
    } else {
      backgroundColor = "#fff";
    }

    let x = (this.props.audioInterface.get("direction") === "capture" ? 0 : RoutingDiagramDimensions.getClientWidth()) + RoutingDiagramDimensions.getAudioInterfaceWidth() / -2;
    let y = (this.props.index * (RoutingDiagramDimensions.getAudioInterfaceMargin() + RoutingDiagramDimensions.getAudioInterfaceHeight()) + RoutingDiagramDimensions.getAudioInterfaceMargin());

    return (
      <g transform={`translate(${x},${y})`}>
        <rect
          x="0"
          y="0"
          rx="2"
          ry="2"
          width={RoutingDiagramDimensions.getAudioInterfaceWidth()}
          height={RoutingDiagramDimensions.getAudioInterfaceHeight()}
          fill={backgroundColor}
          stroke={this.props.borderColor}
          onClick={this.onClick} />

        <text
          x={this.props.audioInterface.get("direction") === "capture" ? RoutingDiagramDimensions.getAudioInterfaceWidth() * 1.25 : RoutingDiagramDimensions.getAudioInterfaceWidth() * -0.25}
          y="12"
          textAnchor={this.props.audioInterface.get("direction") === "capture" ? "start" : "end"}
          fontFamily="Roboto,Helvetica,Arial,sans"
          fontSize="10px"
          stroke="none"
          fill="#fff">
          {this.props.audioInterface.get("name")}
        </text>
      </g>
    );
  }
});
