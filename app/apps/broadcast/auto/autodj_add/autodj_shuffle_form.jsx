import React from 'react';
import AutoDJShuffleInput from './autodj_shuffle_input.jsx';

import {
  EMPTY_TAG,
  EMPTY_SHUFFLE,
  EMPTY_FORM,
  ENTRY_ID_PATH,
} from './autodj_shuffle_form_const';

import {
  substituteEntry,
  clearEmptyEntries,
  balanceTagsAgainst,
} from './autodj_shuffle_form_utils';

// import Translate from 'react-translate-component';
import counterpart from 'counterpart';
import localePL from './autodj_shuffle_form_pl';
import localeEN from './autodj_shuffle_form_en';

counterpart.registerTranslations('en', localeEN);
counterpart.registerTranslations('pl', localePL);

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
    if (entries.size === 0) {
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
    const {
      tags,
    } = this.props;

    if (!tags || tags.size === 0) {
      return null;
    }

    const entries = this.getEntries().toArray();
    const unusedTags = tags.filter(
      tag => !entries.reduce(
        (found, entry) => found || (
          entry.getIn(ENTRY_ID_PATH) === tag.get('id')
        ),
        false
      )
    );
    return (
      <div className="AutoDJShuffleForm">
        <div className="AutoDJShuffleForm__fields form-group">
          {entries.map((entry, i) => (
            <AutoDJShuffleInput
              key={i}
              tags={unusedTags}
              value={entry}
              onChange={this.handleEntryChange}
              showRatio={entries.length >= 2}
            />
          ))}
          <AutoDJShuffleInput
            placeholder={ entries.length ? counterpart('AutoDJShuffleForm.pickMoreTags') : null }
            key={entries.length}
            tags={unusedTags}
            value={EMPTY_TAG}
            onChange={this.addNewEntry}
          />
        </div>
      </div>
    );
  },
});

export default AutoDJShuffleForm;
