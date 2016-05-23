import React from 'react';
import {
  Map,
  List,
  is,
} from 'immutable';
import AutoDJShuffleInput from './autodj_shuffle_input.jsx';
import WeekDatesPicker from '../../../../widgets/time/week_dates_picker.jsx';
import HourRangePicker from '../../../../widgets/time/hour_range_picker.jsx';

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
const EMPTY_WEEKDAYS = Map();
const EMPTY_RANGE = Map();
const EMPTY_FORM = Map({ tags: EMPTY_SHUFFLE, weekdays: EMPTY_WEEKDAYS, hours: EMPTY_RANGE });
const ENTRY_ID_PATH = ['tag', 'id'];
const ENTRY_RATIO_PATH = ['ratio'];

function balanceEntriesAgainst(entriesToBalance, targetSum, staticEntry) {
  const restOfEntries = entriesToBalance.filter(
    v => !is(v, staticEntry)
  );
  const restTargetSum = targetSum - staticEntry.getIn(ENTRY_RATIO_PATH, 0);
  const balancedRestRatios = balanceLevels(
    restOfEntries
      .groupBy(entry => entry.getIn(ENTRY_ID_PATH))
      .map(groupedEntries => groupedEntries.last().getIn(ENTRY_RATIO_PATH)),
    restTargetSum
  );
  const restBalancedSum = sumValues(balancedRestRatios);
  const restTargetSumDiff = restTargetSum - restBalancedSum;
  const liftedRestRatios = balanceLevels(
    balancedRestRatios.map(
      ratio => Math.max(0, ratio + restTargetSumDiff / balancedRestRatios.count())
    ),
    restTargetSum
  );
  const balancedAllRatios = liftedRestRatios.set(
    staticEntry.getIn(ENTRY_ID_PATH),
    staticEntry.getIn(ENTRY_RATIO_PATH)
  );
  return (
    entriesToBalance
      .map(
        entry => entry.setIn(
          ENTRY_RATIO_PATH,
          balancedAllRatios.get(entry.getIn(ENTRY_ID_PATH))
        )
      )
  );
}

function balanceTagsAgainst(tags, newTag) {
  if (tags.count() === 1) {
    return tags.setIn([0].concat(ENTRY_RATIO_PATH), 1);
  } else if (newTag) {
    return balanceEntriesAgainst(tags, 1, newTag);
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

  getWeekdays() {
    const value = this.getValue();
    const valueRange = value.get('weekdays') || EMPTY_WEEKDAYS;
    return valueRange;
  },

  getHours() {
    const value = this.getValue();
    const valueRange = value.get('hours') || EMPTY_RANGE;
    return valueRange;
  },

  triggerChange(newValue) {
    const { onChange = () => null } = this.props;
    onChange(newValue, this.getValue());
  },

  handleEntriesChange(entries) {
    const value = this.getValue();
    this.triggerChange(value.set('tags', entries));
  },

  handleEntryChange(newEntry, oldEntry) {
    const entries = this.getEntries();

    const updatedEntries = getUnique(
      clearEmptyEntries(
        substituteEntry(entries, oldEntry, newEntry)
      ),
      ENTRY_ID_PATH
    );

    this.handleEntriesChange(
      balanceTagsAgainst(updatedEntries, newEntry)
    );
  },

  setWeekdays(range) {
    const value = this.getValue();
    this.triggerChange(value.set('weekdays', range));
  },

  setHours(hours) {
    const value = this.getValue();
    this.triggerChange(value.set('hours', hours));
  },

  addNewValue(value) {
    this.handleEntriesChange(
      balanceTagsAgainst(
        getUnique(
          this.getEntries().push(value),
          ENTRY_ID_PATH
        ),
        value
      )
    );
  },

  render() {
    return (
      <div className="AutoDJShuffleForm">
        <div className="AutoDJShuffleForm__fields">
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
            onChange={this.addNewValue}
          />
        </div>
        <div className="AutoDJShuffleForm__dates">
          <WeekDatesPicker
            value={this.getWeekdays()}
            onChange={this.setWeekdays}
          />
        </div>
        <div className="AutoDJShuffleForm__hours">
          <HourRangePicker
            value={this.getHours()}
            onChange={this.setHours}
          />
        </div>
      </div>
    );
  },
});

export default AutoDJShuffleForm;
