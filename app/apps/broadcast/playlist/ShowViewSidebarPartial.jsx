import React, {
  PropTypes,
} from 'react';
import moment from 'moment';
import Translate from 'react-translate-component';
import Slider from 'rc-slider';
import { padStart } from 'lodash';
import 'rc-slider/assets/index.css';

import { dayStartHoursOffset } from './playlistConfig';
import './ShowViewSidebarPartial.scss';

function getHourLabel(hour) {
  return `${padStart(hour.toString(), 2, '0')}:00`;
}

// hours in range-slider is reversed to display hours
// in ascending order, so
// 24 represents first hour (determined by dayStartHoursOffset)
// and 0 represents last hour
const timeRangeMarks = {
  24: getHourLabel(dayStartHoursOffset),
  21: getHourLabel((dayStartHoursOffset + 3) % 24),
  18: getHourLabel((dayStartHoursOffset + 6) % 24),
  15: getHourLabel((dayStartHoursOffset + 9) % 24),
  12: getHourLabel((dayStartHoursOffset + 12) % 24),
  9: getHourLabel((dayStartHoursOffset + 15) % 24),
  6: getHourLabel((dayStartHoursOffset + 18) % 24),
  3: getHourLabel((dayStartHoursOffset + 21) % 24),
  0: getHourLabel((dayStartHoursOffset + 24) % 24),
};

const BroadcastPlaylistSidebar = React.createClass({
  propTypes: {
    offsetStart: PropTypes.number.isRequired,
    onOffsetStartChange: PropTypes.func.isRequired,
    onTimeRangeChange: PropTypes.func.isRequired,
    startHour: PropTypes.number.isRequired,
    endHour: PropTypes.number.isRequired,
  },

  getTimeSliderValue() {
    const startHour = 24 - this.props.startHour;
    const endHour = 24 - this.props.endHour;

    return [endHour, startHour];
  },

  triggerOffsetChange(command, quantity, unit) {
    const { onOffsetStartChange } = this.props;
    const offset = moment(this.props.offsetStart)[command](quantity, unit).valueOf();
    onOffsetStartChange && onOffsetStartChange(offset);
  },

  handleTimeRangeChange([endHour, startHour]) {
    this.props.onTimeRangeChange(24 - startHour, 24 - endHour);
  },

  handleDayPreviousClick(e) {
    e.preventDefault();
    this.triggerOffsetChange('subtract', 1, 'day');
  },

  handleDayNextClick(e) {
    e.preventDefault();
    this.triggerOffsetChange('add', 1, 'day');
  },

  handleWeekPreviousClick(e) {
    e.preventDefault();
    this.triggerOffsetChange('subtract', 1, 'week');
  },

  handleWeekNextClick(e) {
    e.preventDefault();
    this.triggerOffsetChange('add', 1, 'week');
  },

  handleMonthPreviousClick(e) {
    e.preventDefault();
    this.triggerOffsetChange('subtract', 1, 'month');
  },

  handleMonthNextClick(e) {
    e.preventDefault();
    this.triggerOffsetChange('add', 1, 'month');
  },

  handleYearPreviousClick(e) {
    e.preventDefault();
    this.triggerOffsetChange('subtract', 1, 'year');
  },

  handleYearNextClick(e) {
    e.preventDefault();
    this.triggerOffsetChange('add', 1, 'year');
  },

  renderOption({ value, label, onPrevClick, onNextClick }) {
    return (
      <li>
        <div className="btn-group margin-bottom-lg">
          <button
            type="button"
            className="btn btn-default-light"
            onClick={onPrevClick}
          >
            <i className="mdi mdi-chevron-left" />
          </button>

          <div className="BroadcastPlaylistSidebar-button btn btn-default-light">
            {label ? <Translate content={label} count={parseInt(value, 10)} /> : value}
          </div>

          <button
            type="button"
            className="btn btn-default-light"
            onClick={onNextClick}
          >
            <i className="mdi mdi-chevron-right" />
          </button>
        </div>
      </li>
    );
  },

  renderTimeRange() {
    return (
      <div className="BroadcastPlaylistSidebar-timeRange">
        <Translate
          component="h5"
          className="BroadcastPlaylistSidebar-timeRange-label"
          content="apps.broadcast.playlist.filter_hours"
        />
        <div className="BroadcastPlaylistSidebar-timeRange-sliderWrapper">
          <Slider.Range
            vertical
            step={1}
            min={0}
            max={24}
            marks={timeRangeMarks}
            value={this.getTimeSliderValue()}
            onChange={this.handleTimeRangeChange}
          />
        </div>
        <div className="BroadcastPlaylistSidebar-timeRange-display input-group">
          <span className="form-control">
            {getHourLabel((dayStartHoursOffset + this.props.startHour) % 24)}
          </span>
          <span className="input-group-addon">&#8212;</span>
          <span className="form-control">
            {getHourLabel((dayStartHoursOffset + this.props.endHour) % 24)}
          </span>
        </div>
      </div>
    );
  },

  render() {
    return (
      <div className="BroadcastPlaylistSidebar">
        <div className="text-center">
          <ul className="BroadcastPlaylistSidebar--List">
            {this.renderOption({
              value: moment.utc(this.props.offsetStart).clone().startOf('day').format('w'),
              label: 'apps.broadcast.playlist.week',
              onPrevClick: this.handleWeekPreviousClick,
              onNextClick: this.handleWeekNextClick,
            })}
            {this.renderOption({
              value: moment.utc(this.props.offsetStart).clone().startOf('day').format('YYYY'),
              onPrevClick: this.handleYearPreviousClick,
              onNextClick: this.handleYearNextClick,
            })}
            {this.renderOption({
              value: moment.utc(this.props.offsetStart).clone().startOf('day').format('MMMM'),
              onPrevClick: this.handleMonthPreviousClick,
              onNextClick: this.handleMonthNextClick,
            })}
            {this.renderOption({
              value: moment.utc(this.props.offsetStart).clone().startOf('day').format('D (ddd)'),
              onPrevClick: this.handleDayPreviousClick,
              onNextClick: this.handleDayNextClick,
            })}
          </ul>
          {this.renderTimeRange()}
        </div>
      </div>
    );
  },
});

export default BroadcastPlaylistSidebar;
