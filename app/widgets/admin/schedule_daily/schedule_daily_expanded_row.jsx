import React from 'react';

import ExpandedRowItem from './schedule_daily_expanded_row_item.jsx';
import ExpandedRowSilence from './schedule_daily_expanded_row_silence.jsx';

import {
  itemsToRanges,
  subtractFromSingleRange,
  rangeToItem,
  isRangeLongerThan,
  isRangeOnEdge,
} from './schedule_daily_expanded_row_utils';

const hourInMiliseconds = 1000 * 60 * 60;

const ExpandedRow = ({ items, activeItem, markAsActive, offsetStart }) => {
  const activeItemId = activeItem && activeItem.get('id') || '';

  const offsetRange = [offsetStart, offsetStart + hourInMiliseconds];
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

  const view = (
    <div className="ScheduleDailyWidget-CalendarRow-item-expanded">
      <ul className="ScheduleDailyWidget-CalendarRow-item-expanded-list">
        {
          items
            .toArray()
            .map(item => [ExpandedRowItem, item])
            .concat(silenceItems.map(silenceItem => [ExpandedRowSilence, silenceItem]))
            .sort(([, a], [, b]) => getElementStartTimestamp(a) - getElementStartTimestamp(b))
            .map(([Element, item], i) => (
              <Element
                key={i}
                item={ item }
                isActive={ activeItemId === item.get('id') }
                markAsActive={ markAsActive }
              />
            ))
        }
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

function getElementStartTimestamp(item) {
  return new Date(item.get('cue_in_at')).valueOf();
}
