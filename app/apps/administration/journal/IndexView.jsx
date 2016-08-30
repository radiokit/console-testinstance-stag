import React from 'react';
import Counterpart from 'counterpart';
import Immutable from 'immutable';

import Index from '../../../widgets/admin/crud/index_widget.jsx';

Counterpart.registerTranslations('en', require('./IndexView.locale.en.js'));
Counterpart.registerTranslations('pl', require('./IndexView.locale.pl.js'));

export default React.createClass({


  buildAttributes() {
    return {
      email: { renderer: "string" },
    };
  },


  render() {
    return (
      <Index
        contentPrefix="apps.administration.journal"
        app="auth"
        model="Entry"
        attributes={this.buildAttributes()}
        form={this.buildForm()} />
    );
  },
});
