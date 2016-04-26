import React from 'react';
import moment from 'moment';
import clone from 'clone';

const PlaylistSidebar = React.createClass({
  propTypes: {
    currentBroadcastChannel: React.PropTypes.object.isRequired,
    offsetStart: React.PropTypes.number.isRequired,
    onOffsetStartChange: React.PropTypes.func,
    onZoomChange: React.PropTypes.func,
    activeItem: React.PropTypes.object.isRequired,
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

  onDayPreviousClick(e) {
    e.preventDefault();
    this.props.onOffsetStartChange(
      parseInt(
        moment
        .utc(this.props.offsetStart)
        .clone()
        .subtract(1, 'day')
        .format('x'),
        10
      )
    );
  },

  onDayNextClick(e) {
    e.preventDefault();
    this.props.onOffsetStartChange(
      parseInt(
        moment
        .utc(this.props.offsetStart)
        .clone()
        .add(1, 'day')
        .format('x'),
        10
      )
    );
  },

  onWeekPreviousClick(e) {
    e.preventDefault();
    this.props.onOffsetStartChange(
      parseInt(
        moment
        .utc(this.props.offsetStart)
        .clone()
        .subtract(1, 'week')
        .format('x'),
        10
      )
    );
  },

  onWeekNextClick(e) {
    e.preventDefault();
    this.props.onOffsetStartChange(
      parseInt(
        moment
        .utc(this.props.offsetStart)
        .clone()
        .add(1, 'week')
        .format('x'),
        10
      )
    );
  },

  onMonthPreviousClick(e) {
    e.preventDefault();
    this.props.onOffsetStartChange(
      parseInt(
        moment
        .utc(this.props.offsetStart)
        .clone()
        .subtract(1, 'month')
        .format('x'),
        10
      )
    );
  },

  onMonthNextClick(e) {
    e.preventDefault();
    this.props.onOffsetStartChange(
      parseInt(
        moment
        .utc(this.props.offsetStart)
        .clone()
        .add(1, 'month')
        .format('x'),
        10
      )
    );
  },

  onYearPreviousClick(e) {
    e.preventDefault();
    this.props.onOffsetStartChange(
      parseInt(
        moment
        .utc(this.props.offsetStart)
        .clone()
        .subtract(1, 'year')
        .format('x'),
        10
      )
    );
  },

  onYearNextClick(e) {
    e.preventDefault();
    this.props.onOffsetStartChange(
      parseInt(
        moment
        .utc(this.props.offsetStart)
        .clone()
        .add(1, 'year')
        .format('x'),
        10
      )
    );
  },

  // TODO add translation in week
  render() {
    return (
      <div className="text-center">
        <div className="btn-group margin-bottom-lg" role="group">
          <button
            type="button"
            className="btn btn-default-light"
            onClick={this.onDayPreviousClick}
          >
            <i className="mdi mdi-chevron-left" />
          </button>

          <div className="btn btn-default-light">
            {moment.utc(this.props.offsetStart).clone().startOf('day').format('Mo (ddd)')}
          </div>

          <button
            type="button"
            className="btn btn-default-light"
            onClick={this.onDayNextClick}
          >
           <i className="mdi mdi-chevron-right" />
          </button>
        </div>

        <div className="btn-group margin-bottom-lg">
          <button
            type="button"
            className="btn btn-default-light"
            onClick={this.onWeekPreviousClick}
          >
            <i className="mdi mdi-chevron-left" />
          </button>

          <div className="btn btn-default-light">
            {moment.utc(this.props.offsetStart).clone().startOf('day').format('w')}
          </div>

          <button
            type="button"
            className="btn btn-default-light"
            onClick={this.onWeekNextClick}
          >
            <i className="mdi mdi-chevron-right" />
          </button>
        </div>

        <div className="btn-group margin-bottom-lg">
          <button
            type="button"
            className="btn btn-default-light"
            onClick={this.onMonthPreviousClick}
          >
            <i className="mdi mdi-chevron-left" />
          </button>

          <div className="btn btn-default-light">
            {moment.utc(this.props.offsetStart).clone().startOf('day').format('MMMM')}
          </div>

          <button
            type="button"
            className="btn btn-default-light"
            onClick={this.onMonthNextClick}
          >
            <i className="mdi mdi-chevron-right" />
          </button>
        </div>

        <div className="btn-group margin-bottom-lg">
          <button
            type="button"
            className="btn btn-default-light"
            onClick={this.onYearPreviousClick}
          >
            <i className="mdi mdi-chevron-left" />
          </button>

          <div className="btn btn-default-light">
            {moment.utc(this.props.offsetStart).clone().startOf('day').format('YYYY')}
          </div>

          <button
            type="button"
            className="btn btn-default-light"
            onClick={this.onYearNextClick}
          >
            <i className="mdi mdi-chevron-right" />
          </button>
        </div>
      </div>
    );
  },
});

export default PlaylistSidebar;
