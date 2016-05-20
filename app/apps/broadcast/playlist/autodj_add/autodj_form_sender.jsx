import React from 'react';
import AutoDJForm from './autodj_form.jsx';

// import Translate from 'react-translate-component';
import counterpart from 'counterpart';
import localePL from './autodj_form_sender_pl';
import localeEN from './autodj_form_sender_en';

counterpart.registerTranslations('en', localeEN);
counterpart.registerTranslations('pl', localePL);

import validateForm from './autodj_form_sender_validator';

function sendForm(form) {
  // TODO
}

const AutoDJFormSender = React.createClass({
  propTypes: {
    afterFormAccept: React.PropTypes.func,
  },

  getInitialState() {
    return {};
  },

  handleFormAccept(form) {
    const errors = validateForm(form);
    if (errors === null) {
      this.setState({ errors: null });
      sendForm(form);
    } else {
      this.setState({ errors });
    }
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
      <div className="AutoDJFormSender">
        <div className="AutoDJFormSender__errors">
          {errors.map(error => <div>{error}</div>)}
        </div>
        <AutoDJForm {...props} />
      </div>
    );
  },
});

export default AutoDJFormSender;
