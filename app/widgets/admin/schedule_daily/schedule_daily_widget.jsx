import React from 'react';
import {
  Map,
  OrderedMap,
  List,
} from 'immutable';
import {
  range,
} from 'lodash';
import moment from 'moment';
import { shouldComponentUpdate } from '../../../helpers/immutable_component';
import CalendarRow from './schedule_daily_calendar_row.jsx';
import connect from 'immview-react-connect';
import ScheduleDomain from '../../../services/ScheduleDomain';

import './schedule_daily_widget.scss';

const MILLISECONDS_PER_MINUTE = 1000 * 60;
const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * 60;
const MILLISECONDS_PER_DAY = MILLISECONDS_PER_HOUR * 24;

const DAY_START_HOURS_OFFSET = 5;

const ScheduleDaily = React.createClass({
  propTypes: {
    firstHour: React.PropTypes.number, // used in connector
    currentBroadcastChannel: React.PropTypes.object,
    offsetStart: React.PropTypes.number,
    onOffsetStartChange: React.PropTypes.func,
    activeItem: React.PropTypes.object,
    onActiveItemChange: React.PropTypes.func,
    // connector
    items: React.PropTypes.array,
    actualOffsetStart: React.PropTypes.number,
    timezone: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      offsetStart: Date.now(),
      onOffsetStartChange: () => null,
      activeItem: null,
      onActiveItemChange: () => null,
    };
  },

  shouldComponentUpdate,

  render() {
    const {
      onActiveItemChange,
      activeItem,
      items,
      actualOffsetStart,
      timezone,
    } = this.props;

    const itemsByHour = groupByHour(items, actualOffsetStart);

    return (
      <table className="ScheduleDailyWidget table table-banded table-hover">
        <tbody>
          {range(0, 24).map((_, hour) => (
              <CalendarRow
                key={hour}
                offsetStart={actualOffsetStart + hour * MILLISECONDS_PER_HOUR}
                timezone={timezone}
                items={itemsByHour[hour]}
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
  (ScheduleDomainState, props) => {
    const {
      offsetStart = 0,
      currentBroadcastChannel = Map(),
    } = props;

    const timezone = currentBroadcastChannel.get('timezone');

    const from = calcDayStart(
      offsetStart,
      timezone,
      DAY_START_HOURS_OFFSET
    );
    const to = from + MILLISECONDS_PER_DAY;

    const fromISO = new Date(from).toISOString();
    const toISO = new Date(to).toISOString();

    ensureSchedule(fromISO, toISO, currentBroadcastChannel.get('id'));

    const items = ScheduleDomainState
      .getIn(
      [
        'ranges',
        Map({
          from: fromISO,
          to: toISO,
          broadcastChannelId: currentBroadcastChannel.get('id'),
        }),
      ],
        OrderedMap()
      )
      .toArray();

    return {
      items,
      actualOffsetStart: from,
      timezone,
    };
  }
);

/**
 * @param {string} from
 * @param {string} to
 * @param {string} broadcastChannelId
 */
function ensureSchedule(from, to, broadcastChannelId) {
  ScheduleDomain.fetch(
    from,
    to,
    broadcastChannelId,
    { maxAge: MILLISECONDS_PER_MINUTE * 10 }
  );
}

/**
 * Returns a timestamp of a start of a day.
 * Takes into consideration timezone and time offset expressed as amount of hours.
 * @param {number} timestamp
 * @param {string} timezone
 * @param {number} dayStartHoursOffset
 * @returns {number}
 */
function calcDayStart(timestamp, timezone, dayStartHoursOffset) {
  return moment
    .tz(timestamp, timezone)
    .subtract(dayStartHoursOffset, 'hours')
    .startOf('day')
    .add(dayStartHoursOffset, 'hours')
    .valueOf()
  ;
}

/**
 * @param {Iterable} items
 * @param {number} offsetStart
 * @returns {Array.<Iterable>}
 */
function groupByHour(items, offsetStart) {
  return items
    .reduce(
      (partialResult, item) => {
        const itemStart = new Date(item.get('cue_in_at')).valueOf();
        const itemStop = new Date(item.get('cue_out_at')).valueOf();

        for (let iHour = 0; iHour < 24; iHour++) {
          const hourOffset = offsetStart + iHour * MILLISECONDS_PER_HOUR;
          if (
            itemStop > hourOffset &&
            itemStart < hourOffset + MILLISECONDS_PER_HOUR
          ) {
            partialResult[iHour].push(item);
          }
        }

        return partialResult;
      },
      range(0, 24).map(() => [])
    )
    .map(hour => List(hour))
    ;
}
