import React from 'react';
import Counterpart from 'counterpart';
import { Line } from 'react-chartjs-2';
import getColor from './getColor.js';
import resizeSensor from 'css-element-queries/src/ResizeSensor';
import moment from 'moment';
import classNames from 'classnames';

import './StatsChartPerMinute.scss';

Counterpart.registerTranslations('en', require('./IndexView.locale.en.js'));
Counterpart.registerTranslations('pl', require('./IndexView.locale.pl.js'));

export default React.createClass({

  propTypes: {
    dateRange: React.PropTypes.object.isRequired,
    users: React.PropTypes.object.isRequired,
    className: React.PropTypes.string,
  },

  getInitialState() {
    return {
      width: 300,
      height: 300,
      data: {
        datasets: [],
      },
      status: 'upToDate',
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
    const { dateRange, users } = this.props;
    const dateRangeArray = dateRange.toArray('minutes');
    const display_data = users
            .groupBy(u => u).map(u => u.get(0))
            .map(u => {
              const connections = data
                .filter(watch => watch.get('target').get('id') === u.get('id'))
                .groupBy(watch =>
                  moment(watch.get('minute'), this.dateFormat).diff(dateRange.start, 'minutes'))
                .map(watch => watch.first().get('connections'));
              const listeners = data
                .filter(watch => watch.get('target').get('id') === u.get('id'))
                .groupBy(watch =>
                  moment(watch.get('minute'), this.dateFormat).diff(dateRange.start, 'minutes'))
                .map(watch => watch.first().get('listeners'));
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
              console.log(colorNum);
              return [
                {
                  label: u.name + " (Connections)",
                  data: u.connections,
                  borderColor: getColor(colorNum, 50, 1),
                  backgroundColor: getColor(colorNum, 80, 0.2),
                  borderWidth: 2,
                },
                {
                  label: u.name + " (Listeners)",
                  data: u.listeners,
                  borderColor: getColor(colorNum, 30, 1),
                  backgroundColor: getColor(colorNum, 60, 0.2),
                  borderWidth: 2,
                }
              ];
            });

    this.setState({
      status: 'upToDate',
      data: {
        labels: dateRangeArray,
        datasets: [].concat.apply([], display_data),
      },
    });
  },

  chartOptions: {
    responsive: false,
    maintainAspectRatio: false,
    hover: {
      animationDuration: 0
    },
    elements: {
      point: {radius: 0},
    },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    elements: {
      line: {
        fill: 'bottom',
      },
    },
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          tooltipFormat: 'YYYY-MM-DD HH:mm',
          displayFormat: 'HH:mm:ss',
        },
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

  reload({ dateRange, users }) {
    const { data } = this.state;
    data.labels = dateRange.toArray('minutes');
    this.setState({ data });
    this.setState({ status: 'loading' });
    window.data.query('circumstances', 'cache_stream_play_per_target_per_minute')
      .joins('target')
      .select('target.id', 'target.name', 'minute', 'connections', 'listeners')
      .where('minute', 'gte', dateRange.start.format(this.dateFormat))
      .where('minute', 'lte', dateRange.end.format(this.dateFormat))
      .where('target.id', 'in', users.map(u => u.get('id')).toJS())
      .on('fetch', this.onDataReceived)
      .fetch();
  },

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classNames('StatsChartPerMinute', className)} {...props}>
        <div className="StatsChartPerMinute-status">{{
          upToDate: 'Chart is up to date',
          loading: 'Loading chart data...',
          error: 'Could not load chart data',
        }[this.state.status]}</div>
        <div ref="container" className="StatsChartPerMinute-innerContainer">
          <Line
            key={`${this.state.width}x${this.state.height}`}
            ref="chart"
            data={this.state.data}
            options={this.chartOptions}
            height={this.state.height}
            width={this.state.width}
            style={{ height: this.state.height, width: this.state.width }}
          />
        </div>
      </div>
    );
  },

});
