import React from 'react';

import Movable from '../general/movable.jsx';
import makeUniqStyle from './uniqStyle';
const uniqStyle = makeUniqStyle();

import './pixel_movable_marker.scss';

const PixelMovableMarker = React.createClass({
  propTypes: {
    color: React.PropTypes.string.isRequired,
    height: React.PropTypes.number.isRequired,
    offset: React.PropTypes.number.isRequired,
    onMove: React.PropTypes.func,
  },

  handleMove({ x }) {
    this.props.onMove && this.props.onMove(x);
  },

  render() {
    const handlerWidth = 10;
    const containerWidth = handlerWidth * 3;
    const rootProps = {
      className: 'PixelMovableMarker',
      holdClassName: 'PixelMovableMarker PixelMovableMarker--held',
      style: uniqStyle({
        transform: `translateX(${Math.round(containerWidth / -2 + this.props.offset)}px)`,
        height: this.props.height,
        width: containerWidth,
      }),
      onMove: this.handleMove,
    };
    const lineProps = {
      className: 'PixelMovableMarker__line',
      style: {
        backgroundColor: this.props.color,
        transform: `translateX(${Math.round(containerWidth / 2)}px)`,
        height: this.props.height,
      },
    };
    const handlerProps = {
      className: 'PixelMovableMarker__handler',
      style: {
        backgroundColor: this.props.color,
        transform: `translateY(${Math.round(this.props.height / 2 - handlerWidth / 2)}px) ` +
        `translateX(${Math.round((containerWidth - handlerWidth) / 2)}px)`,
        width: handlerWidth,
        height: handlerWidth,
      },
    };
    return (
      <Movable {...rootProps}>
        <div {...lineProps} />
        <div {...handlerProps} />
      </Movable>
    );
  },
});

export default PixelMovableMarker;
