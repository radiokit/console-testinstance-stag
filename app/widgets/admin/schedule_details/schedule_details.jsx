import React from 'react';
import {
  OrderedMap,
  Map,
} from 'immutable';
import moment from 'moment';
import {
  debounce,
  noop,
} from 'lodash';
import connect from 'immview-react-connect';
import ScheduleDomain from '../../../services/ScheduleDomain';
import DetectWidth from '../../general/detect_width.jsx';
import {
  ScrollableTrackList,
} from '../../clip';
import { scheduleItemToTrackItem, trackItemToScheduleItem } from './schedule_details_tranform';

const tracksCount = 5;
const defaultViewportOffsetLength = 60000;
const maxOffsetLengthInHours = 24;

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
    const newScheduleItem = (
      item &&
      this.props.items &&
      trackItemToScheduleItem(
        item,
        this.findScheduleItem(item)
      )
    );
    if (newScheduleItem) {
      ScheduleDomain.save(newScheduleItem.get('id'), newScheduleItem);
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
    return this.props.items.find(
      scheduleItem => scheduleItem.get('id') === trackItem.get('id')
    );
  },

  render() {
    const items = this.props.items.map((v, k) => scheduleItemToTrackItem(v, k % tracksCount + 1));
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
            visibleTracksCount={tracksCount}
            offsetStart={this.state.offsetStart}
            offsetLength={this.state.offsetLength}
            maxOffsetLength={maxOffsetLengthInHours * 60 * 60 * 1000}
            playlist={Map({ items })}
            onItemChange={this.handleItemChange}
            timeMarks="date"
            onChangeOffset={this.handleChangeOffset}
            onItemSelect={this.handleItemSelect}
          />
        )}</DetectWidth>

        <pre>
          {JSON.stringify(this.props.items.toJS(), null, '  ')}
        </pre>
        <pre>
          {JSON.stringify(items.toJS(), null, '  ')}
        </pre>
        <pre>
          {this.props.offsetStart}
        </pre>
        
      </div>
    );
  },
});

export default connect(
  ScheduleDetails,
  ScheduleDomain,
  (data, props) => {
    // force data fetching for currently viewed range
    const fromISO = moment(props.offsetStart)
      .subtract(maxOffsetLengthInHours / 2, 'hours')
      .toISOString();
    const toISO = moment(props.offsetStart)
      .add(maxOffsetLengthInHours / 2, 'hours')
      .toISOString();

    if (!data.getIn(['ranges', Map({ from: fromISO, to: toISO })])) {
      setTimeout(() => ScheduleDomain.fetch(fromISO, toISO), 0);
    }

    // ...but push wider subset in case of whole day scrolling
    const fromTS = moment(props.offsetStart)
      .subtract(maxOffsetLengthInHours * 2, 'hours')
      .valueOf();
    const toTS = moment(props.offsetStart)
      .add(maxOffsetLengthInHours * 2, 'hours')
      .valueOf();
    const items = data
      .get('all', OrderedMap())
      .toList()
      .filter(
        item => (
          new Date(item.get('stop_at')) > fromTS &&
          new Date(item.get('start_at')) < toTS
        )
      );
    return {
      items,
      loading: data.get('loading', false),
    };
  }
);
