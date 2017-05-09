import React from 'react';
import resizeSensor from 'css-element-queries/src/ResizeSensor';
import classNames from 'classnames';
import StatsLineChartPerDay from './StatsLineChartPerDay.jsx';
import StatsLineChartPerHour from './StatsLineChartPerHour.jsx';
import StatsLineChartPerMinute from './StatsLineChartPerMinute.jsx';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

import './StatsLineChart.scss';

export default React.createClass({

  propTypes: {
    dateRange: React.PropTypes.object.isRequired,
    targets: React.PropTypes.object.isRequired,
    channels: React.PropTypes.object.isRequired,
    className: React.PropTypes.string,
  },

  statsPerDayComponent() {
    const { targets, channels } = this.props;

    return (
      <StatsLineChartPerDay
        className="Stats-chart"
        dateRange={this.getFixedDateRange()}
        targets={targets}
        channels={channels}
      />
    );
  },

  statsPerHourComponent() {
    const { targets, channels } = this.props;

    return (
      <StatsLineChartPerHour
        className="Stats-chart"
        dateRange={this.getFixedDateRange()}
        targets={targets}
        channels={channels}
      />
    );
  },

  statsPerMinuteComponent() {
    const { targets, channels } = this.props;

    return (
      <StatsLineChartPerMinute
        className="Stats-chart"
        dateRange={this.getFixedDateRange()}
        targets={targets}
        channels={channels}
      />
    );
  },

  getFixedDateRange() {
    const fixedDateRange = moment.range(this.props.dateRange.start.clone().startOf('day'), this.props.dateRange.end.clone().endOf('day'));
    return fixedDateRange;
  },

  chooseContent(dateRange) {
    const dateRangeLength = Array.from(dateRange.by('days')).length;

    if(dateRangeLength > 7) {
      return this.statsPerDayComponent();
    } else if(dateRangeLength > 1) {
      return this.statsPerHourComponent();
    } else {
      return this.statsPerMinuteComponent();
    }
  },

  render() {
    return this.chooseContent(this.props.dateRange);
  },

});
