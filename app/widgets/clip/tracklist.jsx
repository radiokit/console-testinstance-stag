import React from 'react';
import ReactDOM from 'react-dom';

import {
  debounce,
  throttle,
  range,
} from 'lodash';

import {
  Map,
  List,
} from 'immutable';

import TrackItems from './track_items.jsx';
import TrackCursor from './track_cursor.jsx';
import TrackTimeMarks from './track_time_marks.jsx';
import makeUniqStyle from './uniqStyle';
const uniqStyle = makeUniqStyle();

import './tracklist.scss';

function getElementOffset(originalElement) {
  let element = originalElement;
  let elementOffsetLeft = 0;
  let elementOffsetTop = 0;
  while (element) {
    elementOffsetLeft += element.offsetLeft | 0;
    elementOffsetTop += element.offsetTop | 0;
    element = element.offsetParent;
  }
  return {
    x: elementOffsetLeft,
    y: elementOffsetTop,
  };
}

const TrackList = React.createClass({

  propTypes: {
    offsetStart: React.PropTypes.number,
    offsetLength: React.PropTypes.number,

    width: React.PropTypes.number.isRequired,
    visibleTracksCount: React.PropTypes.number,
    trackHeight: React.PropTypes.number,

    playlist: React.PropTypes.object,
    clip: React.PropTypes.object,

    cursorTime: React.PropTypes.number,
    onSelectTime: React.PropTypes.func,

    onPlaylistChange: React.PropTypes.func,
    onItemChange: React.PropTypes.func,
    onClipChange: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      offsetStart: 0,
      offsetLength: 0,
      visibleTracksCount: null,
      trackHeight: 100,
      cursorTime: null,
    };
  },

  getInitialState() {
    return {
      mouseCursorPosition: null,
    };
  },

  componentWillMount() {
    this.mouseMoveTimestamp = null;
    this.timeoutCursor = debounce(() => this.handleMouseLeave(), 1000);
    this.throttledSetState = throttle(
      s => (window.requestAnimationFrame || window.setTimeout)(() => this.setState(s)),
      1000 / 30
    );
  },

  getMouseOffset(e) {
    return {
      x: e.clientX - getElementOffset(ReactDOM.findDOMNode(this)).x,
      y: e.clientY - getElementOffset(ReactDOM.findDOMNode(this)).y,
    };
  },

  getOffsetStart() {
    return (this.props.clip ? 0 : this.props.offsetStart);
  },

  getOffsetLength() {
    return (this.props.clip)
      ? Math.max(this.props.offsetLength, this.props.clip.get('duration'))
      : this.props.offsetLength;
  },

  getTrackList() {
    const { playlist, clip } = this.props;

    // playlist input
    return playlist ||

      // clip input
      (clip && Map({
        items: List([
          Map({
            track: 1,
            position: 0,
            offsetStart: 0,
            offsetLength: clip.get('duration'),
            maxOffsetLength: clip.get('duration'),
            fadeIn: 0,
            fadeOut: 0,
            clip,
          }),
        ]),
      })) ||

      // no input
      Map({
        items: List(),
      });
  },

  getTrackItems() {
    return this.getTrackList().get('items');
  },

  getTracksCount() {
    return this.props.visibleTracksCount ||
      this.getTrackItems().reduce((v, item) => Math.max(item.get('track') - 1, v), 1);
  },

  handleClipChange(newClip, oldClip) {
    this.props.onClipChange && this.props.onClipChange(newClip, oldClip);
  },

  handleItemChange(newItem, oldItem) {
    const { playlist, onItemChange, onPlaylistChange } = this.props;
    if (onItemChange && playlist) {
      onItemChange(newItem, oldItem);
    }
    if (onPlaylistChange && playlist) {
      const newTrackItems = playlist.get('items').map(
        item => ((item.get('id') === newItem.get('id')) ? newItem : item)
      );
      const newPlaylist = playlist.set('items', newTrackItems);
      onPlaylistChange(newPlaylist, playlist);
    }
  },

  handleClick(e) {
    // condition for not treating clicks
    // that are raised immediately after moving a mouse
    // as clicks to move cursor
    if (this.mouseMoveTimestamp < Date.now() - 100) {
      const offsetX = this.getMouseOffset(e).x;
      const offsetTime = (
        offsetX *
        this.getOffsetLength() /
        this.props.width +
        this.getOffsetStart()
      );
      this.props.onSelectTime && this.props.onSelectTime(offsetTime);
    }
  },

  handleMouseLeave() {
    this.storeMousePosition(null);
  },

  handleMouseMove(e) {
    this.storeMousePosition(this.getMouseOffset(e).x);
    this.timeoutCursor();
    this.mouseMoveTimestamp = Date.now();
  },

  storeMousePosition(mouseCursorPosition) {
    if (this.props.cursorTime) {
      // setState with a delay but only if mouse button is not being held down
      (this.mouseDownTime ? () => null : this.throttledSetState)({ mouseCursorPosition });
    }
  },

  render() {
    const offsetStart = this.getOffsetStart();
    const offsetLength = this.getOffsetLength();
    const contStyle = ({
      position: 'relative',
      width: this.props.width,
    });
    return (
      <div className="TrackList"
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}
        style={contStyle}
      >
        <TrackTimeMarks
          offsetStart={offsetStart}
          offsetLength={offsetLength}
          width={this.props.width}
        />
        <TrackLines
          tracksCount={this.getTracksCount()}
          trackHeight={this.props.trackHeight}
        />
        <TrackItems
          style={uniqStyle({
            ...contStyle,
            height: this.props.trackHeight * (this.getTracksCount()),
          })}
          items={this.getTrackItems()}
          offsetStart={offsetStart}
          offsetLength={offsetLength}
          width={this.props.width}
          height={this.props.trackHeight}
          fadesOf={this.props.clip ? 'clip' : 'item'}
          onItemChange={this.handleItemChange}
          onClipChange={this.handleClipChange}
          onClick={this.handleClick}
        />
        <TrackListCursors
          playPosition={(
            (this.props.cursorTime === null)
              ? null
              : ((this.props.cursorTime - offsetStart) * this.props.width / offsetLength)
          )}
          mousePosition={this.state.mouseCursorPosition}
        />
      </div>
    );
  },
});

export default TrackList;

const TrackListCursors = ({ playPosition, mousePosition }) => (
  <div>
    {(typeof playPosition === 'number') && (<TrackCursor left={playPosition} />)}
    {
      (typeof mousePosition === 'number') &&
      (<TrackCursor left={mousePosition} style={{ opacity: 0.25 }} />)
    }
  </div>
);

TrackListCursors.propTypes = {
  playPosition: React.PropTypes.number,
  mousePosition: React.PropTypes.number,
};

const TrackLines = ({ tracksCount, trackHeight }) => (
    <div className="TrackList__tracks">
      {range(0, tracksCount).map(num => (
        <div className="TrackList__tracks__line"
          key={num}
          style={{ transform: `translateY(${num * trackHeight}px)` }}
        />
      )) }
    </div>
  );

TrackLines.propTypes = {
  tracksCount: React.PropTypes.number,
  trackHeight: React.PropTypes.number,
};
