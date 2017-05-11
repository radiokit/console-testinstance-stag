import React from 'react';
import Counterpart from 'counterpart';
import { Bar } from 'react-chartjs-2';
import getColor from './getColor.js';
import moment from 'moment';
import classNames from 'classnames';
import Loading from '../../../widgets/general/loading_widget.jsx';

import './StatsBarChartPerUnit.scss';

export default React.createClass({

  propTypes: {
    startDate: React.PropTypes.object.isRequired,
    endDate: React.PropTypes.object.isRequired,
    targets: React.PropTypes.object.isRequired,
    channels: React.PropTypes.object.isRequired,
    className: React.PropTypes.string,
    unit: React.PropTypes.string
  },

  getInitialState() {
    return {
      height: 500,
      loaded: false,
      data: {
        labels: [],
        datasets: [],
      },
    };
  },

  componentWillMount() {
    this.reload(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this.reload(nextProps);
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
      loaded: true,
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

  reload({ startDate, endDate, targets, channels, unit }) {
    const { data } = this.state;
    let query = window.data.query('circumstances', this.getModelName(unit))
      .where(unit, 'gte', startDate.format(this.dateFormat))
      .where(unit, 'lte', endDate.format(this.dateFormat));

    if (targets.isEmpty()) {
      query
        .where('target_id', 'isnull');
    } else {
      query
        .joins('target')
        .where('target.id', 'in', targets.map(u => u.get('id')).toJS());
    }

    if (channels.isEmpty()) {
      query
        .where('channel_id', 'in', []);
    } else {
      query
        .where('channel_id', 'in', channels.map(u => u.get('channel_id')).toJS());
    }

    query
      .select('over_one_minute', 'over_five_minutes', 'over_fifteen_minutes', 'over_thirty_minutes', 'over_one_hour', 'over_three_hours', 'over_twelve_hours')
      .on('fetch', this.onDataReceived)
      .fetch();
  },

  render() {
    const { className, ...props } = this.props;

    if (this.state.loaded === false) {
      return <Loading />;
    }

    return (
      <div className={classNames('StatsBarChartPerUnit', className)} {...props}>
        <div ref="container" className="StatsBarChartPerUnit-innerContainer">
          <Bar
            key={this.state.height}
            ref="chart"
            data={this.state.data}
            options={this.chartOptions}
            height={this.state.height}
            redraw
          />
        </div>
      </div>
    );
  },

});
