import React from 'react';

import Movable from '../general/movable.jsx';
import TrackList from './tracklist.jsx';
import makeUniqStyle from './uniqStyle';
const uniqStyle = makeUniqStyle();

const ScrollableTracklist = React.createClass({

  propTypes: {
    offsetStart: React.PropTypes.number,
    offsetLength: React.PropTypes.number,

    width: React.PropTypes.number.isRequired,

    scrollable: React.PropTypes.bool,
    zoomable: React.PropTypes.bool,
    minOffsetLength: React.PropTypes.number,
    maxOffsetLength: React.PropTypes.number,
    onChangeOffset: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      scrollable: false,
      zoomable: false,
      minOffsetLength: 1000,
      maxOffsetLength: 24 * 60 * 60 * 1000,
    };
  },

  getInitialState() {
    return {
      offsetLeft: 0,
      offsetWidth: 0,
    };
  },

  setNewBonus({ left, width }) {
    const props = this.props;
    const normalizedState = {
      ...this.state,
    };
    const timeScale = this.getOffsetLength() / props.width;

    if (left) {
      normalizedState.offsetLeft += left * timeScale;
    }

    if (width) {
      normalizedState.offsetWidth += width * timeScale;
      if (this.getOffsetStart(normalizedState) < 0) {
        normalizedState.offsetWidth = normalizedState.offsetWidth + normalizedState.offsetLeft;
        normalizedState.offsetLeft = -1 * props.offsetStart;
      }
    }

    if (
      this.getOffsetStart(normalizedState) >= 0 &&
      this.getOffsetLength(normalizedState) >= props.minOffsetLength &&
      this.getOffsetLength(normalizedState) <= props.maxOffsetLength
    ) {
      this.setState(normalizedState);
      props.onChangeOffset && props.onChangeOffset({
        offsetStart: this.getOffsetStart(),
        offsetLength: this.getOffsetLength(),
      });
    }
  },

  getOffsetStart(state) {
    return this.props.offsetStart + (state || this.state).offsetLeft;
  },

  getOffsetLength(state) {
    return this.props.offsetLength + (state || this.state).offsetWidth;
  },

  handleWheel(e) {
    const hMovement = e.deltaX;
    const vMovement = e.deltaY;
    if ((hMovement > 0 || hMovement < 0) && Math.abs(hMovement) > Math.abs(vMovement)) {
      if (e.shiftKey && this.props.zoomable) {
        this.zoom(-1 * hMovement);
      } else {
        this.scrollHorizontally(hMovement);
      }
      e.preventDefault();
    }
  },

  handleScroll({ x }) {
    this.scrollHorizontally(-1 * x);
    this.mouseDownTime = 0;
  },

  handleScrollStart() {
    this.setState({ scrolling: true });
  },

  handleScrollFinish() {
    this.setState({ scrolling: false });
  },

  scrollHorizontally(x) {
    if (!this.props.scrollable) {
      return;
    }
    this.setNewBonus({
      left: x,
    });
  },

  zoom(diff) {
    if (!this.props.zoomable) {
      return;
    }
    const cappedDiff = Math.min(100, Math.abs(diff)) * Math.sign(diff);
    this.setNewBonus({
      left: cappedDiff,
      width: cappedDiff * -2,
    });
  },

  render() {
    const trackListProps = {
      ...this.props,
      offsetStart: this.getOffsetStart(),
      offsetLength: this.getOffsetLength(),
    };
    return (
      <Movable
        onMove={this.handleScroll}
        onHold={this.handleScrollStart}
        onDrop={this.handleScrollFinish}
        onWheel={this.handleWheel}
        style={uniqStyle({ width: this.props.width })}
      >
        <TrackList {...trackListProps} />
      </Movable>
    );
  },
});
export default ScrollableTracklist;
