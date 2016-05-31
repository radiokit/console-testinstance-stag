import React from 'react';
import {
  fromJS,
} from 'immutable';
import moment from 'moment';

const ExpandedRow = (props) => (
  <div className="ScheduleDailyWidget-CalendarRow-item-expanded">
    <ul className="ScheduleDailyWidget-CalendarRow-item-expanded-list">
      {props
        .items
        .toJS()
        .sort((a, b) => new Date(a.start_at) - new Date(b.start_at))
        .map(item => (
        <li key={item.id}>
          <div
            key={item.id}
            className={props.getClassName(fromJS(item))}
            onClick={() => props.markAsActive(fromJS(item))}
          >
            {moment(item.start_at).format('HH:mm:ss')} -
            - {item.name || item.id}
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
