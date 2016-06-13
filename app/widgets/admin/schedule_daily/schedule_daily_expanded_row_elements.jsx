import React from 'react';
import ExpandedRowSilence from './schedule_daily_expanded_row_silence.jsx';

const ScheduleDailyExpandedRowElements = ({
  items,
  activeItemId,
  markAsActive,
}) => {
  if (items.length === 1 && items[0].component === ExpandedRowSilence) {
    return <noscript />;
  }
  return (
    <div>
      {
        items
          .map(({ component: Element, item }, i) => (
            <Element
              key={i}
              item={ item }
              isActive={ activeItemId === item.get('id') }
              markAsActive={ markAsActive }
            />
          ))
      }
    </div>
  );
};

ScheduleDailyExpandedRowElements.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.object),
  activeItemId: React.PropTypes.string,
  markAsActive: React.PropTypes.func,
};

export default ScheduleDailyExpandedRowElements;
