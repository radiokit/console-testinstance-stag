import React from 'react';
import moment from 'moment';
import { Range, Map, OrderedMap, List } from 'immutable';
import connect from 'immview-react-connect';
import ScheduleDomain from '../../../services/ScheduleDomain';
import { range } from 'lodash';
import sprintf from 'tiny-sprintf';
import ShortenedRow from '../schedule_daily/schedule_daily_shortened_row.jsx';
import Translate from 'react-translate-component';
import Counterpart from 'counterpart';

import translationPL from './schedule_weekly_pl.js';
import translationEN from './schedule_weekly_en.js';
Counterpart.registerTranslations('pl', { schedule_weekly: translationPL });
Counterpart.registerTranslations('en', { schedule_weekly: translationEN });

import './schedule_weekly_widget.scss';

function groupByDateAndHour(items, days) {
  const hours = Range(0, 24);
  const groupedItems = days.map(
    day => (
      hours.map(
        hour => (
          items.filter(
            item => (
              hour < 5 ?
              (moment.utc(item.get('start_at')).isBefore(day.clone().hour(hour + 1)
                .startOf('hour').add(1, 'day')) &&
              moment.utc(item.get('stop_at')).isAfter(day.clone().hour(hour)
                .startOf('hour').add(1, 'day')))
              :
              (moment.utc(item.get('start_at')).isBefore(day.clone().hour(hour + 1)
                .startOf('hour')) &&
              moment.utc(item.get('stop_at')).isAfter(day.clone().hour(hour)
                .startOf('hour')))
            )
          )
        )
      )
    )
  );

  return groupedItems;
}

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
    const { firstHour, offsetStart, items } = this.props;
    const hours = (firstHour > 0)
    ? Range(firstHour, 24)
      .concat(Range(0, firstHour))
    : Range(0, 24);

    const days = this.getDays(moment.utc(offsetStart).startOf('week'));
    const groupedItems = groupByDateAndHour(items, days);

    return (
      <div>
        <table className="ScheduleWeeklyWidget table table-banded table-hover">
          <tbody>
            <tr>
              <th>
                <Translate component="span" content="schedule_weekly.hour" />
              </th>
              {days.map(day => (
                <th>{day.format('L')}</th>
              ))}
            </tr>
              {hours.map(hour => (
                <tr>
                  <td>{sprintf('%02s:00', hour)}</td>
                  {days.map(day => (
                    <td className="ScheduleWeeklyWidget-Table-items">
                      <ShortenedRow
                        className="ScheduleWeeklyWidget-Table-item-ellipsed"
                        key={day + hour}
                        items={groupedItems[day.weekday()].get(hour, List())}
                      />
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  },
});

export default connect(
  ScheduleWeekly,
  ScheduleDomain,
  (data, props) => {
    const timeRange = Map({
      from: moment.utc(props.offsetStart).startOf('week').add(5, 'hours')
        .subtract(1, 'day').toISOString(),
      to: moment.utc(props.offsetStart).endOf('week').add(5, 'hours')
        .add(1, 'day').toISOString(),
    });
    if (!data.getIn(['ranges', timeRange])) {
      ScheduleDomain.fetch(timeRange.get('from'), timeRange.get('to'));
    }
    const items = data
      .get('all', OrderedMap())
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
