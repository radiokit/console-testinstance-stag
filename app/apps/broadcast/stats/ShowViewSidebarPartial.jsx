import React from 'react';
import Table from '../../../widgets/admin/table_browser_widget.jsx';
import { DateRange } from 'react-date-range';
import Counterpart from 'counterpart';
import TableCellChannelName from './TableCellChannelName.jsx';

const ShowViewSidebarPartial = React.createClass({
  propTypes: {
    dateRange: React.PropTypes.object.isRequired,
    onChannelTableRowSelect: React.PropTypes.func.isRequired,
    onTargetTableRowSelect: React.PropTypes.func.isRequired,
    onDateRangeSelect: React.PropTypes.func.isRequired,
  },

  contextTypes: {
    availableBroadcastChannels: React.PropTypes.object.isRequired,
  },

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

  contentPrefix: 'apps.broadcast.stats.show',

  render() {
    const availableChannels = this.context.availableBroadcastChannels.map(u => u.get('id')).toJS();

    const targetTableQuery =
      window.data.query('circumstances', 'target')
        .joins('raw_stream_plays')
        .where('raw_stream_plays.channel_id', 'in', availableChannels)
        .select('id', 'name');

    const channelTableQuery =
      window.data.query('circumstances', 'raw_stream_play')
        .scope('distinct_channels')
        .where('channel_id', 'in', availableChannels)
        .select('id', 'channel_id');

    return (
      <div className="Stats">
        <div className="Stats-datePicker">
          <DateRange
            startDate={this.props.dateRange.start}
            endDate={this.props.dateRange.end}
            calendars={1}
            onInit={this.props.onDateRangeSelect}
            onChange={this.props.onDateRangeSelect}
          />
        </div>
        <Table
          className="Stats-table"
          attributes={this.buildChannelTableAttributes()}
          contentPrefix={`${this.contentPrefix}.channelTable`}
          form={{}}
          modifyQueryResults={this.parseTableRows}
          onSelect={this.props.onChannelTableRowSelect}
          recordsQuery={channelTableQuery}
          requestFullRecords
          selectable
          selectAllOnMount
          onlyUpperPagination
          hidePaginationCounter
        />
        <Table
          className="Stats-table"
          attributes={this.buildTargetTableAttributes()}
          contentPrefix={`${this.contentPrefix}.targetTable`}
          form={{}}
          modifyQueryResults={this.parseTableRows}
          onSelect={this.props.onTargetTableRowSelect}
          recordsQuery={targetTableQuery}
          requestFullRecords
          selectable
          selectAllOnMount
          onlyUpperPagination
          hidePaginationCounter
        />
      </div>
    );
  },
});

export default ShowViewSidebarPartial;
