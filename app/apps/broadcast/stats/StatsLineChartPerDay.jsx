import React from 'react';
import Counterpart from 'counterpart';
import { Line } from 'react-chartjs-2';
import getColor from './getColor.js';
import moment from 'moment';
import classNames from 'classnames';
import merge from 'lodash.merge';
import Loading from '../../../widgets/general/loading_widget.jsx';

import './StatsLineChartPerDay.scss';

export default React.createClass({

  propTypes: {
    dateRange: React.PropTypes.object.isRequired,
    targets: React.PropTypes.object.isRequired,
    channels: React.PropTypes.object.isRequired,
    className: React.PropTypes.string,
    xAxisLabel: React.PropTypes.string,
  },

  getInitialState() {
    return {
      height: 500,
      loaded: false,
      data: {
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
    const { dateRange, targets } = this.props;
    const dateRangeArray = Array.from(dateRange.by('days'));
    const display_data = targets
            .groupBy(u => u).map(u => u.get(0))
            .map(u => {
              const filteredData = data
                .filter(watch => watch.get('target').get('id') === u.get('id'))
                .groupBy(watch =>
                  moment(watch.get('day'), this.dateFormat).diff(dateRange.start, 'days'));

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
      loaded: true,
      data: {
        labels: dateRangeArray,
        datasets: [].concat.apply([], display_data),
      },
    });
  },

  chartOptions: {
    responsive: true,
    animation: false,
    maintainAspectRatio: false,
    hover: {
      animationDuration: 0
    },
    legend: {
      display: false,
    },
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
          tooltipFormat: 'YYYY-MM-DD',
          displayFormat: 'DD.MM',
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
    data.labels = Array.from(dateRange.by('days'));

    let query = window.data.query('circumstances', 'cache_stream_play_per_target_per_day')
      .where('day', 'gte', dateRange.start.format(this.dateFormat))
      .where('day', 'lte', dateRange.end.format(this.dateFormat));

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
      .select('target.id', 'target.name', 'day', 'connections', 'listeners')
      .on('fetch', this.onDataReceived)
      .fetch();
  },

  render() {
    const { className, ...props } = this.props;

    if (this.state.loaded === false) {
      return <Loading />;
    }

    return (
      <div className={classNames('StatsLineChartPerDay', className)} {...props}>
        <div ref="container" className="StatsLineChartPerDay-innerContainer">
          <Line
            key={this.state.height}
            ref="chart"
            data={this.state.data}
            options={this.mergedChartOptions()}
            height={this.state.height}
            redraw
          />
        </div>
      </div>
    );
  },

});
