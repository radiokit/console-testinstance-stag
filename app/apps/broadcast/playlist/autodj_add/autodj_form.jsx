import React from 'react';
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
import Counterpart from 'counterpart';
import localePL from './autodj_form_pl';
import localeEN from './autodj_form_en';

Counterpart.registerTranslations('en', localeEN);
Counterpart.registerTranslations('pl', localePL);

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

const AutoDJForm = React.createClass({
  propTypes: {
    currentBroadcastChannel: React.PropTypes.string,
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

  triggerFormAccept() {
    const { model } = this.state;
    const { afterFormAccept = () => null } = this.props;
    afterFormAccept(model);
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
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
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

        <fieldset>
          {typeDetailsForm}
        </fieldset>

        <fieldset>
          <div>
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

        <fieldset>
          <Translate
            className="btn btn-primary pull-right"
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
