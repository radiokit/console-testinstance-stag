import {
  is,
} from 'immutable';

import {
  ENTRY_ID_PATH,
  ENTRY_RATIO_PATH,
} from './autodj_shuffle_form_const';

export {
  substituteEntry,
  clearEmptyEntries,
  balanceTagsAgainst,
  getUnique,
  balanceEntriesAgainst,
  sumValues,
  balanceLevels,
  removeEntry,
};

function substituteEntry(entries, oldEntry, newEntry) {
  return entries.map(
    entry => {
      if (is(entry, oldEntry)) {
        return newEntry;
      }
      return entry;
    }
  );
}

function clearEmptyEntries(value) {
  return value.filter(entry => !!entry);
}

function balanceTagsAgainst(tags, staticTag) {
  if (staticTag) {
    return balanceEntriesAgainst(
      getUnique(
        tags,
        ENTRY_ID_PATH
      ),
      1,
      staticTag
    );
  }
  return tags;
}

function getUnique(entries, idPath) {
  const emptyResult = entries.clear();

  return entries.reduce(
    (result, nextEntryToInclude) => {
      const exists = !!result.find(
        includedEntry => is(includedEntry.getIn(idPath), nextEntryToInclude.getIn(idPath))
      );
      if (!exists) {
        return result.push(nextEntryToInclude);
      }
      return result;
    },
    emptyResult
  );
}

function balanceEntriesAgainst(entries, targetSum, staticEntry) {
  const dynamicEntries = removeEntry(entries, staticEntry.getIn(ENTRY_ID_PATH));
  const dynamicTargetSum = targetSum - staticEntry.getIn(ENTRY_RATIO_PATH, 0);
  const dynamicEntriesRatios = dynamicEntries
    .groupBy(entry => entry.getIn(ENTRY_ID_PATH))
    .map(groupedEntries => groupedEntries.last().getIn(ENTRY_RATIO_PATH));
  const balancedRatios = balanceLevels(
    dynamicEntriesRatios,
    dynamicTargetSum
  );
  const balancedSum = sumValues(balancedRatios);
  const balancedSumLacks = dynamicTargetSum - balancedSum;
  const liftedRatios = balanceLevels(
    balancedRatios.map(
      ratio => Math.max(0, ratio + balancedSumLacks / balancedRatios.count())
    ),
    dynamicTargetSum
  );
  const entriesRatios = liftedRatios.set(
    staticEntry.getIn(ENTRY_ID_PATH),
    targetSum - sumValues(liftedRatios)
  );
  return (
    entries
      .map(
        entry => entry.setIn(
          ENTRY_RATIO_PATH,
          entriesRatios.get(entry.getIn(ENTRY_ID_PATH))
        )
      )
  );
}

function sumValues(values) {
  return values.reduce((result, value) => result + value, 0);
}

function balanceLevels(levels, targetSum, precision = 3) {
  const sum = sumValues(levels);

  if (sum === 0) {
    return levels;
  }

  const factor = targetSum / sum;
  let cutout = 0;
  return levels.map(
    (oldValue, i) => {
      const newValue = oldValue * factor;
      const precisionFactor = Math.pow(10, precision);
      const newRoundValue = Math.floor(
          newValue * precisionFactor
        ) / precisionFactor;
      cutout += newValue - newRoundValue;
      const cutoutOverflow = (cutout > 1 / precisionFactor) ? 1 / precisionFactor : 0;
      cutout -= cutoutOverflow;
      return (
        newRoundValue +
        cutoutOverflow +
        (
          (i === levels.count() - 1 && cutout > 0)
            ? 1 / precisionFactor
            : 0
        )
      );
    }
  );
}

function removeEntry(collection, tagID) {
  return collection.filter(
    entry => entry.getIn(ENTRY_ID_PATH) !== tagID
  );
}
