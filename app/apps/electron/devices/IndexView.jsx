import React from 'react';
import Counterpart from 'counterpart';

import Index from '../../../widgets/admin/crud/index_widget.jsx';
import IndexCreateAcknowledgement from './IndexCreateAcknowledgement.jsx';

Counterpart.registerTranslations("en", require('./IndexView.locale.en.js'));
Counterpart.registerTranslations("pl", require('./IndexView.locale.pl.js'));


export default React.createClass({
  contextTypes: {
    currentUserAccount: React.PropTypes.object.isRequired,
  },


  modifyIndexQuery: function(query) {
    return query
      .where("application", "eq", "electron")
      .where("account_id", "eq", this.context.currentUserAccount.get("id"))
      .order("name", "asc")
  },


  buildAttributes: function() {
    return {
      name: { renderer: "string" }
    }
  },


  buildForm: function() {
    return {
      name: {
        type: "string",
        hint: true,
        validators: {
          presence: true,
        }
      },
      application: {
        type: "hidden",
        value: "electron",
      },
      account_id: {
        type: "hidden",
        value: this.context.currentUserAccount.get("id"),
      },
    }
  },


  render: function() {
    return (
      <Index
        createAcknowledgementElement={IndexCreateAcknowledgement}
        contentPrefix="apps.electron.devices"
        app="auth"
        model="Client.Standalone"
        attributes={this.buildAttributes()}
        form={this.buildForm()}
        indexQueryFunc={this.modifyIndexQuery} />
    );
  }
});
