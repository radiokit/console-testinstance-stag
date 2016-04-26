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

const tracksCount = 3;

function transformItemToClip(item, track) {
  return Map({
    id: item.get('id'),
    position: moment(item.get('start_at')).valueOf(),
    offsetStart: 0,
    offsetLength: moment(item.get('stop_at')).valueOf() - moment(item.get('start_at')).valueOf(),
    maxOffsetLength: Number.MAX_SAFE_INTEGER,
    fadeIn: 0,
    fadeOut: 0,
    track: (track + 1) % tracksCount,
    clip: Map({}),
  });
}

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
  }, 10 * 1000),

  render() {
    const items = this.props.items.map(transformItemToClip);
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
            timeMarks="date"
            onChangeOffset={this.handleChangeOffset}
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
    const range = Map({
      from: moment(props.offsetStart).subtract(maxOffsetLengthInHours / 2, 'hours').toISOString(),
      to: moment(props.offsetStart).add(maxOffsetLengthInHours / 2, 'hours').toISOString(),
    });
    if (!data.getIn(['ranges', range])) {
      ScheduleDomain.fetch(range.get('from'), range.get('to'));
    }
    const items = data
      .get('all', OrderedMap())
      .toList()
      .filter(
        item => (
          item.get('stop_at') > range.get('from') ||
          item.get('start_at') < range.get('to')
        )
      );
    return {
      items,
    };
  }
);
