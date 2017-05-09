import React from 'react';
import Counterpart from 'counterpart';
import { Line } from 'react-chartjs-2';
import getColor from './getColor.js';
import resizeSensor from 'css-element-queries/src/ResizeSensor';
import moment from 'moment';
import classNames from 'classnames';
import merge from 'lodash.merge';

import './StatsLineChartPerHour.scss';

Counterpart.registerTranslations('en', require('./IndexView.locale.en.js'));
Counterpart.registerTranslations('pl', require('./IndexView.locale.pl.js'));

export default React.createClass({

  propTypes: {
    dateRange: React.PropTypes.object.isRequired,
    targets: React.PropTypes.object.isRequired,
    channels: React.PropTypes.object.isRequired,
    className: React.PropTypes.string,
  },

  getInitialState() {
    return {
      width: 300,
      height: 300,
      data: {
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
    const { dateRange, targets } = this.props;
    const dateRangeArray = Array.from(dateRange.by('hours'));
    const display_data = targets
            .groupBy(u => u).map(u => u.get(0))
            .map(u => {
              const filteredData = data
                .filter(watch => watch.get('target').get('id') === u.get('id'))
                .groupBy(watch =>
                  moment(watch.get('hour'), this.dateFormat).diff(dateRange.start, 'hours'));

              const connections =  filteredData
                .map(watch => watch.map(record => record.get('connections')).reduce((previous, current) => previous + current));

              const listeners = filteredData
                .map(watch => watch.map(record => record.get('listeners')).reduce((previous, current) => previous + current));

              return {
                id: u.get('id'),
                name: u.get('name'),
                connections: dateRangeArray.map((_v, k) => connections.get(k) || 0),
                listeners: dateRangeArray.map((_v, k) => listeners.get(k) || 0),
              };
            })
            .toArray()
            .map(u => {
              const colorNum = parseInt(u.id.replace(/\D/g, ''), 10) % 500;
              return [
                {
                  label: u.name + Counterpart(this.contentPrefix + ".labels.listeners"),
                  data: u.listeners,
                  borderColor: getColor(colorNum, 30, 1),
                  backgroundColor: getColor(colorNum, 60, 1),
                  borderWidth: 2,
                },
                {
                  label: u.name + Counterpart(this.contentPrefix + ".labels.connections"),
                  data: u.connections,
                  borderColor: getColor(colorNum, 50, 1),
                  backgroundColor: getColor(colorNum, 80, 1),
                  borderWidth: 2,
                }
              ];
            });

    this.setState({
      data: {
        labels: dateRangeArray,
        datasets: [].concat.apply([], display_data),
      },
    });

  },

  chartOptions: {
    responsive: false,
    animation: false,
    maintainAspectRatio: false,
    hover: {
      animationDuration: 0
    },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0,
        hitRadius: 2,
      },
      line: {
        fill: 'bottom',
      },
    },
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          tooltipFormat: 'YYYY-MM-DD HH:mm',
          displayFormat: 'HH:mm',
        },
        position: 'bottom',
      }],
      yAxes: [{
        ticks: {
          suggestedMin: 0,
          suggestedMax: 50,
        },
        stacked: true
      }],
    },
  },

  dateFormat: 'YYYY-MM-DD HH:mm:ss',
  contentPrefix: 'apps.broadcast.stats.charts',

  mergedChartOptions() {
    const xAxisLabel = {
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: Counterpart('apps.broadcast.stats.charts.labels.xAxisLabel'),
          }
        }]
      }
    };

    return merge(this.chartOptions, xAxisLabel);
  },

  reload({ dateRange, targets, channels }) {
    const { data } = this.state;
    data.labels = Array.from(dateRange.by('hours'));

    let query = window.data.query('circumstances', 'cache_stream_play_per_target_per_hour')
      .where('hour', 'gte', dateRange.start.format(this.dateFormat))
      .where('hour', 'lte', dateRange.end.format(this.dateFormat));

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
        .where('channel_id', 'isnull');
    } else {
      query
        .where('channel_id', 'in', channels.map(u => u.get('channel_id')).toJS());
    }

    query
      .select('target.id', 'target.name', 'hour', 'connections', 'listeners')
      .on('fetch', this.onDataReceived)
      .fetch();
  },

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classNames('StatsLineChartPerHour', className)} {...props}>
        <div ref="container" className="StatsLineChartPerHour-innerContainer">
          <Line
            key={`${this.state.width}x${this.state.height}`}
            ref="chart"
            data={this.state.data}
            options={this.mergedChartOptions()}
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
