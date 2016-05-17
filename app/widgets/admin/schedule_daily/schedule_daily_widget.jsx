import React from 'react';
import Immutable from 'immutable';
import moment from 'moment';
import CalendarRow from './schedule_daily_calendar_row.jsx';
import connect from 'immview-react-connect';
import ScheduleDomain from '../../../services/ScheduleDomain';

import './schedule_daily_widget.scss';

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

  getItems(hour) {
    const { items, offsetStart, firstHour } = this.props;
    let hourStart = moment.utc(offsetStart).hour(hour).startOf('hour');
    if (hour < firstHour) {
      hourStart = hourStart.add(1, 'day');
    }
    const hourStop = hourStart.clone().add(1, 'hour');

    return items.filter(item => (
      moment.utc(item.get('start_at')).isBefore(hourStop) &&
      moment.utc(item.get('stop_at')).isAfter(hourStart)
    )).map(item => (
      Immutable.Map()
        .set('id', item.get('id'))
        .set('name', item.get('name'))
        .set('start_at', moment.utc(item.get('start_at')))
        .set('stop_at', moment.utc(item.get('stop_at')))
        .set('file', item.get('file'))
    )).toList();
  },

  render() {
    const {
      firstHour,
      offsetStart,
      onActiveItemChange,
      activeItem,
    } = this.props;

    const hours = (firstHour > 0)
    ? new Immutable
      .Range(firstHour, 24)
      .concat(new Immutable.Range(0, firstHour))
    : new Immutable.Range(0, 24);

    return (
      <table className="ScheduleDailyWidget table table-banded table-hover ">
        <tbody>
          {hours.map((hour) => (
              <CalendarRow
                key={hour}
                hour={hour}
                firstHour={firstHour}
                items={this.getItems(hour)}
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
    const range = Immutable.Map({
      from: moment.utc(props.offsetStart).startOf('day').add(5, 'hours')
        .subtract(1, 'day').toISOString(),
      to: moment.utc(props.offsetStart).endOf('day').add(5, 'hours').add(1, 'day').toISOString(),
    });
    if (!data.getIn(['ranges', range])) {
      ScheduleDomain.fetch(range.get('from'), range.get('to'));
    }
    const items = data
      .get('all', Immutable.OrderedMap())
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
