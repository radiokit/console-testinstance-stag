import React from 'react';
import { Range, Map, OrderedMap, List } from 'immutable';
import moment from 'moment';
import CalendarRow from './schedule_daily_calendar_row.jsx';
import connect from 'immview-react-connect';
import ScheduleDomain from '../../../services/ScheduleDomain';

import './schedule_daily_widget.scss';

function groupByHour(items, offsetStart) {
  const now = moment.utc(offsetStart);
  const hours = Range(0, 24);
  const itemsByHour = hours.map(
    hour => (
      items.filter(
        item => (
          hour < 5 ?
          (moment.utc(item.get('start_at')).isBefore(now.clone().hour(hour + 1)
            .startOf('hour').add(1, 'day')) &&
          moment.utc(item.get('stop_at')).isAfter(now.clone().hour(hour)
            .startOf('hour').add(1, 'day')))
          :
          (moment.utc(item.get('start_at')).isBefore(now.clone().hour(hour + 1)
            .startOf('hour')) &&
          moment.utc(item.get('stop_at')).isAfter(now.clone().hour(hour)
            .startOf('hour')))
        )
      )
    )
  );
  return itemsByHour;
}

const ScheduleDaily = React.createClass({
  propTypes: {
    firstHour: React.PropTypes.number, // FIXME: ??
    currentBroadcastChannel: React.PropTypes.object,
    offsetStart: React.PropTypes.number,
    onOffsetStartChange: React.PropTypes.func,
    activeItem: React.PropTypes.object,
    onActiveItemChange: React.PropTypes.func,
    // connector
    items: React.PropTypes.object,
  },

  contextTypes: {
    data: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      firstHour: 5,
      offsetStart: Date.now(),
      onOffsetStartChange: () => null,
      activeItem: null,
      onActiveItemChange: () => null,
    };
  },

  render() {
    const {
      firstHour,
      offsetStart,
      onActiveItemChange,
      activeItem,
      items,
    } = this.props;

    const hours = (firstHour > 0)
    ? Range(firstHour, 24)
      .concat(Range(0, firstHour))
    : Range(0, 24);

    const itemsByHour = groupByHour(items, offsetStart).toOrderedMap();

    return (
      <table className="ScheduleDailyWidget table table-banded table-hover ">
        <tbody>
          {hours.map((hour) => (
              <CalendarRow
                key={hour}
                hour={hour}
                firstHour={firstHour}
                items={itemsByHour.get(hour, List())}
                now={moment.utc(offsetStart)}
                onActiveItemChange={onActiveItemChange}
                activeItem={activeItem}
              />
            ))}
        </tbody>
      </table>
    );
  },
});

export default connect(
  ScheduleDaily,
  ScheduleDomain,
  (data, props) => {
    const range = Map({
      from: moment.utc(props.offsetStart).startOf('day').add(5, 'hours')
        .subtract(1, 'day').toISOString(),
      to: moment.utc(props.offsetStart).endOf('day').add(5, 'hours').add(1, 'day').toISOString(),
    });
    if (!data.getIn(['ranges', range])) {
      ScheduleDomain.fetch(range.get('from'), range.get('to'));
    }
    const items = data
      .get('all', OrderedMap())
      .toList()
      .filter(
        item => (
          item.get('stop_at') > range.get('from') &&
          item.get('start_at') < range.get('to')
        )
      );
    return {
      items,
    };
  }
);
