import React from 'react';
import {
  OrderedMap,
  List,
  Map,
  is,
} from 'immutable';
import moment from 'moment';
import {
  debounce,
  noop,
} from 'lodash';
import connect from 'immview-react-connect';
import ScheduleExpandedDomain from '../../../services/ScheduleExpandedDomain';
import DetectWidth from '../../general/detect_width.jsx';
import {
  ScrollableTrackList,
} from '../../clip';
import {
  scheduleItemToTrackItem,
  trackItemToScheduleItem,
  assignTrackNumbersToTrackItems,
  sortTrackItems,
  selectTrackItemsOfRange,
} from './schedule_details_tranform';

const defaultViewportOffsetLength = 60000;
const maxOffsetLengthInHours = 1;

const ScheduleDetails = React.createClass({
  propTypes: {
    currentBroadcastChannel: React.PropTypes.object,
    offsetStart: React.PropTypes.number,
    onOffsetStartChange: React.PropTypes.func,
    activeItem: React.PropTypes.object,
    onActiveItemChange: React.PropTypes.func,

    // from connector
    items: React.PropTypes.object,
    loading: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      offsetStart: Date.now(),
      onOffsetStartChange: () => null,
      activeItem: null,
      onActiveItemChange: () => null,
    };
  },

  getInitialState() {
    return {
      offsetStart: this.props.offsetStart - defaultViewportOffsetLength / 2,
      offsetLength: defaultViewportOffsetLength,
    };
  },

  triggerOffsetStartChange: debounce(function (newValue) {
    const { onOffsetStartChange = noop } = this.props;
    onOffsetStartChange(newValue);
  }, 1000),

  handleChangeOffset({ offsetStart, offsetLength }) {
    this.setState({ offsetStart, offsetLength });
    const offsetCenter = Math.round(offsetStart + offsetLength / 2);
    this.triggerOffsetStartChange(offsetCenter);
  },

  handleItemChange(item) {
    const originalScheduleItem = this.findScheduleItem(item);
    const newScheduleItem = (
      item &&
      originalScheduleItem &&
      trackItemToScheduleItem(item, originalScheduleItem)
    );
    if (newScheduleItem) {
      ScheduleExpandedDomain.save(newScheduleItem.get('id'), newScheduleItem);
    }
  },

  handleItemSelect(trackItem) {
    const { onActiveItemChange = () => null } = this.props;
    const scheduleItem = trackItem
      ? this.findScheduleItem(trackItem)
      : null;
    onActiveItemChange(scheduleItem);
  },

  findScheduleItem(trackItem) {
    return ScheduleExpandedDomain.read().getIn([
      'all',
      trackItem.get('id'),
    ]);
  },

  render() {
    const {
      items = List(),
    } = this.props;

    const trackItems = items.map(scheduleItemToTrackItem);
    const sortedTrackItems = sortTrackItems(trackItems);
    const positionedTrackItems = assignTrackNumbersToTrackItems(sortedTrackItems);
    const pickedTrackItems = selectTrackItemsOfRange(
      positionedTrackItems,
      this.state.offsetStart,
      this.state.offsetStart + this.state.offsetLength
    );
    const lowestTrackItem = pickedTrackItems
      .maxBy(trackItem => trackItem.get('track', 0));
    const highestTrackNum = Math.max(
      6,
      lowestTrackItem
        ? lowestTrackItem.get('track')
        : 0
    );
    return (
      <div>
        <h1>
          Schedule Details
          <span children={this.props.loading ? ' ...' : ''} />
        </h1>
        <DetectWidth>{width => (
          <ScrollableTrackList
            cursorTime={this.props.offsetStart}
            scrollable
            zoomable
            width={width}
            visibleTracksCount={highestTrackNum}
            offsetStart={this.state.offsetStart}
            offsetLength={this.state.offsetLength}
            maxOffsetLength={maxOffsetLengthInHours * 60 * 60 * 1000}
            playlist={Map({ items: pickedTrackItems })}
            onItemChange={this.handleItemChange}
            timeMarks="date"
            onChangeOffset={this.handleChangeOffset}
            onItemSelect={this.handleItemSelect}
          />
        )}</DetectWidth>
        {/*
        <pre>
          {JSON.stringify(this.props.items.toJS(), null, '  ')}
        </pre>
        <pre>
          {JSON.stringify(items.toJS(), null, '  ')}
        </pre>
        <pre>
          {this.props.offsetStart}
        </pre>
        */}
      </div>
    );
  },
});

export default connect(
  ScheduleDetails,
  ScheduleExpandedDomain,
  (data, props) => {
    const {
      offsetStart = 0,
      currentBroadcastChannel = Map(),
    } = props;

    // force data fetching for currently viewed range
    const fromISO = moment(offsetStart)
      .subtract(maxOffsetLengthInHours, 'hours')
      .toISOString();
    const toISO = moment(offsetStart)
      .add(maxOffsetLengthInHours, 'hours')
      .toISOString();
    ScheduleExpandedDomain.fetch(fromISO, toISO, { maxAge: 60000 });

    const items = data
      .get('all', OrderedMap())
      .toList()
      .filter(
        item => is(
          item.getIn(['references', 'broadcast_channel_id']),
          currentBroadcastChannel.get('id')
        )
      )
    ;
    return {
      items,
      loading: data.get('loading', false),
    };
  }
);
