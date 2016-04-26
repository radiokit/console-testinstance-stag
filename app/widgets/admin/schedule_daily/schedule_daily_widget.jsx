import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import moment from 'moment';
import {
  range,
} from 'lodash';
import CalendarRow from './schedule_daily_calendar_row.jsx';

import './schedule_daily_widget.scss';

const hourType = PropTypes.oneOf(range(0, 24));

const ScheduleDaily = React.createClass({
  propTypes: {
    firstHour: React.PropTypes.number, // FIXME: ??
    currentBroadcastChannel: React.PropTypes.object,
    offsetStart: React.PropTypes.number,
    onOffsetStartChange: React.PropTypes.func,
    activeItem: React.PropTypes.object,
    onActiveItemChange: React.PropTypes.func,
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
      availableFiles: new Immutable.Seq().toIndexedSeq(),
    };
  },

  componentDidMount() {
    this.fetchPlumberFiles();
  },

  onChangeExpansionState(hour, value) {
    this.setState({ expansionState: { ...this.state.expansionState, [hour]: value } });
  },

  onNowChange(newNow) {
    this.setState({ now: newNow });
  },

  getItems(data) {
    return data.map(entry => (
      Immutable.Map()
        .set('id', entry.get('id'))
        .set('start_at', moment.utc(entry.get('start_at')))
        .set('stop_at', moment.utc(entry.get('stop_at')))
    ));
  },

  afterFormSubmit() {
    this.fetchPlumberFiles();
    this.onChangeActiveItem(null);
  },

  fetchPlumberFiles() {
    this.context.data
      .query('plumber', 'Media.Input.File.Http')
      .select('id', 'start_at', 'stop_at')
      .on('error', () => {
        this.setState({
          loadingError: true,
        });
      }).on('fetch', (_event, _query, data) => {
        if (data.count() !== 0) {
          this.setState({
            loadedFiles: true,
            availableFiles: this.getItems(data).toList(),
          });
        } else {
          this.setState({
            loadedListOfFiles: true,
            availableFiles: new Immutable.Seq().toIndexedSeq(),
          });
        }
      }).fetch();
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
                now={moment.utc(this.props.offsetStart)}
                items={this.state.availableFiles}
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

export default ScheduleDaily;
