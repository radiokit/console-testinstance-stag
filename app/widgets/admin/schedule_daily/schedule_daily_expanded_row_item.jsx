import React from 'react';
import classNames from 'classnames';

import {
  formatHMS,
} from './schedule_daily_expanded_row_utils';

const ExpandedRowItem = ({ item, isActive, markAsActive }) => (
  <li key={item.get('id')}>
    <div
      className={classNames(
        'ScheduleDailyWidget-CalendarRow-item btn',
        {
          'ScheduleDailyWidget-CalendarRow-item--active btn-raised': isActive,
        }
      )}
      onClick={() => markAsActive(item)}
    >
      {formatHMS(item.get('cue_in_at'))}
      {' - '}
      {item.get('name') || item.get('id')}
    </div>
  </li>
);

ExpandedRowItem.propTypes = {
  item: React.PropTypes.object,
  isActive: React.PropTypes.bool.isRequired,
  markAsActive: React.PropTypes.func.isRequired,
};

export default ExpandedRowItem;
