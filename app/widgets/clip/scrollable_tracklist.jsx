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
  },

  getInitialState() {
    return {
      offsetLeft: 0,
      offsetWidth: 0,
    };
  },

  setNewBonus(modification) {
    const normalizedState = {
      ...this.state,
    };
    if (modification.offsetLeft) {
      normalizedState.offsetLeft += modification.offsetLeft / this.props.width * this.getOffsetLength();
    }
    if (modification.offsetWidth) {
      normalizedState.offsetWidth += modification.offsetWidth / this.props.width * this.getOffsetLength();

      if (this.getOffsetStart(normalizedState) < 0) {
        normalizedState.offsetWidth = normalizedState.offsetWidth + normalizedState.offsetLeft;
        normalizedState.offsetLeft = -1 * this.props.offsetStart;
      }
    }
    if (this.getOffsetStart(normalizedState) >= 0 && this.getOffsetLength(normalizedState) > 1000) {
      this.setState(normalizedState);
    }
  },

  zoom(diff) {
    if (!this.props.zoomable) {
      return;
    }
    const cappedDiff = Math.min(100, Math.abs(diff)) * Math.sign(diff);
    this.setNewBonus({
      offsetLeft: cappedDiff,
      offsetWidth: cappedDiff * -2,
    });
  },

  scrollHorizontally(x) {
    if (!this.props.scrollable) {
      return;
    }
    this.setNewBonus({
      offsetLeft: x,
    });
  },

  handleWheel(e) {
    const hMovement = e.deltaX;
    const vMovement = e.deltaY;
    if ((hMovement > 0 || hMovement < 0) && Math.abs(hMovement) > Math.abs(vMovement)) {
      if (e.shiftKey && this.props.zoomable) {
        this.zoom(hMovement);
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

  getOffsetStart(state) {
    return this.props.offsetStart + (state || this.state).offsetLeft;
  },

  getOffsetLength(state) {
    return this.props.offsetLength + (state || this.state).offsetWidth;
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
