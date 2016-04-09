import React from 'react';

import RoutingDiagramDimensions from './RoutingDiagramDimensions.js';

export default React.createClass({
  propTypes: {
    // audioInterface: React.PropTypes.object.isRequired,
    onStartLink: React.PropTypes.func,
  },


  getInitialState: function() {
    return {
      linking: false,
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

    return (
      <rect
        x="0"
        y="0"
        width={30}
        height={30}
        fill={backgroundColor}
        stroke="#000"
        onClick={this.onClick} />
    );
  }
});
