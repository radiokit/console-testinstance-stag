import React from 'react';
import resizeSensor from 'css-element-queries/src/ResizeSensor';
import classNames from 'classnames';
import StatsBarChartPerUnit from './StatsBarChartPerUnit.jsx';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

import './StatsBarChart.scss';

export default React.createClass({

  propTypes: {
    dateRange: React.PropTypes.object.isRequired,
    targets: React.PropTypes.object.isRequired,
    channels: React.PropTypes.object.isRequired,
    className: React.PropTypes.string,
  },

  statsPerUnitComponent(unit) {
    const { dateRange, targets, channels } = this.props;
    const startDate = dateRange.start.clone().startOf(unit);
    const endDate = dateRange.end.clone().endOf(unit);

    return (
      <StatsBarChartPerUnit
        className="Stats-chart"
        startDate={startDate}
        endDate={endDate}
        targets={targets}
        channels={channels}
        unit={unit}
      />
    );
  },

  chooseContent(dateRange) {
    const dateRangeLength = Array.from(dateRange.by('days')).length;

    if(dateRangeLength > 21) {
      return this.statsPerUnitComponent('month');
    } else if(dateRangeLength > 7) {
      return this.statsPerUnitComponent('week');
    } else {
      return this.statsPerUnitComponent('day');
    }
  },

  render() {
    return this.chooseContent(this.props.dateRange);
  },

});
