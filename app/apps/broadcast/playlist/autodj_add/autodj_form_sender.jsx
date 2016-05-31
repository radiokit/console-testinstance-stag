import React from 'react';
import AutoDJForm from './autodj_form.jsx';

// import Translate from 'react-translate-component';
import counterpart from 'counterpart';
import localePL from './autodj_form_sender_pl';
import localeEN from './autodj_form_sender_en';

counterpart.registerTranslations('en', localeEN);
counterpart.registerTranslations('pl', localePL);

import validateForm from './autodj_form_sender_validator';

const AutoDJFormSender = React.createClass({
  propTypes: {
    afterFormAccept: React.PropTypes.func,
  },

  getInitialState() {
    return {};
  },

  sendForm(form) {
    this.setState({
      form,
    });
    // TODO
  },

  handleFormAccept(form) {
    this.setState({
      errors: validateForm(form),
      form: null,
    }, () => {
      this.state.errors.length === 0 && this.sendForm(form);
    });
  },

  getErrorsClassName(errors) {
    if (errors.length === 0) {
      return 'AutoDJFormSender__errors-hidden';
    }
    return 'AutoDJFormSender__errors';
  },

  render() {
    const {
      errors = [],
      form = null,
    } = this.state;

    const props = {
      ...this.props,
      afterFormAccept: this.handleFormAccept,
    };

    return (
      <div className="modal-body">
        <div className="AutoDJFormSender">
          <pre className={this.getErrorsClassName(errors)} >
            {errors.map(error => <div>{counterpart(error)}</div>)}
          </pre>
          <pre className="AutoDJFormSender__result">
            {JSON.stringify(form, null, '  ')}
          </pre>
          <AutoDJForm {...props} />
        </div>
      </div>
    );
  },
});

export default AutoDJFormSender;
