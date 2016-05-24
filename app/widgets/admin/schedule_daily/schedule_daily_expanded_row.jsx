import React from 'react';
import moment from 'moment';

const ExpandedRow = (props) => (
  <div className="ScheduleDailyWidget-CalendarRow-item-expanded">
    <ul className="ScheduleDailyWidget-CalendarRow-item-expanded-list">
      {props.items.sortBy(item => item.toJS().start_at).map(item => (
        <li key={item.get('id')}>
          <div
            key={item.get('id')}
            className={props.getClassName(item)}
            onClick={() => props.markAsActive(item)}
          >
            {item.get('name') || item.get('id')} -
            - {moment(item.get('start_at')).format('HH:mm:ss.SSSS')}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

ExpandedRow.propTypes = {
  items: React.PropTypes.object.isRequired,
  getClassName: React.PropTypes.func.isRequired,
  markAsActive: React.PropTypes.func.isRequired,
};

export default ExpandedRow;
