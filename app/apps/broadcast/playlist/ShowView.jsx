import React, { PropTypes } from 'react';
import moment from 'moment';

import Show from '../../../widgets/admin/crud/show_widget.jsx';
import SidebarPartial from './ShowViewSidebarPartial.jsx';

const mockRecord = {
  get: () => {},
};

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

const ShowView = React.createClass({
  propTypes: {
    routeParams: PropTypes.object,
    history: PropTypes.object,
  },

  contextTypes: {
    currentBroadcastChannel: React.PropTypes.object.isRequired,
  },

  getOffset() {
    return this.props.routeParams.date ?
      parseInt(this.props.routeParams.date, 10) :
      Date.now();
  },

  getChildProps() {
    return {
      currentBroadcastChannel: this.context.currentBroadcastChannel,

    };
  },

  handleOffsetStartChange(offset) {
    this.props.history.push(`/apps/broadcast/playlist/${offset}`);
  },

  modifyShowQuery(query) {
    const currentBroadcastChannel = this.context.currentBroadcastChannel;
    const from = calcDayStart(
      this.getOffset(),
      currentBroadcastChannel.get('timezone'),
      DAY_START_HOURS_OFFSET
    );
    const to = from + MILLISECONDS_PER_DAY;
    const fromISO = moment(from).toISOString();
    const toISO = moment(to).toISOString();

    return query
      .clearWhere()
      .select(
        'start_at',
        'stop_at',
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
      .where('start_at', 'lte', toISO)
      .where('stop_at', 'gte', fromISO);
  },

  buildTabs() {
    return {

    };
  },

  buildSideBar() {
    return {
      test: {
        element: SidebarPartial,
        props: {
          offsetStart: this.getOffset(),
          onOffsetStartChange: this.handleOffsetStartChange,
        },
      },
    };
  },

  render() {
    return (
      <Show
        contentPrefix="apps.broadcast.playlist"
        app="plumber"
        model="Media.Input.File.RadioKit.Vault"
        showQueryFunc={this.modifyShowQuery}
        sidebarElement={this.buildSideBar()}
        contentElement={this.buildTabs()}
        deleteEnabled={false}
        // record={mockRecord}
      />
    );
  },
});

export default ShowView;
