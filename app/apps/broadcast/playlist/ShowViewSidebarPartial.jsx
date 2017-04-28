import React, {
  PropTypes,
} from 'react';
import moment from 'moment';
import Translate from 'react-translate-component';

import './ShowViewSidebarPartial.scss';

const BroadcastPlaylistSidebar = React.createClass({
  propTypes: {
    offsetStart: PropTypes.number.isRequired,
    onOffsetStartChange: PropTypes.func.isRequired,
  },

  triggerOffsetChange(command, quantity, unit) {
    const { onOffsetStartChange } = this.props;
    const offset = moment(this.props.offsetStart)[command](quantity, unit).valueOf();
    onOffsetStartChange && onOffsetStartChange(offset);
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
              value: moment.utc(this.props.offsetStart).clone().startOf('day').format('D (ddd)'),
              onPrevClick: this.handleDayPreviousClick,
              onNextClick: this.handleDayNextClick,
            })}
            {this.renderOption({
              value: moment.utc(this.props.offsetStart).clone().startOf('day').format('MMMM'),
              onPrevClick: this.handleMonthPreviousClick,
              onNextClick: this.handleMonthNextClick,
            })}
            {this.renderOption({
              value: moment.utc(this.props.offsetStart).clone().startOf('day').format('YYYY'),
              onPrevClick: this.handleYearPreviousClick,
              onNextClick: this.handleYearNextClick,
            })}
          </ul>
        </div>
      </div>
    );
  },
});

export default BroadcastPlaylistSidebar;
