import React, { PropTypes } from 'react';
import moment from 'moment';
import { Seq } from 'immutable';

import TableBrowser from '../../../widgets/admin/table_browser_widget.jsx';
import RadioKit from '../../../services/RadioKit';
import PlaylistToolbar from './PlaylistToolbar.jsx';
import config from './playlistConfig';

const MILLISECONDS_PER_MINUTE = 1000 * 60;
const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * 60;

function calcDayStart(timestamp, timezone, dayStartHoursOffset) {
  return moment
    .tz(timestamp, timezone)
    .startOf('day')
    .add(dayStartHoursOffset, 'hours')
    .valueOf()
  ;
}

const BroadcastPlaylistContent = React.createClass({
  propTypes: {
    offset: PropTypes.number.isRequired,
    startHour: PropTypes.number.isRequired,
    endHour: PropTypes.number.isRequired,
  },

  contextTypes: {
    data: PropTypes.object.isRequired,
    currentBroadcastChannel: PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      selectedRecordIds: Seq().toIndexedSeq(),
    };
  },

  componentWillReceiveProps(newProps) {
    if (
      newProps.offset !== this.props.offset ||
      newProps.startHour !== this.props.startHour ||
      newProps.endHour !== this.props.endHour
    ) {
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

  onRecordsSelect(selectedRecordIds) {
    this.setState({
      selectedRecordIds,
    });
  },

  reloadData() {
    if (this.refs.tableBrowser) {
      this.refs.tableBrowser.reloadData();
    }
  },

  buildTableAttributes() {
    return {
      cue_in_at: { renderer: 'datetime', sortable: true, props: { format: 'MMM DD HH:mm:ss', timezone: '' } },
      name: { renderer: 'string', sortable: true },
      cue_out_at: { renderer: 'datetime', sortable: true, props: { format: 'MMM DD HH:mm:ss', timezone: '' } },
    };
  },

  buildTableRecordsQuery() {
    const startHour = config.dayStartHoursOffset + this.props.startHour;
    const hours = (this.props.endHour - this.props.startHour);
    const currentBroadcastChannel = this.context.currentBroadcastChannel;
    const from = calcDayStart(
      this.props.offset,
      currentBroadcastChannel.get('timezone'),
      startHour
    );
    const to = from + hours * MILLISECONDS_PER_HOUR;
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
        selectable
        onSelect={this.onRecordsSelect}
      >
        <PlaylistToolbar
          selectedRecordIds={this.state.selectedRecordIds}
          reloadData={this.reloadData}
        />
      </TableBrowser>
    );
  },
});

export default BroadcastPlaylistContent;
