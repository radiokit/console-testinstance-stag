import React from 'react';

import Movable from '../general/movable.jsx';
import makeUniqStyle from './uniqStyle';
const uniqStyle = makeUniqStyle();

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

  handleMove({ x }) {
    this.props.onMove && this.props.onMove(x);
  },

  handleHold() {
    this.setState({ mouseHold: true });
  },

  handleDrop() {
    this.setState({ mouseHold: false });
  },

  render() {
    const handlerWidth = 10;
    const containerWidth = handlerWidth * 3;
    const containerStyle = uniqStyle({
      position: 'absolute', top: 0, left: 0,
      transform: `translateX(${Math.round(containerWidth / -2 + this.props.offset)}px)`,
      height: this.props.height,
      width: containerWidth,
      zIndex: this.state.mouseHold ? 2 : 1,
    });
    const lineStyle = ({
      backgroundColor: this.props.color,
      position: 'absolute', top: 0, left: 0,
      transform: `translateX(${Math.round(containerWidth / 2)}px)`,
      height: this.props.height,
      width: 1,
    });
    const handlerStyle = ({
      backgroundColor: this.props.color,
      position: 'absolute', top: 0, left: 0,
      transform: `translateY(${Math.round(this.props.height / 2 - handlerWidth / 2)}px) ` +
      `translateX(${Math.round((containerWidth - handlerWidth) / 2)}px)`,
      width: handlerWidth,
      height: handlerWidth,
    });
    return (
      <Movable style={containerStyle}
        onMove={this.handleMove}
        onHold={this.handleHold}
        onDrop={this.handleDrop}
      >
        <div style={lineStyle}></div>
        <div style={handlerStyle}></div>
      </Movable>
    );
  },
});
export default PixelMovableMarker;
