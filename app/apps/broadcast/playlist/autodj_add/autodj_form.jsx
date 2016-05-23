import React from 'react';
import {
  Map,
  List,
} from 'immutable';

import AutoDJShuffleForm from './autodj_shuffle_form.jsx';
import AutoDJRotationForm from './autodj_rotation_form.jsx';
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
  // TODO 'query',
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
    const { afterFormAccept = () => null } = this.props;
    afterFormAccept(model);
  },

  handleSubmit(e) {
    e.preventDefault();
  },

  handleTypeChange(e) {
    const { model } = this.state;
    this.setState({
      model: model
        .set('type', e.target.value)
        .set('details', null),
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
    const { model } = this.state;
    const typeDetailsForm = ({
      [AUTODJ_OPTIONS[0]]: (
        model.getIn(['repository']) &&
        (
          <AutoDJShuffleForm
            tags={model.getIn(['repository', 'tag_items'], List())}
            value={model.get('details')}
            onChange={this.handleDetailsChange}
          />
        )
      ),
      [AUTODJ_OPTIONS[1]]: (
        model.getIn(['repository']) &&
        (
          <AutoDJRotationForm
            tags={model.getIn(['repository', 'tag_items'], List())}
            value={model.get('details')}
            onChange={this.handleDetailsChange}
          />
        )
      ),
    })[model.get('type')];

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
              value={model.get('type')}
              onChange={this.handleTypeChange}
            >
              {AUTODJ_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label>
              <Translate content="AutoDJForm.repositoryLabel" />
            </label>
            <VaultRepositoryPicker
              value={model.get('repository')}
              onChange={this.handleRepositoryChange}
            />
          </div>
        </fieldset>
        <fieldset>
          {typeDetailsForm}
        </fieldset>
        <fieldset>
          <Translate
            component="button"
            content="AutoDJForm.acceptButton"
            onClick={this.triggerFormAccept}
          />
        </fieldset>
      </form>
    );
  },
});

export default AutoDJForm;
