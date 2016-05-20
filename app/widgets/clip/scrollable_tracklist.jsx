import React from 'react';

import Movable from '../general/movable.jsx';
import TrackList from './track_list.jsx';

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
  
  changeOffset(offsetStartModification = 0, offsetLengthModification = 0) {
    const {
      offsetStart,
      offsetLength,
      minOffsetLength,
      maxOffsetLength,
      onChangeOffset,
    } = this.props;
    let normalizedOffsetStartModification = offsetStartModification;
    let normalizedOffsetLengthModification = offsetLengthModification;

    if (offsetStart + normalizedOffsetStartModification < 0) {
      normalizedOffsetLengthModification = (
        normalizedOffsetLengthModification +
        normalizedOffsetStartModification
      );
      normalizedOffsetStartModification = -1 * offsetStart;
    }

    const offsetStartCandidate = offsetStart + normalizedOffsetStartModification;
    const offsetLengthCandidate = offsetLength + normalizedOffsetLengthModification;

    if (
      offsetStartCandidate >= 0 &&
      offsetLengthCandidate >= minOffsetLength &&
      offsetLengthCandidate <= maxOffsetLength
    ) {
      onChangeOffset && onChangeOffset({
        offsetStart: offsetStartCandidate,
        offsetLength: offsetLengthCandidate,
      });
    }

  },

  changePixelOffset(leftModification, widthModification) {
    const {
      offsetLength,
      width,
    } = this.props;
    const timeScale = offsetLength / width;
    this.changeOffset(leftModification * timeScale, widthModification * timeScale);
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

  scrollHorizontally(x) {
    if (!this.props.scrollable) {
      return;
    }
    this.changePixelOffset(x, 0);
  },

  zoom(diff) {
    if (!this.props.zoomable) {
      return;
    }
    const cappedDiff = Math.min(100, Math.abs(diff)) * Math.sign(diff);
    this.changePixelOffset(cappedDiff, cappedDiff * -2);
  },

  render() {
    const trackListProps = {
      ...this.props,
    };
    return (
      <Movable
        onMove={this.handleScroll}
        onWheel={this.handleWheel}
        style={{ width: this.props.width }}
      >
        <TrackList {...trackListProps} />
      </Movable>
    );
  },
});
export default ScrollableTracklist;
