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

const AutoDJFormSender = React.createClass({
  propTypes: {
    afterFormAccept: React.PropTypes.func,
  },

  getInitialState() {
    return {};
  },

  sendForm(form) {
    const { afterFormAccept } = this.props;
    const entity = formToWeeklyItem(form);
    const job = sendWeeklyItem(entity);
    job
      .then(afterFormAccept)
      .catch(() => this.setState({ errors: ['AutoDJFormSender.sendingError'] }));
  },

  handleFormAccept(form) {
    this.setState({
      errors: validateForm(form),
      form: null,
    }, () => {
      this.state.errors.length === 0 && this.sendForm(form);
    });
  },

  render() {
    const {
      errors = [],
    } = this.state;

    const props = {
      ...this.props,
      afterFormAccept: this.handleFormAccept,
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
