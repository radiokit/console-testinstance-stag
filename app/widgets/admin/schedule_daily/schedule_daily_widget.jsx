import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import moment from 'moment';
import {
  range,
} from 'lodash';
import ScheduleDaySelector from './schedule_day_selector_widget.jsx';
import ScheduleDayCrudButtons from './schedule_day_crud_buttons.jsx';
import CalendarRow from './schedule_daily_calendar_row.jsx';

import './schedule_daily_widget.scss';

const hourType = PropTypes.oneOf(range(0, 24));

const ScheduleDaily = React.createClass({
  propTypes: {
    currentBroadcastChannel: React.PropTypes.object,
    offsetStart: React.PropTypes.number,
    onOffsetStartChange: React.PropTypes.func,
    activeItem: React.PropTypes.object,
    onActiveItemChange: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
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
  
  componentDidMount() {
    return;
    this.fetchPlumberFiles();
  },

  afterFormSubmit() {
    this.fetchPlumberFiles();
    this.onChangeActiveItem(null);
  },

  getItems(data) {
    return data.map(entry => (
      Immutable.Map()
        .set('id', entry.get('id'))
        .set('start_at', moment.utc(entry.get('start_at')))
        .set('stop_at', moment.utc(entry.get('stop_at')))
    ));
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

  onChangeExpansionState(hour, value) {
    this.setState({ expansionState: { ...this.state.expansionState, [hour]: value } });
  },

  onNowChange(newNow) {
    this.setState({ now: newNow });
  },

  render() {
    return null;

    const hours = (this.props.firstHour > 0)
    ? new Immutable
      .Range(this.props.firstHour, 24)
      .concat(new Immutable.Range(0, this.props.firstHour))
    : new Immutable.Range(0, 24);

    return (
      <div>
        <ScheduleDayCrudButtons
          availablePlumberFiles={this.props.availablePlumberFiles}
          afterFormSubmit={this.props.afterFormSubmit}
          activeItem={this.props.activeItem}
        />
        <ScheduleDaySelector now={this.props.now} onChange={this.props.onNowChange} />
        <table className="ScheduleDailyWidget table table-banded table-hover ">
          <tbody>
            {hours.map((hour) => (
                <CalendarRow
                  key={hour}
                  hour={hour}
                  firstHour={this.props.firstHour}
                  now={this.props.now}
                  items={this.props.items}
                  onChangeExpansionState={this.onChangeExpansionState}
                  expanded={this.state.expansionState[hour]}
                  onChangeActiveItem={this.props.onChangeActiveItem}
                  activeItem={this.props.activeItem}
                />
              ))}
          </tbody>
        </table>
      </div>
    );
  },
});

export default ScheduleDaily;
