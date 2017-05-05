import React, { PropTypes } from 'react';
import moment from 'moment';

import TableBrowser from '../../../widgets/admin/table_browser_widget.jsx';
import RadioKit from '../../../services/RadioKit';
import PlaylistToolbar from './PlaylistToolbar.jsx';

const MILLISECONDS_PER_MINUTE = 1000 * 60;
const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * 60;
const MILLISECONDS_PER_DAY = MILLISECONDS_PER_HOUR * 24;
const DAY_START_HOURS_OFFSET = 5;

function calcDayStart(timestamp, timezone, dayStartHoursOffset) {
  return moment
    .tz(timestamp, timezone)
    .subtract(dayStartHoursOffset, 'hours')
    .startOf('day')
    .add(dayStartHoursOffset, 'hours')
    .valueOf()
  ;
}

const BroadcastPlaylistContent = React.createClass({
  propTypes: {
    offset: PropTypes.number.isRequired,
  },

  contextTypes: {
    data: PropTypes.object.isRequired,
    currentBroadcastChannel: PropTypes.object.isRequired,
  },

  componentWillReceiveProps(newProps) {
    if (newProps.offset !== this.props.offset) {
      // trigger data reload after props are propagated
      this.requestDataRefetch = true;
    }
  },

  componentDidUpdate() {
    if (this.refs.tableBrowser && this.requestDataRefetch) {
      this.requestDataRefetch = false;
      this.refs.tableBrowser.reloadData();
    }
  },

  buildTableAttributes() {
    return {
      cue_in_at: { renderer: 'datetime', sortable: true },
      name: { renderer: 'string', sortable: true },
      cue_out_at: { renderer: 'datetime', sortable: true },
    };
  },

  buildTableRecordsQuery() {
    const currentBroadcastChannel = this.context.currentBroadcastChannel;
    const from = calcDayStart(
      this.props.offset,
      currentBroadcastChannel.get('timezone'),
      DAY_START_HOURS_OFFSET
    );
    const to = from + MILLISECONDS_PER_DAY;
    const fromISO = moment(from).toISOString();
    const toISO = moment(to).toISOString();

    return RadioKit
      .query('plumber', 'Media.Input.File.RadioKit.Vault')
      .select(
        'id',
        'name',
        'cue_in_at',
        'cue_out_at',
        'references',
        'file',
      )
      .where(
        'references',
        'deq',
        `broadcast_channel_id ${currentBroadcastChannel.get('id')}`,
      )
      .where('cue_in_at', 'lte', toISO)
      .where('cue_out_at', 'gte', fromISO);
  },

  render() {
    return (
      <TableBrowser
        ref="tableBrowser"
        attributes={this.buildTableAttributes()}
        contentPrefix="apps.broadcast.playlist.browser"
        requestFullRecords
        recordsQuery={this.buildTableRecordsQuery()}
      >
        <PlaylistToolbar />
      </TableBrowser>
    );
  },
});

export default BroadcastPlaylistContent;
