import {
  Map,
  List,
} from 'immutable';

const LOWEST_TRACK_NUM = 1;

const START_TIME = 'cue_in_at';
const STOP_TIME = 'cue_out_at';
const WORKER_BOOT_TIME = 15 * 1000;
const START_WORKER_TIME = 'start_at';
const STOP_WORKER_TIME = 'stop_at';

export function scheduleItemToTrackItem(scheduleItem) {
  const offsetLength = (
    unixTS(scheduleItem.get(STOP_TIME)) -
    unixTS(scheduleItem.get(START_TIME))
  );
  return Map({
    id: scheduleItem.get('id'),
    position: unixTS(scheduleItem.get(START_TIME)),
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
  const modificationComing = {
    [START_TIME]: toISOString(trackItem.get('position')),
    [STOP_TIME]: toISOString(trackItem.get('position') + trackItem.get('offsetLength')),
  };
  const modificationDeterminable = {
    ...modificationComing,
    [START_WORKER_TIME]: toISOString(unixTS(modificationComing[START_TIME]) - WORKER_BOOT_TIME),
    [STOP_WORKER_TIME]: toISOString(unixTS(modificationComing[STOP_TIME]) + WORKER_BOOT_TIME),
  };
  return originalScheduleItem.merge(Map(modificationDeterminable));
}

function toISOString(input) {
  return new Date(input).toISOString();
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
      trackItem => unixTS(trackItem.get(START_TIME))
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
