import React from 'react';

export default React.createClass({
  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    onDragStart: React.PropTypes.func,
    onDragStop: React.PropTypes.func,
    onDragMove: React.PropTypes.func,
    onElementClick: React.PropTypes.func,
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
      if (this.props.onDragStart) {
        this.props.onDragStart(this.state.x, this.state.y);
      }

      if (this.props.onElementClick) {
        setTimeout(() => { // po co set timeout? FIXME
          if (!this.state.dragging) {
            this.props.onElementClick();
          }
        }, 100);
      }
    });
  },


  onMouseUp: function(e) {
    this.stopDragging();
  },


  onMouseOut: function(e) {
    this.stopDragging();
  },


  stopDragging: function() {
    if(this.state.dragging) {
      // if this.state.dragStartX === this.state.x ...
      //  handler klikniecia
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
    }
  },


  onMouseMove: function(e) {
    if(this.state.dragging) {
      let dx = e.clientX - this.state.dragStartClientX;
      let dy = e.clientY - this.state.dragStartClientY;

      this.setState({
        x: this.state.dragStartX + dx,
        y: this.state.dragStartY + dy,
      }, () => {
        if(this.props.onDragMove) {
          this.props.onDragMove(this.state.x, this.state.y);
        }
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
