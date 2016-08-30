import React from 'react';
import Counterpart from 'counterpart';
import Immutable from 'immutable';

import Index from '../../../widgets/admin/crud/index_widget.jsx';

Counterpart.registerTranslations('en', require('./IndexView.locale.en.js'));
Counterpart.registerTranslations('pl', require('./IndexView.locale.pl.js'));

export default React.createClass({


  buildAttributes() {
    return {
      reporter_app:       { renderer: "journal-reporter-app" },
      reporter_instance:  { renderer: "journal-reporter-instance" },
      severity:           { renderer: "journal-severity" },
      params:             { renderer: "journal-params" },
      action:             { renderer: "journal-action" },
      triggered_at:       { renderer: "datetime" },
      inserted_at:        { renderer: "datetime" },
    };
  },


  render() {
    return (
      <Index
        contentPrefix="apps.administration.journal"
        app="journal"
        model="Entry"
        attributes={this.buildAttributes()}
        createEnabled={false}
        deleteEnabled={false}/>
    );
  },
});
