import React from 'react';
import Counterpart from 'counterpart';
import Immutable from 'immutable';

import Index from '../../../widgets/admin/crud/index_widget.jsx';

Counterpart.registerTranslations('en', require('./IndexView.locale.en.js'));
Counterpart.registerTranslations('pl', require('./IndexView.locale.pl.js'));

export default React.createClass({


  modifyIndexQuery(query) {
    let availableUserAccountIds = this.context.availableUserAccounts.map((account) => { return account.get("id"); }).toJS();
    let accountsCondition = ['accounts.id', 'in'].concat(availableUserAccountIds)

    return query
      .joins("accounts")
      .where.apply(this, accountsCondition)
      .order("email", "asc")
  },


  buildAttributes() {
    return {
      email: { renderer: "string" },
    };
  },


  buildForm() {
    return {
      email: {
        type: 'email',
        hint: true,
        validators: {
          presence: true,
        },
      },

      locale: {
        type: 'enum',
        values: ['en', 'pl'],
        validators: {
          presence: true,
        },
      },

      account_ids: {
        type: 'set',
        untranslated: true,
        values: this.context.availableUserAccounts.reduce((reduction, account) => { return reduction.set(account.get("id"), account.get("name")); }, new Immutable.Map()).toJS(),
        hint: true,
      },

      apps_available: {
        type: 'set',
        values: this.context.currentUser.get("apps_available").toJS(),
        hint: true,
      },
    };
  },


  render() {
    return (
      <Index
        contentPrefix="apps.administration.journal"
        app="auth"
        model="Entry"
        attributes={this.buildAttributes()}
        form={this.buildForm()}
        indexQueryFunc={this.modifyIndexQuery} />
    );
  },
});
