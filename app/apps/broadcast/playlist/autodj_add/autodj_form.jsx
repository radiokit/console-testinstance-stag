import React from 'react';
import classnames from 'classnames';
import {
  Map,
  List,
} from 'immutable';

import AutoDJShuffleForm from './autodj_shuffle_form_connected.jsx';
import AutoDJRotationForm from './autodj_rotation_form.jsx';
import VaultRepositoryPicker from '../../../../widgets/autosuggest/vault_repository_picker.jsx';
/* eslint max-len: 0 */
import ContentTypeConnectedPicker from '../../../../widgets/autosuggest/contenttype_connected_picker.jsx';
import WeekDatesPicker from '../../../../widgets/time/week_dates_picker.jsx';
import HourRangePicker from '../../../../widgets/time/hour_range_picker.jsx';

import Translate from 'react-translate-component';
import counterpart from 'counterpart';
import localePL from './autodj_form_pl';
import localeEN from './autodj_form_en';

counterpart.registerTranslations('en', localeEN);
counterpart.registerTranslations('pl', localePL);

import './autodj_form_sender.scss';

import {
  STEPS_NAMES,
  AUTODJ_OPTIONS,
  EMPTY_RANGE,
  EMPTY_WEEKDAYS,
} from './autodj_form_commons';

import './autodj_form.scss';

const AutoDJForm = React.createClass({
  propTypes: {
    currentBroadcastChannel: React.PropTypes.string,
    defaultTimeOffset: React.PropTypes.number.isRequired,
    defaultTimePeriod: React.PropTypes.number,
    
    model: React.PropTypes.object.isRequired,
    onModelChange: React.PropTypes.func,
    
    step: React.PropTypes.number.isRequired,
    onStep: React.PropTypes.func.isRequired,
    
    onFormAccept: React.PropTypes.func,
    onFormCancel: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      defaultTimePeriod: 3600000, // 1h in ms
    };
  },

  getHours() {
    const model = this.getModel();
    return model.get('hours') || EMPTY_RANGE;
  },

  getWeekdays() {
    const model = this.getModel();
    return model.get('weekdays') || EMPTY_WEEKDAYS;
  },
  
  getModel() {
    return this.props.model;
  },

  handleHoursChange(hours) {
    this.handleModelChange(['hours'], hours);
  },

  handleWeekdaysChange(range) {
    this.handleModelChange(['weekdays'], range);
  },

  handleSubmit(e) {
    e.preventDefault();
  },

  handleModelChange(path, value) {
    const model = this.getModel();
    const newModel = model.setIn(path, value);
    const { onModelChange = () => null } = this.props;
    onModelChange(newModel);
  },

  handleTypeChange(e) {
    const { onModelChange = () => null } = this.props;
    onModelChange(
      this.getModel()
        .setIn(['type'], e.target.value)
        .setIn(['details'], null)
    );
  },

  handleRepositoryChange(repository) {
    this.handleModelChange(['repository'], repository);
  },

  handleDetailsChange(details) {
    this.handleModelChange(['details'], details);
  },

  handleContentTypeChange(weeklyplan) {
    this.handleModelChange(['weeklyplan'], weeklyplan);
  },

  triggerFormCancel() {
    const { onFormCancel = () => null } = this.props;
    onFormCancel();
  },

  triggerFormAccept() {
    const { onFormAccept = () => null } = this.props;
    onFormAccept();
  },

  triggerNextStep() {
    this.props.onStep(this.props.step + 1);
  },

  triggerStep(step) {
    this.props.onStep(step);
  },

  render() {
    const model = this.getModel();
    const { step } = this.props;
    const typeDetailsForm = ({
      shuffle: (
        <AutoDJShuffleForm
          value={model.get('details')}
          onChange={this.handleDetailsChange}
        />
      ),
      rotation: (
        <AutoDJRotationForm
          value={model.get('details')}
          onChange={this.handleDetailsChange}
        />
      ),
    })[model.get('type')];

    return (
      <form
        onSubmit={this.handleSubmit}
        className="AutoDJForm"
      >
        <div className={classnames({ hidden: step >= STEPS_NAMES.indexOf('finishing') })}>

          <fieldset className={classnames('AutoDJForm__section', { hidden: step < STEPS_NAMES.indexOf('type') })}>
            <div className="form-group">
              <label htmlFor="autodjform_type">
                <Translate content="AutoDJForm.typeLabel" />
              </label>
              <select
                className="form-control"
                name="autodjform_type"
                value={model.get('type') || ''}
                onChange={this.handleTypeChange}
              >
                <option key={-1} value="" disabled>{counterpart('AutoDJForm.types.empty')}</option>
                {AUTODJ_OPTIONS.map(option => (
                  <option key={option} value={option}>{counterpart(`AutoDJForm.types.${option}`)}</option>
                ))}
              </select>
            </div>
          </fieldset>

          <fieldset className={classnames('AutoDJForm__section', { hidden: step < STEPS_NAMES.indexOf('details') })}>
            <div className="form-group">
              <Translate component="label" content="AutoDJForm.detailsLabel" />
              {typeDetailsForm}
            </div>
          </fieldset>

          <fieldset className={classnames('AutoDJForm__section AutoDJForm__section--separated', { hidden: step < STEPS_NAMES.indexOf('time') })}>
            <div className="form-group">
              <Translate component="label" content="AutoDJForm.weekdays" />
              <WeekDatesPicker
                value={this.getWeekdays()}
                onChange={this.handleWeekdaysChange}
              />
            </div>
            <div>
              <HourRangePicker
                value={this.getHours()}
                onChange={this.handleHoursChange}
              />
            </div>
          </fieldset>

          <fieldset className={classnames('AutoDJForm__section', { hidden: step < STEPS_NAMES.indexOf('plan') })}>
            <div className="form-group">
              <label>
                <Translate content="AutoDJForm.weeklyplanLabel" />
              </label>
              <ContentTypeConnectedPicker
                broadcastChannelId={this.props.currentBroadcastChannel}
                value={model.get('weeklyplan')}
                onChange={this.handleContentTypeChange}
              />
            </div>
          </fieldset>

        </div>

        <fieldset>
          {
            (
              (step === STEPS_NAMES.indexOf('plan')) ||
              (step === STEPS_NAMES.indexOf('time') && model.get('weeklyplan'))
            )
              ? (
              <Translate
                className="btn btn-primary pull-right"
                component="button"
                content="AutoDJForm.acceptButton"
                onClick={this.triggerFormAccept}
              />
            ) : null
          }{
            (
              (step < STEPS_NAMES.indexOf('time')) ||
              (step === STEPS_NAMES.indexOf('time') && !model.get('weeklyplan'))
            )
            ? (
              <Translate
                className="btn btn-primary pull-right"
                component="button"
                content="AutoDJForm.nextButton"
                onClick={this.triggerNextStep}
              />
            ) : null
          }
          <Translate
            className="btn btn-default-bright pull-right"
            component="button"
            content="AutoDJForm.closeButton"
            onClick={this.triggerFormCancel}
          />
        </fieldset>
      </form>
    );
  },
});


export default AutoDJForm;
