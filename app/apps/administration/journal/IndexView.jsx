import React from 'react';
import Counterpart from 'counterpart';
import Immutable from 'immutable';

import Index from '../../../widgets/admin/crud/index_widget.jsx';

Counterpart.registerTranslations('en', require('./IndexView.locale.en.js'));
Counterpart.registerTranslations('pl', require('./IndexView.locale.pl.js'));

export default React.createClass({


  buildAttributes() {
    return {
      reporter_app: { renderer: "string" },
      reporter_instance: { renderer: "string" },
      severity: { renderer: "string" },
      params: { renderer: "string" },
      action: { renderer: "string" },
      triggered_at: { renderer: "string" },
    };
  },


  render() {
    return (
      <Index
        contentPrefix="apps.administration.journal"
        app="journal"
        model="Entries"
        attributes={this.buildAttributes()}
        createEnabled={false}
        deleteEnabled={false}/>
    );
  },
});
