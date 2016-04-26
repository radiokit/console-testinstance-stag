import React from 'react';

import makeUniqStyle from './uniqStyle';
const uniqStyle = makeUniqStyle();

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
  return [
    padLeft(Math.floor(n / 60000).toString(), 3, '0'),
    ':',
    padLeft(Math.floor((n % 60000) / 1000).toString(), 2, '0'),
    ':',
    padLeft(Math.floor(n % 1000).toString(), 3, '0'),
    '',
  ].join('');
}

function formatDate(n) {
  const d = new Date(n);
  return `${
    d.getUTCFullYear()
    }-${
    padLeft(d.getUTCMonth(), 2, '0')
    }-${
    padLeft(d.getUTCDate(), 2, '0')
    } ${
    padLeft(d.getUTCHours(), 2, '0')
    }:${
    padLeft(d.getUTCMinutes(), 2, '0')
    }:${
    padLeft(d.getUTCSeconds(), 2, '0')
    }:${
    padLeft(d.getUTCMilliseconds(), 2, '0')
    }`;
}

const TrackTimeMarks = ({ offsetStart, offsetLength, width, type }) => {
  const formattingFunc = ({
    relative: formatMiliseconds,
    date: formatDate,
  })[type];

  return (
    <div className="TrackList__timeBar">

      <div className="TrackList__time">{formattingFunc(offsetStart)}</div>

      <div className="TrackList__time"
        style={uniqStyle({ transform: `translateX(${width * 1 / 4}px)` })}
      >
        {formattingFunc(offsetStart + offsetLength * 1 / 4)}
      </div>

      <div className="TrackList__time"
        style={uniqStyle({ transform: `translateX(${width * 2 / 4}px)` })}
      >
        {formattingFunc(offsetStart + offsetLength * 2 / 4)}
      </div>

      <div className="TrackList__time"
        style={uniqStyle({ transform: `translateX(${width * 3 / 4}px)` })}
      >
        {formattingFunc(offsetStart + offsetLength * 3 / 4)}
      </div>
    </div>
  );
};

TrackTimeMarks.propTypes = {
  type: React.PropTypes.oneOf(['relative', 'date']).isRequired,
  offsetStart: React.PropTypes.number.isRequired,
  offsetLength: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
};

export default TrackTimeMarks;
