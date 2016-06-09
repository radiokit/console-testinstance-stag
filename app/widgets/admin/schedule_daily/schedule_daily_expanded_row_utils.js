import {
  Map,
} from 'immutable';

import {
  reduce,
} from 'lodash';

import padLeft from '../../../helpers/pad_left';

export {
  getScheduleItemStartTimestamp,
  getScheduleItemEndTimestamp,
  getScheduleItemStart,
  getScheduleItemEnd,
  padLeft,
  formatHMS,
  itemsToRanges,
  rangeToItem,
  isItemSilence,
  subtractFromSingleRange,
  isRangeLongerThan,
  isRangeOnEdge,
};

function getScheduleItemEnd(item) {
  return item.get('cue_out_at');
}

function getScheduleItemStartTimestamp(item) {
  return new Date(getScheduleItemStart(item)).valueOf();
}

function getScheduleItemEndTimestamp(item) {
  return new Date(getScheduleItemEnd(item)).valueOf();
}

function getScheduleItemStart(item) {
  return item.get('cue_in_at');
}


function formatHMS(dateAlike) {
  const dateCasted = new Date(dateAlike);
  return `${
    padLeft(dateCasted.getHours().toString(), 2)
    }:${
    padLeft(dateCasted.getMinutes().toString(), 2)
    }:${
    padLeft(dateCasted.getSeconds().toString(), 2)
    }`;
}

function itemsToRanges(items) {
  return items.toArray().map(itemToRange);
}

function itemToRange(item) {
  return createRange(
    getScheduleItemStartTimestamp(item),
    getScheduleItemEndTimestamp(item)
  );
}

function rangeToItem(range) {
  return Map({
    id: 'silence',
    cue_in_at: new Date(range[0]).toISOString(),
    cue_out_at: new Date(range[1]).toISOString(),
  });
}

function isItemSilence(item) {
  return item.get('id') === 'silence';
}

function createRange(start, end) {
  return [start, end];
}

function subtractFromSingleRange(initialRange, rangesToSubtract) {
  return reduce(
    rangesToSubtract,
    (resultRanges, currentRange) => subtractFromManyRanges(resultRanges, currentRange),
    [initialRange]
  );
}

function subtractFromManyRanges(ranges, rangeToSubtract) {
  const result = [];
  ranges.forEach(range => {
    const subtracted = subtractRange(range, rangeToSubtract);
    subtracted[0] && result.push(subtracted[0]);
    subtracted[1] && result.push(subtracted[1]);
  });
  return result;
}


function subtractRange(range, rangeToSubtract) {
  if (!areOverlappingRanges(range, rangeToSubtract)) {
    return [range];
  }
  return rejectImpossibleRanges([
    [range[0], rangeToSubtract[0] - 1],
    [rangeToSubtract[1], range[1]],
  ]);
}

function areOverlappingRanges(range1, range2) {
  return (
    range1[0] < range2[1] &&
    range1[1] > range2[0]
  );
}

function rejectImpossibleRanges(ranges) {
  return ranges.filter(isPossibleRange);
}

function isPossibleRange(range) {
  return range[0] < range[1];
}

function isRangeLongerThan(duration, range) {
  return (range[1] - range[0]) > duration;
}

function isRangeOnEdge(leftEdge, rightEdge, range) {
  return (
    range[0] === leftEdge ||
    range[1] === rightEdge
  );
}
