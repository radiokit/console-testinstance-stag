import React from 'react';
import classNames from 'classnames';

import Movable from '../general/movable.jsx';

import './pixel_movable_fade_region.scss';

const PixelMovableFadeRegion = React.createClass({
  propTypes: {
    regionKey: React.PropTypes.string.isRequired,
    height: React.PropTypes.number.isRequired,
    offset: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    onMove: React.PropTypes.func,
  },

  getInitialState() {
    return {
      marker1Active: false,
      marker2Active: false,
    };
  },

  handleMove(startX, endX) {
    this.props.onMove && this.props.onMove(startX, endX);
  },

  render() {
    const isFadeIn = this.props.regionKey === 'fadeIn';
    const markerWidth = 15;

    const rootProps = {
      className: 'PixelMovableFadeRegion',
      style: {
        transform: `translateX(${this.props.offset}px)`,
        height: this.props.height,
        width: this.props.width,
      }
    }
    const marker1Props = {
      className: classNames({
        'PixelMovableFadeRegion__marker': true,
        'PixelMovableFadeRegion__marker--active': !!this.state.marker1Active,
      }),
      style: {
        top: isFadeIn ? '' : 0,
        bottom: isFadeIn ? 0 : '',
        left: 0 - (!isFadeIn | 0) * markerWidth,
      },
      onHold: () => this.setState({marker1Active: true}),
      onDrop: () => this.setState({marker1Active: false}),
      onMove: ({x}) => this.handleMove(x, -1 * x),
    };
    const marker2Props = {
      className: classNames({
        'PixelMovableFadeRegion__marker': true,
        'PixelMovableFadeRegion__marker--active': !!this.state.marker2Active,
      }),
      style: {
        top: !isFadeIn ? '' : 0,
        bottom: !isFadeIn ? 0 : '',
        left: this.props.width - (!isFadeIn | 0) * markerWidth,
      },
      onHold: () => this.setState({marker2Active: true}),
      onDrop: () => this.setState({marker2Active: false}),
      onMove: ({x}) => this.handleMove(0, x),
    }
    const blockProps = {
      className: 'PixelMovableFadeRegion__block',
      style: {
        right: -1 * markerWidth * (isFadeIn | 0),
        left: -1 * markerWidth * (!isFadeIn | 0),
      },
      onMove: ({x}) => this.handleMove(x, 0),
    };

    const lineReachX = this.props.width;
    const lineReachY = this.props.height - markerWidth;
    const skewX = 90 - Math.atan(lineReachY / lineReachX) * 180 / Math.PI * (isFadeIn ? -1 : 1);
    const translateX = lineReachX / 2;
    const lineProps = {
      className: 'PixelMovableFadeRegion__line',
      style: {
        height: lineReachY,
        transform: `skewX(${skewX}deg) translateX(${translateX}px)`,
        borderLeftWidth: 1 + lineReachX / lineReachY,
      },
      onMove: ({x}) => this.handleMove(x, 0),
    };

    return (
      <div {...rootProps}>
        <Movable {...blockProps} />
        <div {...lineProps} />
        <Movable {...marker1Props} />
        <Movable {...marker2Props} />
      </div>
    );
  }
});
export default PixelMovableFadeRegion;
