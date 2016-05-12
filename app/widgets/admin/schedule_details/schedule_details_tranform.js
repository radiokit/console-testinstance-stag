import {
  Map,
  List,
} from 'immutable';
import moment from 'moment';

export function scheduleItemToTrackItem(scheduleItem) {
  const offsetLength = (
    moment(scheduleItem.get('stop_at')).valueOf() -
    moment(scheduleItem.get('start_at')).valueOf()
  );
  return Map({
    id: scheduleItem.get('id'),
    position: moment(scheduleItem.get('start_at')).valueOf(),
    offsetStart: 0,
    offsetLength,
    maxOffsetLength: scheduleItem.getIn(['file', 'duration'], offsetLength),
    fadeIn: 0,
    fadeOut: 0,
    track: 1,
    clip: Map({
      id: scheduleItem.getIn(['file', 'id']),
      duration: scheduleItem.getIn(['file', 'duration'], offsetLength),
      images: List(),
      markers: List(),
      regions: List(),
    }),
  });
}

export function trackItemToScheduleItem(trackItem, originalScheduleItem) {
  return originalScheduleItem.merge(Map({
    start_at: moment(trackItem.get('position')).toISOString(),
    stop_at: moment(trackItem.get('position') + trackItem.get('offsetLength')).toISOString(),
  }));
}

export function assignTrackNumbersToItems(trackItemCollection, tracksCount) {
  return trackItemCollection.map(
    (trackItem, i) => trackItem.set('track', i % tracksCount + 1)
  );
}
