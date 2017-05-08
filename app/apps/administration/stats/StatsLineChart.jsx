import React from 'react';
import resizeSensor from 'css-element-queries/src/ResizeSensor';
import moment from 'moment';
import classNames from 'classnames';
import StatsLineChartPerDay from './StatsLineChartPerDay.jsx';
import StatsLineChartPerHour from './StatsLineChartPerHour.jsx';
import StatsLineChartPerMinute from './StatsLineChartPerMinute.jsx';

import './StatsLineChart.scss';

export default React.createClass({

  propTypes: {
    dateRange: React.PropTypes.object.isRequired,
    users: React.PropTypes.object.isRequired,
    className: React.PropTypes.string,
  },

  statsPerDayComponent() {
    return (
      <StatsLineChartPerDay
        className="Stats-chart"
        dateRange={this.getFixedDateRange()}
        users={this.props.users}
      />
    );
  },

  statsPerHourComponent() {
    return (
      <StatsLineChartPerHour
        className="Stats-chart"
        dateRange={this.getFixedDateRange()}
        users={this.props.users}
      />
    );
  },

  statsPerMinuteComponent() {
    return (
      <StatsLineChartPerMinute
        className="Stats-chart"
        dateRange={this.getFixedDateRange()}
        users={this.props.users}
      />
    );
  },

  getFixedDateRange() {
    const fixedDateRange = moment.range(this.props.dateRange.start.startOf('day'), this.props.dateRange.end.endOf('day'));
    return fixedDateRange;
  },

  chooseContent(dateRange) {
    const dateRangeLength = dateRange.toArray('days').length;

    if(dateRangeLength > 7) {
      return this.statsPerDayComponent();
    } else if(dateRangeLength > 1) {
      return this.statsPerHourComponent();
    } else {
      return this.statsPerMinuteComponent();
    }
  },

  render() {
    const { className, dateRange, users, ...props } = this.props;
    const content = this.chooseContent(dateRange);

    return content;
  },

});
