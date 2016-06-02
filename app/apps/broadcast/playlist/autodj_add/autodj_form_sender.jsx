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

import { STEPS_NAMES } from './autodj_form_steps';

const AutoDJFormSender = React.createClass({
  propTypes: {
    afterFormAccept: React.PropTypes.func,
    afterFormCancel: React.PropTypes.func,
  },

  getInitialState() {
    return {
      step: 0,
    };
  },

  sendForm(form) {
    const { afterFormAccept } = this.props;
    const entity = formToWeeklyItem(form);
    const job = sendWeeklyItem(entity);
    return job
      .then(afterFormAccept)
      .catch(() => this.setState({ step: STEPS_NAMES.indexOf('finishing') - 1, errors: ['AutoDJFormSender.sendingError'] }));
  },

  handleFormAccept(form) {
    const errors = validateForm(form);
    if (errors.length === 0) {
      this.setState({ step: STEPS_NAMES.indexOf('finishing'), errors });
      this.sendForm(form);
      return;
    }
    this.setState({ errors });
  },

  handleFormCancel() {
    const { afterFormCancel = () => null } = this.props;
    this.setState({ errors: [], step: 0 });
    afterFormCancel();
  },

  handleStepChange(step) {
    this.setState({ step });
  },

  render() {
    const {
      errors = [],
    } = this.state;

    const props = {
      ...this.props,
      afterFormAccept: this.handleFormAccept,
      afterFormCancel: this.handleFormCancel,
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
