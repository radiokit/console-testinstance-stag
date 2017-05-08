import React from 'react';
import Counterpart from 'counterpart';
import Immutable from 'immutable';

import Show from '../../../widgets/admin/crud/show_widget.jsx';
import Table from '../../../widgets/admin/table_browser_widget.jsx';
import { DateRange } from 'react-date-range';
import moment from 'moment';
import 'moment-range';
import StatsLineChart from './StatsLineChart.jsx';
import StatsBarChart from './StatsBarChart.jsx';

import './IndexView.scss';

Counterpart.registerTranslations('en', require('./IndexView.locale.en.js'));
Counterpart.registerTranslations('pl', require('./IndexView.locale.pl.js'));

export default React.createClass({

  getInitialState() {
    return {
      dateRange: moment.range(moment().subtract(1, 'months'), moment()),
      checkedUsers: Immutable.Seq().toIndexedSeq(),
      selectedRecordIds: Immutable.Seq().toIndexedSeq(),
    };
  },

  onTableRowSelect(selectedRecordIds, checkedUsers) {
    this.setState({ selectedRecordIds, checkedUsers });
  },

  onDateRangeSelect(range) {
    const dateRange = moment.range(range.startDate.startOf('day'), range.endDate.endOf('day'));
    if (this.state.dateRange.isSame(dateRange)) return;
    this.setState({ dateRange });
  },

  contentPrefix: 'apps.administration.stats.index',

  buildTargetTableAttributes() {
    return {
      name: { renderer: 'string' },
    };
  },

  buildChannelTableAttributes() {
    return {
      channel_id: { renderer: 'string' },
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
        .select('channel_id');

    // const channelTableQuery =
    //   window.data.query('agenda', 'Broadcast.Channel')
    //     .where('id', 'in', channelIds)
    //     .select('id', 'name');

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
            users={this.state.checkedUsers}
          />
        </div>
        <div className="Stats-lineChart">
          <StatsLineChart
            className="Stats-chart"
            dateRange={this.state.dateRange}
            users={this.state.checkedUsers}
          />
        </div>
        <div className="Stats-tables">
          <Table
            className="Stats-table"
            attributes={this.buildChannelTableAttributes()}
            contentPrefix={`${this.contentPrefix}.channelTable`}
            form={{}}
            modifyQueryResults={this.parseTableRows}
            onSelect={this.onTableRowSelect}
            recordsQuery={channelTableQuery}
            requestFullRecords
            selectable
            selectedRecordIds={this.state.selectedRecordIds}
          />
          <Table
            className="Stats-table"
            attributes={this.buildTargetTableAttributes()}
            contentPrefix={`${this.contentPrefix}.targetTable`}
            form={{}}
            modifyQueryResults={this.parseTableRows}
            onSelect={this.onTableRowSelect}
            recordsQuery={targetTableQuery}
            requestFullRecords
            selectable
            selectedRecordIds={this.state.selectedRecordIds}
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
