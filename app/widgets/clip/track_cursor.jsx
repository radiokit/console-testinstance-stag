import React from 'react';

import './track_cursor.scss';

const TrackCursor = React.createClass({

  propTypes: {
    style: React.PropTypes.object,
    // either
    left: React.PropTypes.number,
    // or
    cursorTime: React.PropTypes.number,
    offsetStart: React.PropTypes.number,
    offsetLength: React.PropTypes.number,
    width: React.PropTypes.number,
  },

  render() {
    const { cursorTime, offsetLength, offsetStart, width, left } = this.props;

    const cursorLeft = (typeof left === 'number')
      ? left
      : ((cursorTime - offsetStart) * width / offsetLength);

    const trackWidth = (typeof left === 'number') ? left : width;

    if (cursorLeft > 0 && cursorLeft <= trackWidth) {
      const rootStyle = {
        ...this.props.style,
        transform: `translateX(${cursorLeft}px)`,
      };

      return (
        <div className="TrackCursor" style={rootStyle}>
          <div className="TrackCursor__line"></div>
          <div className="TrackCursor__top"></div>
          <div className="TrackCursor__bottom"></div>
        </div>
      );
    }
    return null;
  },
});
export default TrackCursor;
