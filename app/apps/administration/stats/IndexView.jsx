import React from 'react';
import Counterpart from 'counterpart';
import Immutable from 'immutable';

import Show from '../../../widgets/admin/crud/show_widget.jsx';
import Table from '../../../widgets/admin/table_browser_widget.jsx';
import { DateRange } from 'react-date-range';
import moment from 'moment';
import 'moment-range';
import StatsChart from './StatsChart.jsx';

import './IndexView.scss';

import mock from './Mock';

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
    const dateRange = moment.range(range.startDate, range.endDate);
    if (this.state.dateRange.isSame(dateRange)) return;
    this.setState({ dateRange });
  },

  getUsers() {
    return mock.users(this.state.dateRange);
  },

  contentPrefix: 'apps.administration.stats.index',

  buildTableAttributes() {
    return {
      name: { renderer: 'string' },
    /*
      email: { renderer: 'string' },
      watchedCnt: { renderer: 'integer' },
      */
    };
  },

  parseTableRows(data) {
    // console.log(data.toJS());
    return data;
  },

  content() {
    const tableQuery =
      window.data.query('circumstances', 'raw_target')
        .select('id', 'name');
        // .joins('cache_on_demand_play_per_target_per_day'),
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
          <StatsChart
            className="Stats-chart"
            dateRange={this.state.dateRange}
            users={this.state.checkedUsers}
          />
        </div>
        <Table
          attributes={this.buildTableAttributes()}
          contentPrefix={`${this.contentPrefix}.table`}
          form={{}}
          modifyQueryResults={this.parseTableRows}
          onSelect={this.onTableRowSelect}
          recordsQuery={tableQuery}
          requestFullRecords
          selectable
          selectedRecordIds={this.state.selectedRecordIds}
        />
      </div>
    );
  },

  render() {
    return (
      <Show
        contentPrefix={this.contentPrefix}
        record={{ get: () => 'stats' }}
        contentElement={this.content()}
      />
    );
  },
});
