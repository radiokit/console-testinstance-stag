import React from 'react';
import Counterpart from 'counterpart';
import { Bar } from 'react-chartjs-2';
import getColor from './getColor.js';
import resizeSensor from 'css-element-queries/src/ResizeSensor';
import moment from 'moment';
import classNames from 'classnames';

import './StatsBarChartPerUnit.scss';

Counterpart.registerTranslations('en', require('./IndexView.locale.en.js'));
Counterpart.registerTranslations('pl', require('./IndexView.locale.pl.js'));

export default React.createClass({

  propTypes: {
    dateRange: React.PropTypes.object.isRequired,
    users: React.PropTypes.object.isRequired,
    className: React.PropTypes.string,
    unit: React.PropTypes.string
  },

  getInitialState() {
    return {
      width: 300,
      height: 300,
      data: {
        labels: [],
        datasets: [],
      },
    };
  },

  componentWillMount() {
    this.reload(this.props);
  },

  componentDidMount() {
    resizeSensor(this.refs.container, this.onResize);
    this.onResize();
  },

  componentWillReceiveProps(nextProps) {
    this.reload(nextProps);
  },

  onResize() {
    const { offsetWidth, offsetHeight } = this.refs.container;
    this.setState({ width: offsetWidth, height: offsetHeight });
  },

  onDataReceived(_event, _query, data) {
    const over_one_minute = data
      .map(watch => watch.get('over_one_minute'))
      .reduce((previous, current) => previous + current);

    const over_five_minutes = data
      .map(watch => watch.get('over_five_minutes'))
      .reduce((previous, current) => previous + current);

    const over_fifteen_minutes = data
      .map(watch => watch.get('over_fifteen_minutes'))
      .reduce((previous, current) => previous + current);

    const over_thirty_minutes = data
      .map(watch => watch.get('over_thirty_minutes'))
      .reduce((previous, current) => previous + current);

    const over_one_hour = data
      .map(watch => watch.get('over_one_hour'))
      .reduce((previous, current) => previous + current);

    const over_three_hours = data
      .map(watch => watch.get('over_three_hours'))
      .reduce((previous, current) => previous + current);

    const over_twelve_hours = data
      .map(watch => watch.get('over_twelve_hours'))
      .reduce((previous, current) => previous + current);

    const colorNum = 123;
    const displayData = {
      labels: [
        Counterpart(this.contentPrefix + ".labels.over_one_minute"),
        Counterpart(this.contentPrefix + ".labels.over_five_minutes"),
        Counterpart(this.contentPrefix + ".labels.over_fifteen_minutes"),
        Counterpart(this.contentPrefix + ".labels.over_thirty_minutes"),
        Counterpart(this.contentPrefix + ".labels.over_one_hour"),
        Counterpart(this.contentPrefix + ".labels.over_three_hours"),
        Counterpart(this.contentPrefix + ".labels.over_twelve_hours")
      ],
      datasets: [{
        data: [
          over_one_minute || 0,
          over_five_minutes || 0,
          over_fifteen_minutes || 0,
          over_thirty_minutes || 0,
          over_one_hour || 0,
          over_three_hours || 0,
          over_twelve_hours || 0,
        ],
        backgroundColor: [
          getColor(10, 80, 1),
          getColor(30, 80, 1),
          getColor(50, 80, 1),
          getColor(70, 80, 1),
          getColor(90, 80, 1),
          getColor(110, 80, 1),
          getColor(130, 80, 1),
        ],
      }]
    };

    this.setState({
      data: displayData,
    });
  },

  chartOptions: {
    animation: false,
    hover: {
      animationDuration: 0
    },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        position: 'bottom',
      }],
      yAxes: [{
        ticks: {
          suggestedMin: 0,
          suggestedMax: 50,
        },
      }],
    },
  },

  dateFormat: 'YYYY-MM-DD HH:mm:ss',
  contentPrefix: 'apps.broadcast.stats.charts',

  getModelName(unit) {
    switch(unit) {
      case 'day': {
        return 'cache_stream_play_length_per_target_per_day';
        break;
      }

      case 'week': {
        return 'cache_stream_play_length_per_target_per_week';
        break;
      }

      case 'month': {
        return 'cache_stream_play_length_per_target_per_month';
        break;
      }
    }
  },

  reload({ dateRange, users, unit }) {
    const { data } = this.state;
    window.data.query('circumstances', this.getModelName(unit))
      .joins('target')
      .select('over_one_minute', 'over_five_minutes', 'over_fifteen_minutes', 'over_thirty_minutes', 'over_one_hour', 'over_three_hours', 'over_twelve_hours')
      .where(unit, 'gte', dateRange.start.format(this.dateFormat))
      .where(unit, 'lte', dateRange.end.format(this.dateFormat))
      .where('target.id', 'in', users.map(u => u.get('id')).toJS())
      .on('fetch', this.onDataReceived)
      .fetch();
  },

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classNames('StatsBarChartPerUnit', className)} {...props}>
        <div ref="container" className="StatsBarChartPerUnit-innerContainer">
          <Bar
            key={`${this.state.width}x${this.state.height}`}
            ref="chart"
            data={this.state.data}
            options={this.chartOptions}
            height={this.state.height}
            width={this.state.width}
            style={{ height: this.state.height, width: this.state.width }}
            redraw
          />
        </div>
      </div>
    );
  },

});
