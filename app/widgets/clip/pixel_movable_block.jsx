import React from 'react';

import Movable from '../general/movable.jsx';
import makeUniqStyle from './uniqStyle';
const uniqStyle = makeUniqStyle();

const PixelMovableBlock = React.createClass({
  propTypes: {
    color: React.PropTypes.string.isRequired,
    opacity: React.PropTypes.number,
    height: React.PropTypes.number.isRequired,
    offset: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    onMove: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      opacity: 0.2,
    };
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
    const containerStyle = uniqStyle({
      position: 'absolute', top: 0, left: 0,
      transform: `translateX(${this.props.offset}px)`,
      backgroundColor: this.props.color,
      opacity: this.props.opacity,
      height: this.props.height,
      width: this.props.width,
      zIndex: this.state.mouseHold ? 2 : 1,
    });
    return (
      <Movable style={containerStyle}
        onMove={this.handleMove}
        onHold={this.handleHold}
        onDrop={this.handleDrop}
      />
    );
  },
});

export default PixelMovableBlock;
