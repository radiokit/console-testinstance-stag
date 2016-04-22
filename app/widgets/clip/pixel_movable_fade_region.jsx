import React from 'react';
import classNames from 'classnames';

import Movable from '../general/movable.jsx';
import makeUniqStyle from './uniqStyle';
const uniqStyle = makeUniqStyle();

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

  makeMarker1Active() {
    this.setState({ marker1Active: true });
  },

  makeMarker1Inactive() {
    this.setState({ marker1Active: false });
  },

  handleMarker1Move({ x }) {
    this.handleMove(x, -1 * x);
  },

  makeMarker2Active() {
    this.setState({ marker2Active: true });
  },

  makeMarker2Inactive() {
    this.setState({ marker2Active: false });
  },

  handleMarker2Move({ x }) {
    this.handleMove(0, x);
  },

  handleBlockMove({ x }) {
    this.handleMove(x, 0);
  },

  render() {
    const isFadeIn = this.props.regionKey === 'fadeIn';
    const markerWidth = 15;

    const rootProps = {
      className: 'PixelMovableFadeRegion',
      style: ({
        transform: `translateX(${Math.round(this.props.offset)}px)`,
        height: this.props.height,
        width: this.props.width,
        pointerEvents: 'auto',
      }),
    };
    const marker1Props = {
      className: classNames({
        PixelMovableFadeRegion__marker: true,
        'PixelMovableFadeRegion__marker--active': !!this.state.marker1Active,
      }),
      style: uniqStyle({
        top: isFadeIn ? '' : 0,
        bottom: isFadeIn ? 0 : '',
        left: Math.round(0 - (!isFadeIn | 0) * markerWidth),
      }),
      onHold: this.makeMarker1Active,
      onDrop: this.makeMarker1Inactive,
      onMove: this.handleMarker1Move,
    };
    const marker2Props = {
      className: classNames({
        PixelMovableFadeRegion__marker: true,
        'PixelMovableFadeRegion__marker--active': !!this.state.marker2Active,
      }),
      style: uniqStyle({
        top: !isFadeIn ? '' : 0,
        bottom: !isFadeIn ? 0 : '',
        left: Math.round(this.props.width - (!isFadeIn | 0) * markerWidth),
      }),
      onHold: this.makeMarker2Active,
      onDrop: this.makeMarker2Inactive,
      onMove: this.handleMarker2Move,
    };
    const blockProps = {
      className: 'PixelMovableFadeRegion__block',
      style: uniqStyle({
        right: Math.round(-1 * markerWidth * (isFadeIn | 0)),
        left: Math.round(-1 * markerWidth * (!isFadeIn | 0)),
      }),
      onMove: this.handleBlockMove,
    };

    const lineReachX = Math.round(this.props.width);
    const lineReachY = Math.round(this.props.height - markerWidth);
    const skewX = 90 - Math.atan(lineReachY / lineReachX) * 180 / Math.PI * (isFadeIn ? -1 : 1);
    const translateX = Math.round(lineReachX / 2);
    const lineProps = {
      className: 'PixelMovableFadeRegion__line',
      style: ({
        height: lineReachY,
        transform: `skewX(${skewX}deg) translateX(${translateX}px)`,
        borderLeftWidth: 1 + lineReachX / lineReachY,
      }),
    };

    return (
      <div {...rootProps}>
        <Movable {...blockProps} />
        <div {...lineProps} />
        <Movable {...marker1Props} />
        <Movable {...marker2Props} />
      </div>
    );
  },
});

export default PixelMovableFadeRegion;
