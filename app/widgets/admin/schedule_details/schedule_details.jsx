import React from 'react';
import {
  OrderedMap,
  Map,
  List,
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

import Perf from 'react-addons-perf';
window.Perf = Perf;

const tracksCount = 3;

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
  },

  getDefaultProps() {
    return {
      offsetStart: Date.now(),
      onOffsetStartChange: () => null,
      activeItem: null,
      onActiveItemChange: () => null,
    };
  },

  handleChangeOffset: debounce(function ({ offsetStart, offsetLength }) {
    const { onOffsetStartChange = noop } = this.props;
    onOffsetStartChange(Math.round(offsetStart + offsetLength / 2));
  }, 1000),

  handleItemChange(item) {
    const newScheduleItem = (
      item &&
      this.props.items &&
      trackItemToScheduleItem(
        item,
        this.props.items.find(
          scheduleItem => scheduleItem.get('id') === item.get('id')
        )
      )
    );
    // console.log(newScheduleItem && newScheduleItem.toJS());
    ScheduleDomain.save(newScheduleItem.get('id'), newScheduleItem);
  },

  render() {
    const items = this.props.items.map((v, k) => scheduleItemToTrackItem(v, (k + 1) % tracksCount));
    const viewportOffsetLength = 1000 * 30;
    const viewportOffsetStart = this.props.offsetStart - viewportOffsetLength / 2;
    return (
      <div>
        <h1>Schedule Details</h1>
        <DetectWidth>{width => (
          <ScrollableTrackList
            cursorTime={this.props.offsetStart}
            scrollable
            zoomable
            width={width}
            visibleTracksCount={tracksCount}
            offsetStart={viewportOffsetStart}
            offsetLength={viewportOffsetLength}
            maxOffsetLength={maxOffsetLengthInHours * 60 * 60 * 1000}
            playlist={Map({ items })}
            onItemChange={this.handleItemChange}
            timeMarks="date"
            onChangeOffset={this.handleChangeOffset}
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
      ScheduleDomain.fetch(fromISO, toISO);
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
    };
  }
);
