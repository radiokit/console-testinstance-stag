import React from 'react';

import Movable from '../general/movable.jsx';
import makeUniqStyle from './uniqStyle';
const uniqStyle = makeUniqStyle();

import './pixel_movable_block.scss';

const PixelMovableBlock = React.createClass({
  propTypes: {
    color: React.PropTypes.string.isRequired,
    opacity: React.PropTypes.number,
    height: React.PropTypes.number.isRequired,
    offset: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    onMove: React.PropTypes.func,
  },

  handleMove({ x }) {
    this.props.onMove && this.props.onMove(x);
  },

  render() {
    const {
      color,
      opacity = 0.2,
      height,
      width,
    } = this.props;

    const containerStyle = uniqStyle({
      transform: `translateX(${this.props.offset}px)`,
      backgroundColor: color,
      opacity,
      height,
      width,
    });

    return (
      <Movable
        className="PixelMovableBlock"
        holdClassName="PixelMovableBlock PixelMovableBlock--held"
        style={containerStyle}
        onMove={this.handleMove}
      />
    );
  },
});

export default PixelMovableBlock;
