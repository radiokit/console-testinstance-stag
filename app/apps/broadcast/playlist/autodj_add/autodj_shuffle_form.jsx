import React from 'react';
import {
  List,
  is,
} from 'immutable';
import AutoDJShuffleInput from './autodj_shuffle_input.jsx';

function getUnique(entries, objectPath) {
  const emptyResult = entries.clear();

  return entries.reduce(
    (result, nextEntryToInclude) => {
      const exists = !!result.find(
        includedEntry => is(includedEntry.getIn(objectPath), nextEntryToInclude.getIn(objectPath))
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

const AutoDJShuffleForm = React.createClass({
  propTypes: {
    tags: React.PropTypes.array,
    value: React.PropTypes.object,
    onChange: React.PropTypes.func,
  },

  handleChange(newEntry, oldEntry) {
    const {
      value = List(),
      onChange = () => null,
    } = this.props;

    const newValue = getUnique(
      clearEmptyEntries(
        substituteEntry(value, oldEntry, newEntry)
      ),
      ['tag', 'id']
    );
    onChange(newValue);
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
