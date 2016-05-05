import {
  Map,
  List,
} from 'immutable';
import moment from 'moment';

export function scheduleItemToTrackItem(sItem, track) {
  const offsetLength = (
    moment(sItem.get('stop_at')).valueOf() -
    moment(sItem.get('start_at')).valueOf()
  );
  return Map({
    id: sItem.get('id'),
    position: moment(sItem.get('start_at')).valueOf(),
    offsetStart: 0,
    offsetLength,
    maxOffsetLength: sItem.getIn(['file', 'duration'], offsetLength),
    fadeIn: 0,
    fadeOut: 0,
    track,
    clip: Map({
      id: sItem.getIn(['file', 'id']),
      duration: sItem.getIn(['file', 'duration'], offsetLength),
      images: List(),
      markers: List(),
      regions: List(),
    }),
  });
}

export function trackItemToScheduleItem(tItem, sItem) {
  return sItem.merge(Map({
    start_at: moment(tItem.get('position')).toISOString(),
    stop_at: moment(tItem.get('position') + tItem.get('offsetLength')).toISOString(),
  }));
}
