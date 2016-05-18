import React from 'react';
import {
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

function sumValues(entries, valuePath) {
  return entries.reduce((result, entry) => result + entry.getIn(valuePath), 0);
}

function balanceLevels(entries, valuePath, targetSum, precision = 2) {
  const sum = sumValues(entries, valuePath);
  return entries.map(
    (entry, i) => {
      const oldValue = entry.get(valuePath, 0);
      const newValue = oldValue + (targetSum - sum) / entries.count();
      const precisionFactor = Math.pow(10, precision);
      const redefine = (i + 1) % precisionFactor === 0
        ? v => Math.ceil(v)
        : v => Math.floor(v);
      const newRoundValue = redefine(
          newValue * precisionFactor
        ) / precisionFactor;
      return entry.set(
        valuePath,
        newRoundValue
      );
    }
  );
}

const AutoDJShuffleForm = React.createClass({
  propTypes: {
    tags: React.PropTypes.array,
    value: React.PropTypes.object,
    onChange: React.PropTypes.func,
  },

  handleChange(newEntry, oldEntry) {
    const entryIdPath = ['tag', 'id'];
    const entryRatioPath = ['ratio'];
    const {
      value = List(),
      onChange = () => null,
    } = this.props;

    const updatedEntries = getUnique(
      clearEmptyEntries(
        substituteEntry(value, oldEntry, newEntry)
      ),
      entryIdPath
    );

    if (newEntry) {
      const restOfEntries = updatedEntries.filter(
        v => !is(v, newEntry)
      );
      const balancedRest = balanceLevels(
        restOfEntries,
        entryRatioPath,
        1 - newEntry.getIn(entryRatioPath, 0)
      );
      const balancedEntries = balancedRest.push(newEntry);
      onChange(balancedEntries);
    } else {
      onChange(updatedEntries);
    }

  },

  render() {
    const { value = List() } = this.props;
    return (
      <div>
        {value.toArray().map((entry, i) => (
          <AutoDJShuffleInput
            key={i}
            tags={this.props.tags}
            value={entry}
            onChange={this.handleChange}
          />
        ))}
      </div>
    );
  },
});

export default AutoDJShuffleForm;
