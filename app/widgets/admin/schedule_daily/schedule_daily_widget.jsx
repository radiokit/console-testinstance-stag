import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import moment from 'moment';
import {
  range,
} from 'lodash';
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

  getInitialState() {
    return {
      expansionState: {},
    };
  },

  onChangeExpansionState(hour, value) {
    this.setState({ expansionState: { ...this.state.expansionState, [hour]: value } });
  },

  onNowChange(newNow) {
    this.setState({ now: newNow });
  },

  getItems() {
    return this.props.items.map(entry => (
      Immutable.Map()
        .set('id', entry.get('id'))
        .set('start_at', moment.utc(entry.get('start_at')))
        .set('stop_at', moment.utc(entry.get('stop_at')))
    ));
  },

  render() {
    const hours = (this.props.firstHour > 0)
    ? new Immutable
      .Range(this.props.firstHour, 24)
      .concat(new Immutable.Range(0, this.props.firstHour))
    : new Immutable.Range(0, 24);

    return (
      <table className="ScheduleDailyWidget table table-banded table-hover ">
        <tbody>
          {hours.map((hour) => (
              <CalendarRow
                key={hour}
                hour={hour}
                firstHour={this.props.firstHour}
                items={this.getItems()}
                now={moment.utc(this.props.offsetStart)}
                onChangeExpansionState={this.onChangeExpansionState}
                expanded={this.state.expansionState[hour]}
                onActiveItemChange={this.props.onActiveItemChange}
                activeItem={this.props.activeItem}
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
    const ranger = Immutable.Map({
      from: moment.utc(props.offsetStart).startOf('day').add(5, 'hours').toISOString(),
      to: moment.utc(props.offsetStart).endOf('day').add(5, 'hours').toISOString(),
    });
    if (!data.getIn(['ranges', ranger])) {
      ScheduleDomain.fetch(ranger.get('from'), ranger.get('to'));
    }
    const items = data
      .get('all', Immutable.OrderedMap())
      .toList()
      .filter(
        item => (
          item.get('stop_at') > ranger.get('from') &&
          item.get('start_at') < ranger.get('to')
        )
      );
    return {
      items,
    };
  }
);
