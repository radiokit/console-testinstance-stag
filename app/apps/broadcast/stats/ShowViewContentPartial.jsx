import React from 'react';
import Counterpart from 'counterpart';
import Immutable from 'immutable';
import StatsLineChart from './StatsLineChart.jsx';
import StatsBarChart from './StatsBarChart.jsx';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

const ShowViewContentPartial = React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string,
    stage: React.PropTypes.oneOf(['connections', 'streamPlayLength']).isRequired,
    checkedTargets: React.PropTypes.object.isRequired,
    checkedChannels: React.PropTypes.object.isRequired,
  },

  // componentWillReceiveProps(newProps) {
  //   if (
  //     newProps.offset !== this.props.offset ||
  //     newProps.startHour !== this.props.startHour ||
  //     newProps.endHour !== this.props.endHour
  //   ) {
  //     // trigger data reload after props are propagated
  //     this.requestDataRefetch = true;
  //   }
  // },

  // componentDidUpdate() {
  //   if (this.refs.tableBrowser && this.requestDataRefetch) {
  //     this.requestDataRefetch = false;
  //     this.refs.tableBrowser.reloadData();
  //   }
  // },

  // reloadData() {
  //   if (this.refs.tableBrowser) {
  //     this.refs.tableBrowser.reloadData();
  //   }
  // },

  renderBarChart() {
    return (
      <StatsBarChart
        className="StatsBarChart"
        dateRange={this.props.dateRange}
        targets={this.props.checkedTargets}
        channels={this.props.checkedChannels}
      />
    );
  },

  renderLineChart() {
    return (
      <StatsLineChart
        className="StatsLineChart"
        dateRange={this.props.dateRange}
        targets={this.props.checkedTargets}
        channels={this.props.checkedChannels}
      />
    );
  },

  render() {
    switch(this.props.stage) {
      case 'streamPlayLength': {
        return this.renderBarChart();
      }
      case 'connections': {
        return this.renderLineChart();
      }
    }
  },
});

export default ShowViewContentPartial;
