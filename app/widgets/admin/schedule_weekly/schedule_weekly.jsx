import React from 'react';
import moment from 'moment';
import Immutable from 'immutable';
import connect from 'immview-react-connect';
import ScheduleDomain from '../../../services/ScheduleDomain';
import { range } from 'lodash';
import sprintf from 'tiny-sprintf';

const ScheduleWeekly = React.createClass({
  propTypes: {
    firstHour: React.PropTypes.number,
    currentBroadcastChannel: React.PropTypes.object,
    offsetStart: React.PropTypes.number,
    onOffsetStartChange: React.PropTypes.func,
    activeItem: React.PropTypes.object,
    onActiveItemChange: React.PropTypes.func,
    // connector
    items: React.PropTypes.object,
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

  getDays(weekStart) {
    const daysRange = range(0, 7);
    return daysRange.map(day => (
      moment.utc(weekStart).add(day, 'days')
    ));
  },

  render() {
    const { firstHour, offsetStart } = this.props;
    const hours = (firstHour > 0)
    ? new Immutable
      .Range(firstHour, 24)
      .concat(new Immutable.Range(0, firstHour))
    : new Immutable.Range(0, 24);

    const days = this.getDays(moment.utc(offsetStart).startOf('week'));

    return (
      <table className="ScheduleWeeklyWidget table table-banded table-hover">
        <tbody>
          <tr>
            {days.map(day => (
              <th>{day.format('L')}</th>
            ))}
          </tr>
        </tbody>
      </table>
    );
  },
});

export default connect(
  ScheduleWeekly,
  ScheduleDomain,
  (data, props) => {
    const timeRange = Immutable.Map({
      from: moment.utc(props.offsetStart).startOf('week').add(5, 'hours')
        .subtract(1, 'day').toISOString(),
      to: moment.utc(props.offsetStart).endOf('week').add(5, 'hours')
        .add(1, 'day').toISOString(),
    });
    if (!data.getIn(['ranges', timeRange])) {
      ScheduleDomain.fetch(timeRange.get('from'), timeRange.get('to'));
    }
    const items = data
      .get('all', Immutable.OrderedMap())
      .toList()
      .filter(
        item => (
          item.get('stop_at') > timeRange.get('from') &&
          item.get('start_at') < timeRange.get('to')
        )
      );
    return {
      items,
    };
  }
);
