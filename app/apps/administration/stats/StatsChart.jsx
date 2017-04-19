import React from 'react';
import Counterpart from 'counterpart';
import { Line } from 'react-chartjs-2';
import getColor from './getColor.js';
import resizeSensor from 'css-element-queries/src/ResizeSensor';
import moment from 'moment';
import classNames from 'classnames';
import StatsChartPerDay from './StatsChartPerDay.jsx';
import StatsChartPerHour from './StatsChartPerHour.jsx';
import StatsChartPerMinute from './StatsChartPerMinute.jsx';

import './StatsChart.scss';

export default React.createClass({

  propTypes: {
    dateRange: React.PropTypes.object.isRequired,
    users: React.PropTypes.object.isRequired,
    className: React.PropTypes.string,
  },

  statsPerDayComponent() {
    return (
      <StatsChartPerDay
        className="Stats-chart"
        dateRange={this.getFixedDateRange()}
        users={this.props.users}
      />
    );
  },

  statsPerHourComponent() {
    return (
      <StatsChartPerHour
        className="Stats-chart"
        dateRange={this.getFixedDateRange()}
        users={this.props.users}
      />
    );
  },

  statsPerMinuteComponent() {
    return (
      <StatsChartPerMinute
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
