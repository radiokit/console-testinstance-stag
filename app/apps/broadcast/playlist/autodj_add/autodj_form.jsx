import React from 'react';
import classnames from 'classnames';
import {
  Map,
  List,
} from 'immutable';

import AutoDJShuffleForm from './autodj_shuffle_form.jsx';
import AutoDJRotationForm from './autodj_rotation_form.jsx';
import VaultRepositoryPicker from '../../../../widgets/autosuggest/vault_repository_picker.jsx';
/* eslint max-len: 0 */
import WeeklyPlanConnectedPicker from '../../../../widgets/autosuggest/weeklyplan_connected_picker.jsx';
import WeekDatesPicker from '../../../../widgets/time/week_dates_picker.jsx';
import HourRangePicker from '../../../../widgets/time/hour_range_picker.jsx';

import Translate from 'react-translate-component';
import counterpart from 'counterpart';
import localePL from './autodj_form_pl';
import localeEN from './autodj_form_en';

counterpart.registerTranslations('en', localeEN);
counterpart.registerTranslations('pl', localePL);

import './autodj_form_sender.scss';

const AUTODJ_OPTIONS = [
  'shuffle',
  // 'rotation', sending
  // TODO 'query', form, validation, sending
];
const EMPTY_RANGE = Map();
const EMPTY_WEEKDAYS = Map();
const EMPTY_MODEL = Map({
  type: AUTODJ_OPTIONS[0],
  repository: null,
  weeklyplan: null,
  weekdays: EMPTY_WEEKDAYS,
  hours: EMPTY_RANGE,
});

import { STEPS_NAMES } from './autodj_form_steps';

const AutoDJForm = React.createClass({
  propTypes: {
    currentBroadcastChannel: React.PropTypes.string,
    defaultTimeOffset: React.PropTypes.number.isRequired,
    defaultTimePeriod: React.PropTypes.number,
    step: React.PropTypes.number.isRequired,
    onStep: React.PropTypes.func.isRequired,
    afterFormAccept: React.PropTypes.func,
    afterFormCancel: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      defaultTimePeriod: 3600000, // 1h in ms
    };
  },

  getInitialState() {
    return {
      model: EMPTY_MODEL,
    };
  },

  getHours() {
    const { model } = this.state;
    return model.get('hours') || EMPTY_RANGE;
  },

  getWeekdays() {
    const { model } = this.state;
    return model.get('weekdays');
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
    const { model } = this.state;
    this.setState({ model: model.setIn(path, value) });
  },

  handleTypeChange(e) {
    this.handleModelChange(['type'], e.target.value);
    this.handleModelChange(['details'], null);
  },

  handleRepositoryChange(repository) {
    this.handleModelChange(['repository'], repository);
  },

  handleDetailsChange(details) {
    this.handleModelChange(['details'], details);
  },

  handleWeeklyPlanChange(weeklyplan) {
    this.handleModelChange(['weeklyplan'], weeklyplan);
  },

  triggerFormCancel() {
    this.setState(this.getInitialState());
    const { afterFormCancel = () => null } = this.props;
    afterFormCancel();
  },

  triggerFormAccept() {
    const { model } = this.state;
    const { afterFormAccept = () => null } = this.props;
    afterFormAccept(model);
  },

  triggerNextStep() {
    this.props.onStep(this.props.step + 1);
  },

  triggerStep(step) {
    this.props.onStep(step);
  },

  render() {
    const { model } = this.state;
    const { step } = this.props;
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
        <div className={classnames({ hidden: step >= STEPS_NAMES.indexOf('finishing') })}>

          <fieldset className={classnames({ hidden: step < STEPS_NAMES.indexOf('type') })}>
            <div className="form-group">
              <label htmlFor="autodjform_type">
                <Translate content="AutoDJForm.typeLabel" />
              </label>
              <select
                className="form-control"
                name="autodjform_type"
                value={model.get('type')}
                onChange={this.handleTypeChange}
              >
                {AUTODJ_OPTIONS.map(option => (
                  <option key={option} value={option}>{counterpart(`AutoDJForm.types.${option}`)}</option>
                ))}
              </select>
            </div>
          </fieldset>

          <fieldset className={classnames({ hidden: step < STEPS_NAMES.indexOf('repository') })}>
            <div className="form-group">
              <label>
                <Translate content="AutoDJForm.repositoryLabel" />
              </label>
              <VaultRepositoryPicker
                value={model.get('repository')}
                onChange={this.handleRepositoryChange}
              />
            </div>
          </fieldset>

          <fieldset className={classnames({ hidden: step < STEPS_NAMES.indexOf('details') })}>
            <div className="form-group">
              <Translate component="label" content="AutoDJForm.detailsLabel" />
              {typeDetailsForm}
            </div>
          </fieldset>

          <fieldset className={classnames({ hidden: step < STEPS_NAMES.indexOf('time') })}>
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

          <fieldset className={classnames({ hidden: step < STEPS_NAMES.indexOf('plan') })}>
            <div className="form-group">
              <label>
                <Translate content="AutoDJForm.weeklyplanLabel" />
              </label>
              <WeeklyPlanConnectedPicker
                broadcastChannelId={this.props.currentBroadcastChannel}
                value={model.get('weeklyplan')}
                onChange={this.handleWeeklyPlanChange}
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
