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

function balanceLevels(levels, targetSum, precision = 2) {
  const sum = sumValues(levels);

  if (sum === 0) {
    return levels;
  }

  const factor = targetSum / sum;
  let cutout = 0;
  return levels.map(
    (level, i) => {
      const oldValue = level;
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
          (
            i === levels.count() - 1 &&
            cutout > 0
          )
            ? 1 / precisionFactor
            : 0
        )
      );
    }
  );
}

import './autodj_shuffle_form.scss';

const EMPTY_SHUFFLE = List([Map({ ratio: 1 })]);
const ENTRY_ID_PATH = ['tag', 'id'];
const ENTRY_RATIO_PATH = ['ratio'];

const AutoDJShuffleForm = React.createClass({
  propTypes: {
    tags: React.PropTypes.object,
    value: React.PropTypes.object,
    onChange: React.PropTypes.func,
  },

  getEntries() {
    const { value: propValue } = this.props;
    if (propValue === undefined || propValue.count() === 0) {
      return EMPTY_SHUFFLE;
    }
    return propValue;
  },

  handleChange(newEntry, oldEntry) {
    const {
      onChange = () => null,
    } = this.props;
    const entries = this.getEntries();

    const updatedEntries = getUnique(
      clearEmptyEntries(
        substituteEntry(entries, oldEntry, newEntry)
      ),
      ENTRY_ID_PATH
    );

    if (updatedEntries.count() === 1) {
      onChange(updatedEntries.setIn([0].concat(ENTRY_RATIO_PATH), 1));
    } else if (newEntry) {
      const restOfEntries = updatedEntries.filter(
        v => !is(v, newEntry)
      );
      const balancedRestRatios = balanceLevels(
        restOfEntries
          .groupBy(entry => entry.getIn(ENTRY_ID_PATH))
          .map(groupedEntries => groupedEntries.last().getIn(ENTRY_RATIO_PATH)),
        1 - newEntry.getIn(ENTRY_RATIO_PATH, 0)
      );
      const balancedAllRatios = balancedRestRatios.set(
        newEntry.getIn(ENTRY_ID_PATH),
        newEntry.getIn(ENTRY_RATIO_PATH)
      );
      onChange(
        updatedEntries
          .map(
            entry => entry.setIn(
              ENTRY_RATIO_PATH,
              balancedAllRatios.get(entry.getIn(ENTRY_ID_PATH))
            )
          )
      );
    } else {
      onChange(updatedEntries);
    }
  },

  addNewValue() {
    const {
      onChange = () => null,
    } = this.props;
    onChange(
      getUnique(
        this.getEntries().push(Map({ tag: null, ratio: 0 })),
        ENTRY_ID_PATH
      )
    );
  },

  render() {
    const value = this.getEntries();
    return (
      <div className="AutoDJShuffleForm">
        <div className="AutoDJShuffleForm__controls">
          <button onClick={this.addNewValue}>+</button>
        </div>
        <div className="AutoDJShuffleForm__fields">
          {value.toArray().map((entry, i) => (
            <AutoDJShuffleInput
              key={i}
              tags={this.props.tags}
              value={entry}
              onChange={this.handleChange}
            />
          ))}
        </div>
      </div>
    );
  },
});

export default AutoDJShuffleForm;
