import React from 'react';

import {
  formatHMS,
} from './schedule_daily_expanded_row_utils';

const ExpandedRowSilence = ({ item, timezone }) => (
  <li key={item.get('id')}>
    <div className="ScheduleDailyWidget-CalendarRow-item ScheduleDailyWidget-CalendarRow-silence">
      {formatHMS(item.get('cue_in_at'), timezone)}
      {' - '}
      {formatHMS(item.get('cue_out_at'), timezone)}
    </div>
  </li>
);

ExpandedRowSilence.propTypes = {
  item: React.PropTypes.object,
  timezone: React.PropTypes.string.isRequired,
};

export default ExpandedRowSilence;
