import {
  Map,
  List,
  OrderedSet,
} from 'immutable';
import moment from 'moment';

const LOWEST_TRACK_NUM = 1;

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
    fadeIn: null,
    fadeOut: null,
    track: LOWEST_TRACK_NUM,
    clip: Map({
      id: scheduleItem.getIn(['file', 'id'], 'noid'),
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

function unixTS(sourceDate) {
  return new Date(sourceDate).valueOf();
}

function findLowestUnoccupiedTrackNumInRange(trackItemCollection, from, to) {
  const occupiedTrackNums = selectTrackItemsOfRange(trackItemCollection, from, to)
    .map(trackItem => trackItem.get('track'))
    .toOrderedSet();
  for (let i = LOWEST_TRACK_NUM; ; i++) {
    if (!occupiedTrackNums.includes(i)) {
      return i;
    }
  }
}

export function sortTrackItems(trackItemCollection) {
  return trackItemCollection
    .sortBy(
      trackItem => unixTS(trackItem.get('start_at'))
    );
}

export function assignTrackNumbersToTrackItems(trackItemCollection) {
  const positionedTrackItemCollection = trackItemCollection
    .reduce(
      (result, trackItem) => result.push(
        trackItem.set('track', findLowestUnoccupiedTrackNumInRange(
          result,
          trackItem.get('position'),
          trackItem.get('position') + trackItem.get('offsetLength')
        ))
      ),
      List()
    );
  return positionedTrackItemCollection;
}

export function selectTrackItemsOfRange(trackItemCollection, from, to) {
  return trackItemCollection.filter(trackItem => (
      trackItem.get('position') < to &&
      trackItem.get('position') + trackItem.get('offsetLength') > from
    ));
}
