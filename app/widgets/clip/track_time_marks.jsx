import React from 'react';

import {
  range,
} from 'lodash';

function padLeft(s = '', length = 0, fill = ' ') {
  if (s.length >= length) {
    return s;
  }
  return (range(0, length - 1).map(() => fill).join('') + s).split('').splice(-1 * length).join('');
}

function formatMiliseconds(n) {
  return padLeft(Math.floor(n / 60000).toString(), 3, '0') +
    ':' +
    padLeft(Math.floor((n % 60000) / 1000).toString(), 2, '0') +
    ':' +
    padLeft(Math.floor(n % 1000).toString(), 3, '0') +
    '';
}

const TrackTimeMarks = ({offsetStart, offsetLength, width}) => {
  return (
    <div className="TrackList__timeBar">
      <div className="TrackList__time">{formatMiliseconds(offsetStart)}</div>
      <div className="TrackList__time" style={{transform:`translateX(${width * 1 / 4}px)`}}>
        {formatMiliseconds(offsetStart + offsetLength * 1 / 4)}
      </div>
      <div className="TrackList__time" style={{transform:`translateX(${width * 2 / 4}px)`}}>
        {formatMiliseconds(offsetStart + offsetLength * 2 / 4)}
      </div>
      <div className="TrackList__time" style={{transform:`translateX(${width * 3 / 4}px)`}}>
        {formatMiliseconds(offsetStart + offsetLength * 3 / 4)}
      </div>
    </div>
  )
};

export default TrackTimeMarks;
