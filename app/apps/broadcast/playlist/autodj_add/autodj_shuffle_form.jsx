import React from 'react';
import {
  Map,
  List,
  is,
} from 'immutable';
import AutoDJShuffleInput from './autodj_shuffle_input.jsx';

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

const EMPTY_TAG = Map({ ratio: 0, tag: null });
const EMPTY_SHUFFLE = List();
const EMPTY_FORM = Map({ tags: EMPTY_SHUFFLE });
const ENTRY_ID_PATH = ['tag', 'id'];
const ENTRY_RATIO_PATH = ['ratio'];

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

function removeEntry(collection, tagID) {
  return collection.filter(
    entry => entry.getIn(ENTRY_ID_PATH) !== tagID
  );
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

import './autodj_shuffle_form.scss';

const AutoDJShuffleForm = React.createClass({
  propTypes: {
    tags: React.PropTypes.object,
    value: React.PropTypes.object,
    onChange: React.PropTypes.func,
  },

  getValue() {
    return this.props.value || EMPTY_FORM;
  },

  getEntries() {
    const value = this.getValue();
    const entries = value.get('tags') || EMPTY_SHUFFLE;
    if (entries.count() === 0) {
      return EMPTY_SHUFFLE;
    }
    return entries;
  },

  handleEntriesChange(entries) {
    const value = this.getValue();
    this.triggerChange(value.set('tags', entries));
  },

  handleEntryChange(newEntry, oldEntry) {
    const entries = this.getEntries();

    const updatedEntries = clearEmptyEntries(
      substituteEntry(entries, oldEntry, newEntry)
    );

    this.handleEntriesChange(
      balanceTagsAgainst(updatedEntries, newEntry)
    );
  },

  triggerChange(newValue) {
    const { onChange = () => null } = this.props;
    onChange(newValue, this.getValue());
  },

  addNewEntry(newEntry) {
    if (newEntry !== null) {
      this.handleEntriesChange(
        balanceTagsAgainst(
          this.getEntries().push(newEntry),
          newEntry
        )
      );
    }
  },

  render() {
    return (
      <div className="AutoDJShuffleForm">
        <div className="AutoDJShuffleForm__fields form-group">
          {this.getEntries().toArray().map((entry, i) => (
            <AutoDJShuffleInput
              key={i}
              tags={this.props.tags}
              value={entry}
              onChange={this.handleEntryChange}
            />
          ))}
          <AutoDJShuffleInput
            tags={this.props.tags}
            value={EMPTY_TAG}
            onChange={this.addNewEntry}
          />
        </div>
      </div>
    );
  },
});

export default AutoDJShuffleForm;
