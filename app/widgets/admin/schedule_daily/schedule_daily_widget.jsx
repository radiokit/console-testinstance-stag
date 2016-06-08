import React from 'react';
import { Map, OrderedMap, List } from 'immutable';
import {
  range,
} from 'lodash';
import moment from 'moment';
import { shouldComponentUpdate } from '../../../helpers/immutable_component';
import CalendarRow from './schedule_daily_calendar_row.jsx';
import connect from 'immview-react-connect';
import ScheduleDomain from '../../../services/ScheduleDomain';

import './schedule_daily_widget.scss';

const milisecondsInHour = 1000 * 60 * 60;

function groupByHour(items, offsetStart) {
  const result = range(0, 24).map(() => []);

  items
    .forEach(
      item => {
        const itemStart = new Date(item.get('cue_in_at')).valueOf();
        const itemStop = new Date(item.get('cue_out_at')).valueOf();

        for (let iHour = 0; iHour < 24; iHour++) {
          const hourOffset = offsetStart + iHour * milisecondsInHour;
          if (
            itemStop > hourOffset &&
            itemStart < hourOffset + milisecondsInHour
          ) {
            result[iHour].push(item);
          }
        }
      }
    );
  const immResult = result.map(hour => List(hour));
  return immResult;
}

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
    } = this.props;

    const itemsByHour = groupByHour(items, actualOffsetStart);

    return (
      <table className="ScheduleDailyWidget table table-banded table-hover ">
        <tbody>
          {range(0, 24).map((_, hour) => (
              <CalendarRow
                key={hour}
                offsetStart={actualOffsetStart + hour * milisecondsInHour}
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
  (data, props) => {
    const {
      offsetStart = 0,
      currentBroadcastChannel = Map(),
      firstHour = 5,
    } = props;

    const from = moment(offsetStart)
      .startOf('day')
      .add(firstHour, 'hours');
    const to = moment(offsetStart)
      .endOf('day')
      .add(firstHour, 'hours');

    ScheduleDomain.fetch(from.toISOString(), to.toISOString(), currentBroadcastChannel.get('id'));

    const items = data
      .get('all', OrderedMap())
      .toArray()
      .filter(
        item => (
          new Date(item.get('cue_out_at')).valueOf() > from.valueOf() &&
          new Date(item.get('cue_in_at')).valueOf() < to.valueOf() &&
          item.getIn(['references', 'broadcast_channel_id']) === currentBroadcastChannel.get('id')
        )
      );
    return {
      items,
      actualOffsetStart: from.valueOf(),
    };
  }
);
