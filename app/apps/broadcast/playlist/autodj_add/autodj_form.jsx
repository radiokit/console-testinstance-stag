import React from 'react';
import {
  Map,
  List,
} from 'immutable';

import AutoDJShuffleForm from './autodj_shuffle_form.jsx';
import VaultRepositoryPicker from './vault_repository_picker.jsx';

import Translate from 'react-translate-component';
import Counterpart from 'counterpart';
import localePL from './autodj_form_pl';
import localeEN from './autodj_form_en';

Counterpart.registerTranslations('en', localeEN);
Counterpart.registerTranslations('pl', localePL);

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
      model: Map({ type: AUTODJ_OPTIONS[0], repository: null }),
    };
  },

  triggerFormAccept() {
    const { model } = this.state;
    const { afterFormAccept } = this.props;
    afterFormAccept && afterFormAccept(model.toJS());
  },

  handleSubmit(e) {
    e.preventDefault();
  },

  handleTypeChange(e) {
    const { model } = this.state;
    this.setState({
      model: model.set('type', e.target.value),
    });
  },

  handleRepositoryChange(repository) {
    const { model } = this.state;
    this.setState({
      model: model.set('repository', repository),
    });
  },

  handleDetailsChange(details) {
    const { model } = this.state;
    this.setState({
      model: model.set('details', details),
    });
  },

  render() {
    const typeDetailsForm = ({
      [AUTODJ_OPTIONS[0]]: (
        this.state.model.getIn(['repository']) &&
        (
          <AutoDJShuffleForm
            tags={this.state.model.getIn(['repository', 'tag_items'], List())}
            value={this.state.model.get('details')}
            onChange={this.handleDetailsChange}
          />
        )
      ),
    })[this.state.model.get('type')];

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
              value={this.state.model.get('type')}
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
            <VaultRepositoryPicker
              value={this.state.model.get('repository')}
              onChange={this.handleRepositoryChange}
            />
          </div>
        </fieldset>
        <fieldset>
          {typeDetailsForm}
        </fieldset>
      </form>
    );
  },
});

export default AutoDJForm;
