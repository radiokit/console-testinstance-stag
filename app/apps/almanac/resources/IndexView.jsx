import React from 'react';
import Counterpart from 'counterpart';

import Index from '../../../widgets/admin/crud/index_widget.jsx';

Counterpart.registerTranslations('en', require('./IndexView.locale.en.js'));
Counterpart.registerTranslations('pl', require('./IndexView.locale.pl.js'));


export default React.createClass({
  contextTypes: {
    currentAccount: React.PropTypes.object.isRequired,
  },


  modifyIndexQuery(query) {
    return query
      .order('name', 'asc')
      .where('references', 'deq',
        'organization_account_id', this.context.currentAccount.get('id'));
  },


  buildAttributes() {
    return {
      name: { renderer: 'string' },
      notification_emails: { renderer: 'string' },
      organization_account: { renderer: 'scope-organization-account' },
    };
  },


  buildForm() {
    return {
      name: {
        type: 'string',
        hint: true,
        validators: {
          presence: true,
        },
      },
      notification_emails: {
        type: 'string',
        hint: true,
      },
      organization_account: {
        type: 'scope-organization-account',
        validators: {
          presence: true,
        },
      },
    };
  },


  render() {
    return (
      <Index
        contentPrefix="apps.almanac.resources"
        app="agenda"
        model="Reservation.Resource"
        updateEnabled
        attributes={this.buildAttributes()}
        form={this.buildForm()}
        indexQueryFunc={this.modifyIndexQuery}
      />
    );
  },
});
