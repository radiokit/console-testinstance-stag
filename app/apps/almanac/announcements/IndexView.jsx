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
      .order('inserted_at', 'desc')
      .where('references', 'deq',
        'organization_account_id', this.context.currentAccount.get('id'));
  },


  buildAttributes() {
    return {
      name: { renderer: 'string' },
      body: { renderer: 'text' },
      organization_account: { renderer: 'scope-organization-account' },
      inserted_at: { renderer: 'datetime' },
    };
  },


  buildForm() {
    return {
      name: {
        type: 'string',
        validators: {
          presence: true,
        },
      },
      body: {
        type: 'string',
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
        contentPrefix="apps.almanac.announcements"
        app="agenda"
        model="Announcement.Message"
        attributes={this.buildAttributes()}
        form={this.buildForm()}
        indexQueryFunc={this.modifyIndexQuery}
      />
    );
  },
});
