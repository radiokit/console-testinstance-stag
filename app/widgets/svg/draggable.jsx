import React from 'react';

export default React.createClass({
  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    onDragStart: React.PropTypes.func,
    onDragStop: React.PropTypes.func,
  },


  getDefaultProps: function() {
    return {
      draggable: false,
    }
  },


  getInitialState: function() {
    return {
      dragging: false,
      x: this.props.x,
      y: this.props.y,
      dragStartX: null,
      dragStartY: null,
      dragStartClientX: null,
      dragStartClientY: null,
    }
  },


  onMouseDown: function(e) {
    this.setState({
      dragging: true,
      dragStartX: this.state.x,
      dragStartY: this.state.y,
      dragStartClientX: e.clientX,
      dragStartClientY: e.clientY,
    }, () => {
      this.refs.container.parentNode.appendChild(this.refs.container);

      if(this.props.onDragStart) {
        this.props.onDragStart(this.state.x, this.state.y);
      }
    });
  },


  onMouseUp: function(e) {
    this.setState({
      dragging: false,
      dragStartX: null,
      dragStartY: null,
      dragStartClientX: null,
      dragStartClientY: null,
    }, () => {
      if(this.props.onDragStop) {
        this.props.onDragStop(this.state.x, this.state.y);
      }
    });
  },


  onMouseOut: function(e) {
    this.setState({
      dragging: false,
      dragStartX: null,
      dragStartY: null,
      dragStartClientX: null,
      dragStartClientY: null,
    }, () => {
      if(this.props.onDragStop) {
        this.props.onDragStop(this.state.x, this.state.y);
      }
    });
  },


  onMouseMove: function(e) {
    if(this.state.dragging) {
      let dx = e.clientX - this.state.dragStartClientX;
      let dy = e.clientY - this.state.dragStartClientY;

      this.setState({
        x: this.state.dragStartX + dx,
        y: this.state.dragStartY + dy,
      });
    }
  },


  render: function() {
    return (
      <g ref="container"
        transform={`translate(${this.state.x},${this.state.y})`}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseOut={this.onMouseOut}
        onMouseMove={this.onMouseMove}>

        {this.props.children}
      </g>
    );
  }
});
