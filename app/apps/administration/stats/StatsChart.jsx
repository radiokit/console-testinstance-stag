import React from 'react';
import Counterpart from 'counterpart';
import { Line } from 'react-chartjs-2';
import getColor from './getColor.js';
import resizeSensor from 'css-element-queries/src/ResizeSensor';
import moment from 'moment';
import classNames from 'classnames';

import './StatsChart.scss';

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
    const dateRangeArray = dateRange.toArray('days');
    this.setState({
      status: 'upToDate',
      data: {
        labels: dateRangeArray,
        datasets:
          users
            .groupBy(u => u).map(u => u.get(0))
            .map(u => {
              const watchesCounts = data
                .filter(watch => watch.get('target').get('id') === u.get('id'))
                .groupBy(watch =>
                  moment(watch.get('day'), this.dateFormat).diff(dateRange.start, 'days'))
                .map(watch => watch.first().get('connections'));
              return {
                id: u.get('id'),
                name: u.get('name'),
                watches: dateRangeArray.map((_v, k) => watchesCounts.get(k) || 0),
              };
            })
            .toArray()
            .map(u => {
              const colorNum = parseInt(u.id.replace(/\D/g, ''), 10) % 500;
              return {
                label: u.name,
                data: u.watches,
                fill: false,
                borderColor: getColor(colorNum, 50, 0.8),
                backgroundColor: getColor(colorNum, 80, 0.8),
                borderWidth: 2,
              };
            }),
      },
    });
  },

  chartOptions: {
    responsive: false,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          tooltipFormat: 'DD.MM.YY',
          displayFormat: 'DD.MM',
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
    data.labels = dateRange.toArray('days');
    this.setState({ data });
    this.setState({ status: 'loading' });
    window.data.query('circumstances', 'cache_stream_play_per_target_per_day')
      .joins('target')
      .select('target.id', 'target.name', 'day', 'connections', 'listeners')
      .where('day', 'gte', dateRange.start.format(this.dateFormat))
      .where('day', 'lte', dateRange.end.format(this.dateFormat))
      .where('target.id', 'in', users.map(u => u.get('id')).toJS())
      .on('fetch', this.onDataReceived)
      .fetch();
  },

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classNames('StatsChart', className)} {...props}>
        <div className="StatsChart-status">{{
          upToDate: 'Chart is up to date',
          loading: 'Loading chart data...',
          error: 'Could not load chart data',
        }[this.state.status]}</div>
        <div ref="container" className="StatsChart-innerContainer">
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
