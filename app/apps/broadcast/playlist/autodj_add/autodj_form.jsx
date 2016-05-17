import React from 'react';
import {
  Map,
} from 'immutable';

import Translate from 'react-translate-component';
import Counterpart from 'counterpart';
import localePL from './autodj_form_pl';
import localeEN from './autodj_form_en';

Counterpart.registerTranslations('en', localeEN);
Counterpart.registerTranslations('pl', localePL);

import VaultRepositoryPicker from './vault_repository_picker.jsx';

const AUTODJ_OPTIONS = [
  'shuffle',
  'rotation',
  'query',
];

const AutoDJForm = React.createClass({
  propTypes: {
    defaultTimeOffset: React.PropTypes.number.isRequired,
    defaultTimePeriod: React.PropTypes.number,
    afterFormAccept: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      defaultTimePeriod: 3600000, // 1h in ms
    };
  },

  getInitialState() {
    return {
      model: Map(),
    };
  },

  handleSubmit() {
    const { model } = this.state;
    const { afterFormAccept } = this.props;
    afterFormAccept && afterFormAccept(model.toJS());
  },

  handleTypeChange(e) {
    const { model } = this.state;
    this.setState({
      model: model.set('type', e.target.value),
    });
  },

  handleRepositoryChange(id) {
    return id;
  },

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="AutoDJForm"
      >
        <fieldset>
          <div>
            <label htmlFor="autodjform_type">
              <Translate content="AutoDJForm.typeLabel" />
            </label>
            <select
              name="autodjform_type"
              onChange={this.handleTypeChange}
              value={this.state.model.get('type', AUTODJ_OPTIONS[0])}
            >
              {AUTODJ_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="">
              <Translate content="AutoDJForm.repositoryLabel" />
            </label>
            <VaultRepositoryPicker />
          </div>
        </fieldset>
      </form>
    );
  },
});

export default AutoDJForm;
