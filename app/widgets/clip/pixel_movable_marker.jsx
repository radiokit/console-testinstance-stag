import React from 'react';

import Movable from '../general/movable.jsx';

const PixelMovableMarker = React.createClass({
  propTypes: {
    color: React.PropTypes.string.isRequired,
    height: React.PropTypes.number.isRequired,
    offset: React.PropTypes.number.isRequired,
    onMove: React.PropTypes.func,
  },

  getInitialState() {
    return {
      mouseHold: false,
    };
  },

  handleMove({x}) {
    this.props.onMove && this.props.onMove(x);
  },

  render() {
    const handlerWidth = 10;
    const containerWidth = handlerWidth * 3;
    const containerStyle = {
      position: 'absolute', top: 0, left: 0,
      transform: `translateX(${containerWidth / -2 + this.props.offset}px)`,
      height: this.props.height,
      width: containerWidth,
      zIndex: this.state.mouseHold ? 2 : 1,
    }
    const lineStyle = {
      backgroundColor: this.props.color,
      position: 'absolute', top: 0, left: 0,
      transform: `translateX(${containerWidth / 2}px)`,
      height: this.props.height,
      width: 1,
    }
    const handlerStyle = {
      backgroundColor: this.props.color,
      position: 'absolute', top: 0, left: 0,
      transform: `translateY(${this.props.height / 2 - handlerWidth / 2}px) translateX(${(containerWidth - handlerWidth) / 2}px)`,
      width: handlerWidth,
      height: handlerWidth,
    }
    return (
      <Movable style={containerStyle}
               onMove={e => this.handleMove(e)}
               onHold={() => this.setState({mouseHold:true})}
               onDrop={() => this.setState({mouseHold:false})}
      >
        <div style={lineStyle}></div>
        <div style={handlerStyle}></div>
      </Movable>
    )
  }
});
export default  PixelMovableMarker;
