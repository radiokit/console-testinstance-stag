import React from 'react';
import moment from 'moment-timezone';
import makeUniqStyle from './uniqStyle';
const uniqStyle = makeUniqStyle();

import padLeft from '../../helpers/pad_left';

const TrackTimeMarks = ({ offsetStart, offsetLength, width, type, dateTimezone }) => {
  const formattingFunc = ({
    relative: formatMiliseconds,
    date: formatDate.bind(null, dateTimezone),
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
  // usable only with type == 'date'
  dateTimezone: React.PropTypes.string,
  offsetStart: React.PropTypes.number.isRequired,
  offsetLength: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
};

export default TrackTimeMarks;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/**
 * @param {number} ts
 * @returns {string}
 */
function formatMiliseconds(ts) {
  return [
    padLeft(Math.floor(ts / 60000).toString(), 3, '0'),
    ':',
    padLeft(Math.floor((ts % 60000) / 1000).toString(), 2, '0'),
    ':',
    padLeft(Math.floor(ts % 1000).toString(), 3, '0'),
    '',
  ].join('');
}

/**
 * @param {string} dateTimezone
 * @param {number} ts
 * @returns {string}
 */
function formatDate(dateTimezone, ts) {
  return moment.tz(new Date(ts).valueOf(), dateTimezone).format(
    'YYYY-MM-DD HH:mm:SSZZ'
  );
}
