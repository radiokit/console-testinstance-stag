import React from 'react';

import {
  formatHMS,
} from './schedule_daily_expanded_row_utils';

const ExpandedRowSilence = ({ item }) => (
  <li key={item.get('id')}>
    <div className="ScheduleDailyWidget-CalendarRow-item ScheduleDailyWidget-CalendarRow-silence">
      {formatHMS(item.get('cue_in_at'))}
      {' - '}
      {formatHMS(item.get('cue_out_at'))}
    </div>
  </li>
);

ExpandedRowSilence.propTypes = {
  item: React.PropTypes.object,
};

export default ExpandedRowSilence;
