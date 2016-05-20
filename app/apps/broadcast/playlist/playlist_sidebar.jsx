import React from 'react';
import moment from 'moment';

const PlaylistSidebar = React.createClass({
  propTypes: {
    currentBroadcastChannel: React.PropTypes.object.isRequired,
    offsetStart: React.PropTypes.number.isRequired,
    onOffsetStartChange: React.PropTypes.func,
    onZoomChange: React.PropTypes.func,
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

  triggerOffsetChange(op, quantity, unit) {
    const { onOffsetStartChange } = this.props;
    const offset = moment(this.props.offsetStart)[op](quantity, unit).valueOf();
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

  // TODO add translation in week
  render() {
    return (
      <div className="text-center">
        <div className="btn-group margin-bottom-lg" role="group">
          <button
            type="button"
            className="btn btn-default-light"
            onClick={this.handleDayPreviousClick}
          >
            <i className="mdi mdi-chevron-left" />
          </button>

          <div className="btn btn-default-light">
            {moment.utc(this.props.offsetStart).clone().startOf('day').format('D (ddd)')}
          </div>

          <button
            type="button"
            className="btn btn-default-light"
            onClick={this.handleDayNextClick}
          >
           <i className="mdi mdi-chevron-right" />
          </button>
        </div>

        <div className="btn-group margin-bottom-lg">
          <button
            type="button"
            className="btn btn-default-light"
            onClick={this.handleWeekPreviousClick}
          >
            <i className="mdi mdi-chevron-left" />
          </button>

          <div className="btn btn-default-light">
            {moment.utc(this.props.offsetStart).clone().startOf('day').format('w')}
          </div>

          <button
            type="button"
            className="btn btn-default-light"
            onClick={this.handleWeekNextClick}
          >
            <i className="mdi mdi-chevron-right" />
          </button>
        </div>

        <div className="btn-group margin-bottom-lg">
          <button
            type="button"
            className="btn btn-default-light"
            onClick={this.handleMonthPreviousClick}
          >
            <i className="mdi mdi-chevron-left" />
          </button>

          <div className="btn btn-default-light">
            {moment.utc(this.props.offsetStart).clone().startOf('day').format('MMMM')}
          </div>

          <button
            type="button"
            className="btn btn-default-light"
            onClick={this.handleMonthNextClick}
          >
            <i className="mdi mdi-chevron-right" />
          </button>
        </div>

        <div className="btn-group margin-bottom-lg">
          <button
            type="button"
            className="btn btn-default-light"
            onClick={this.handleYearPreviousClick}
          >
            <i className="mdi mdi-chevron-left" />
          </button>

          <div className="btn btn-default-light">
            {moment.utc(this.props.offsetStart).clone().startOf('day').format('YYYY')}
          </div>

          <button
            type="button"
            className="btn btn-default-light"
            onClick={this.handleYearNextClick}
          >
            <i className="mdi mdi-chevron-right" />
          </button>
        </div>
      </div>
    );
  },
});

export default PlaylistSidebar;
