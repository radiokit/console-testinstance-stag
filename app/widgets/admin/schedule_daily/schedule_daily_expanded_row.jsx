import React from 'react';
import ScheduleDailyExpandedRowElements from './schedule_daily_expanded_row_elements.jsx';
import ExpandedRowItem from './schedule_daily_expanded_row_item.jsx';
import ExpandedRowSilence from './schedule_daily_expanded_row_silence.jsx';

import {
  getScheduleItemStartTimestamp,
  itemsToRanges,
  subtractFromSingleRange,
  rangeToItem,
  isRangeLongerThan,
  isRangeOnEdge,
} from './schedule_daily_expanded_row_utils';

const hourInMilliseconds = 1000 * 60 * 60;

const ExpandedRow = ({ items, activeItem, markAsActive, offsetStart }) => {
  const activeItemId = activeItem && activeItem.get('id') || '';

  const offsetRange = [offsetStart, offsetStart + hourInMilliseconds];
  const itemRanges = itemsToRanges(items);
  const silenceRanges = subtractFromSingleRange(offsetRange, itemRanges);

  const isRangeLongerThanSecond = isRangeLongerThan.bind(null, 1000);
  const isRangeOnOffsetEdges = isRangeOnEdge.bind(null, offsetRange[0], offsetRange[1]);

  const silenceItems = silenceRanges
    .filter(
      range => (
        isRangeLongerThanSecond(range) ||
        isRangeOnOffsetEdges(range)
      )
    )
    .map(rangeToItem);

  const allItems = items
    .toArray()
    .map(item => ({ component: ExpandedRowItem, item }))
    .concat(silenceItems.map(silenceItem => ({ component: ExpandedRowSilence, item: silenceItem })))
    .sort(
      ({ item: a }, { item: b }) =>
        getScheduleItemStartTimestamp(a) - getScheduleItemStartTimestamp(b)
    );

  const view = (
    <div className="ScheduleDailyWidget-CalendarRow-item-expanded">
      <ul className="ScheduleDailyWidget-CalendarRow-item-expanded-list">
        <ScheduleDailyExpandedRowElements
          items={allItems}
          markAsActive={markAsActive}
          activeItemId={activeItemId}
        />
      </ul>
    </div>
  );

  return view;
};

ExpandedRow.propTypes = {
  offsetStart: React.PropTypes.number.isRequired,
  items: React.PropTypes.object.isRequired,
  activeItem: React.PropTypes.object,
  markAsActive: React.PropTypes.func.isRequired,
};

export default ExpandedRow;
