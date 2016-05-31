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

const milisecondsInHour = 1000 * 60 * 60;
const milisecondsInDay = milisecondsInHour * 24;

function groupByDayAndHour(items, offsetStart) {
  const result = range(0, 7).map(
    () => range(0, 24).map(
      () => []
    )
  );

  items
    .sort(
      (a, b) => new Date(a.get('start_at')).valueOf() - new Date(b.get('start_at')).valueOf()
    )
    .forEach(
      item => {
        const itemStart = new Date(item.get('start_at')).valueOf();
        const itemStop = new Date(item.get('stop_at')).valueOf();

        result.forEach((day, iDay) => day.forEach((hour, iHour) => {
          const hourOffset = offsetStart + iDay * milisecondsInDay + iHour * milisecondsInHour;
          if (
            itemStop > hourOffset &&
            itemStart < hourOffset + milisecondsInHour
          ) {
            hour.push(item);
          }
        }));
      }
    );

  return result.map(day => day.map(hour => List(hour)));
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
    actualOffsetStart: React.PropTypes.number,
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

  getDaysNames() {
    const day = moment(this.props.actualOffsetStart).subtract(1, 'days');
    return range(0, 7).map(() => day.add(1, 'days').format('L'));
  },

  render() {
    const {
      firstHour,
      actualOffsetStart,
      items,
    } = this.props;

    const hours = (firstHour > 0)
      ? Range(firstHour, 24)
        .concat(Range(0, firstHour))
      : Range(0, 24);

    const days = this.getDaysNames();
    const groupedItems = groupByDayAndHour(items, actualOffsetStart);

    return (
      <div className="ScheduleWeeklyWidget">
        <table className="ScheduleWeeklyWidget-Table table table-banded table-hover">
          <tbody>
            <tr>
              <th>
                <Translate component="span" content="schedule_weekly.hour" />
              </th>
              {
                days.map(day => (
                  <th>{day}</th>
                ))
              }
            </tr>
              {hours.map(hour => (
                <tr>
                  <td>{sprintf('%02s:00', hour)}</td>
                  {days.map((_, day) => (
                    <td className="ScheduleWeeklyWidget-Table-items">
                      <ShortenedRow
                        className="ScheduleWeeklyWidget-Table-item-ellipsed"
                        key={`${day}.${hour}`}
                        items={groupedItems[day][hour] || List()}
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
    const {
      offsetStart = 0,
      currentBroadcastChannel = Map(),
    } = props;

    const from = moment(offsetStart)
      .startOf('week')
      .add(5, 'hours');
    const to = moment(offsetStart)
      .endOf('week')
      .add(5, 'hours');

    ScheduleDomain.fetch(from.toISOString(), to.toISOString(), currentBroadcastChannel.get('id'));

    const items = data
      .get('all', OrderedMap())
      .toArray()
      .filter(
        item => (
          new Date(item.get('stop_at')).valueOf() > from.valueOf() &&
          new Date(item.get('start_at')).valueOf() < to.valueOf() &&
          item.getIn(['references', 'broadcast_channel_id']) === currentBroadcastChannel.get('id')
        )
      );
    return {
      items,
      actualOffsetStart: from.valueOf(),
    };
  }
);
