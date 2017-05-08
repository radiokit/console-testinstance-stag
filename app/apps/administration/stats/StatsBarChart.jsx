import React from 'react';
import resizeSensor from 'css-element-queries/src/ResizeSensor';
import moment from 'moment';
import classNames from 'classnames';
import StatsBarChartPerUnit from './StatsBarChartPerUnit.jsx';

import './StatsBarChart.scss';

export default React.createClass({

  propTypes: {
    dateRange: React.PropTypes.object.isRequired,
    users: React.PropTypes.object.isRequired,
    className: React.PropTypes.string,
  },

  statsPerUnitComponent(unit) {
    const { dateRange, users } = this.props;
    const fixedDateRange = moment.range(dateRange.start.startOf(unit), dateRange.end.endOf(unit));

    return (
      <StatsBarChartPerUnit
        className="Stats-chart"
        dateRange={fixedDateRange}
        users={users}
        unit={unit}
      />
    );
  },

  chooseContent(dateRange) {
    const dateRangeLength = dateRange.toArray('days').length;

    // if(dateRangeLength > 21) {
    //   return this.statsPerUnitComponent('month');
    // } else if(dateRangeLength > 7) {
    //   return this.statsPerUnitComponent('week');
    // } else {
    //   return this.statsPerUnitComponent('day');
    // }
      return this.statsPerUnitComponent('day');
  },

  render() {
    const { className, dateRange, users, ...props } = this.props;
    const content = this.chooseContent(dateRange);

    return content;
  },

});
