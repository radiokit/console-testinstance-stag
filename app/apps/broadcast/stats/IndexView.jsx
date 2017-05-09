import React from 'react';
import Counterpart from 'counterpart';
import Immutable from 'immutable';
import Show from '../../../widgets/admin/crud/show_widget.jsx';
import Table from '../../../widgets/admin/table_browser_widget.jsx';
import { DateRange } from 'react-date-range';
import StatsLineChart from './StatsLineChart.jsx';
import StatsBarChart from './StatsBarChart.jsx';
import RadioKit from '../../../services/RadioKit';
import TableCellChannelName from './TableCellChannelName.jsx';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

import './IndexView.scss';

Counterpart.registerTranslations('en', require('./IndexView.locale.en.js'));
Counterpart.registerTranslations('pl', require('./IndexView.locale.pl.js'));

export default React.createClass({

  getInitialState() {
    return {
      dateRange: moment.range(moment().subtract(1, 'months'), moment()),
      checkedTargets: Immutable.Seq().toIndexedSeq(),
      checkedChannels: Immutable.Seq().toIndexedSeq(),
    };
  },

  onChannelTableRowSelect(_selectedChannelRecordIds, checkedChannels) {
    this.setState({ checkedChannels: checkedChannels || Immutable.Seq().toIndexedSeq() });
  },

  onTargetTableRowSelect(_selectedTargetRecordIds, checkedTargets) {
    this.setState({ checkedTargets: checkedTargets || Immutable.Seq().toIndexedSeq() });
  },

  onDateRangeSelect(range) {
    const dateRange = moment.range(range.startDate.clone().startOf('day'), range.endDate.clone().endOf('day'));
    if (this.state.dateRange.isSame(dateRange)) return;
    this.setState({ dateRange });
  },

  contentPrefix: 'apps.broadcast.stats.index',

  buildTargetTableAttributes() {
    return {
      name: { renderer: 'string' },
    };
  },

  buildChannelTableAttributes() {
    return {
      channel_id: { renderer: TableCellChannelName },
    };
  },

  parseTableRows(data) {
    return data;
  },

  content() {
    const targetTableQuery =
      window.data.query('circumstances', 'target')
        .select('id', 'name');

    const channelTableQuery =
      window.data.query('circumstances', 'raw_stream_play')
        .scope('distinct_channels')
        .select('id', 'channel_id');

    return (
      <div className="Stats">
        <div className="Stats-header">
          <div className="Stats-datePicker">
            <DateRange
              startDate={this.state.dateRange.start}
              endDate={this.state.dateRange.end}
              calendars={1}
              onInit={this.onDateRangeSelect}
              onChange={this.onDateRangeSelect}
            />
          </div>
          <StatsBarChart
            className="Stats-chart"
            dateRange={this.state.dateRange}
            targets={this.state.checkedTargets}
            channels={this.state.checkedChannels}
          />
        </div>
        <div className="Stats-lineChart">
          <StatsLineChart
            className="Stats-chart"
            dateRange={this.state.dateRange}
            targets={this.state.checkedTargets}
            channels={this.state.checkedChannels}
          />
        </div>
        <div className="Stats-tables">
          <Table
            className="Stats-table"
            attributes={this.buildChannelTableAttributes()}
            contentPrefix={`${this.contentPrefix}.channelTable`}
            form={{}}
            modifyQueryResults={this.parseTableRows}
            onSelect={this.onChannelTableRowSelect}
            recordsQuery={channelTableQuery}
            requestFullRecords
            selectable
            selectAllOnMount
          />
          <Table
            className="Stats-table"
            attributes={this.buildTargetTableAttributes()}
            contentPrefix={`${this.contentPrefix}.targetTable`}
            form={{}}
            modifyQueryResults={this.parseTableRows}
            onSelect={this.onTargetTableRowSelect}
            recordsQuery={targetTableQuery}
            requestFullRecords
            selectable
            selectAllOnMount
          />
        </div>
      </div>
    );
  },

  render() {
    return (
      <Show
        contentPrefix={this.contentPrefix}
        record={{ get: () => "" }}
        contentElement={this.content()}
      />
    );
  },
});
