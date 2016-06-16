import React from 'react';
import AutoDJForm from './autodj_form.jsx';

// import Translate from 'react-translate-component';
import counterpart from 'counterpart';
import localePL from './autodj_form_sender_pl';
import localeEN from './autodj_form_sender_en';

counterpart.registerTranslations('en', localeEN);
counterpart.registerTranslations('pl', localePL);

import {
  validateForm,
  formToWeeklyItem,
  sendWeeklyItem,
} from './autodj_form_sender_utils';

import {
  STEPS_NAMES,
  EMPTY_MODEL,
} from './autodj_form_commons';

const AutoDJFormSender = React.createClass({
  propTypes: {
    afterFormAccept: React.PropTypes.func,
    afterFormCancel: React.PropTypes.func,
  },

  getInitialState() {
    return {
      errors: [],
      model: EMPTY_MODEL,
      step: 0,
    };
  },

  clearForm() {
    this.setState(this.getInitialState());
  },

  sendForm() {
    const { afterFormAccept } = this.props;
    const entity = formToWeeklyItem(this.state.model);
    const job = sendWeeklyItem(entity);
    this.setState({ step: STEPS_NAMES.indexOf('finishing') });
    return job
      .then(this.clearForm.bind(this))
      .then(afterFormAccept)
      .catch(() => this.setState({
        step: STEPS_NAMES.indexOf('finishing') - 1,
        errors: ['AutoDJFormSender.sendingError'],
      }));
  },

  handleFormAccept() {
    const errors = validateForm(this.state.model);
    this.setState({ errors });
    if (errors.length === 0) {
      this.sendForm();
    }
  },

  handleFormCancel() {
    const { afterFormCancel = () => null } = this.props;
    this.clearForm();
    afterFormCancel();
  },

  handleStepChange(step) {
    this.setState({ step });
  },

  handleModelChange(model) {
    this.setState({ model });
  },

  render() {
    const {
      errors,
      model,
    } = this.state;

    const props = {
      ...this.props,
      model,
      onModelChange: this.handleModelChange,
      onFormAccept: this.handleFormAccept,
      onFormCancel: this.handleFormCancel,
      step: this.state.step,
      onStep: this.handleStepChange,
    };

    return (
      <div className="modal-body">
        <div className="AutoDJFormSender">
          <div className="AutoDJFormSender__errors has-error">
            {errors.map((error, i) => (
              <div className="text-danger text-caption" key={i}>{counterpart(error)}</div>
            ))}
          </div>
          <AutoDJForm {...props} />
        </div>
      </div>
    );
  },
});

export default AutoDJFormSender;
