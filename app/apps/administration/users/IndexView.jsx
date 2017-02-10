import React from 'react';
import Counterpart from 'counterpart';
import Immutable from 'immutable';

import Index from '../../../widgets/admin/crud/index_widget.jsx';
import UserCreateAcknowledgement from './UserCreateAcknowledgement.jsx';


Counterpart.registerTranslations('en', require('./IndexView.locale.en.js'));
Counterpart.registerTranslations('pl', require('./IndexView.locale.pl.js'));

export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object.isRequired,
    availableAccounts: React.PropTypes.object.isRequired,
  },

  modifyIndexQuery(query) {
    let availableUserAccountIds = this.context.availableAccounts.map((account) => { return account.get("id"); }).toJS();
    let accountsCondition = ['organization_accounts.id', 'in'].concat(availableUserAccountIds)

    return query
      .joins("organization_accounts")
      .where.apply(this, accountsCondition)
      .order("email", "asc")
  },


  buildAttributes() {
    return {
      name: { renderer: "string" },
      email: { renderer: "string" },
    };
  },


  buildForm() {
    return {
      name: {
        type: 'string',
      },

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
        contentPrefix="apps.administration.users"
        app="jungle"
        model="Client.User"
        attributes={this.buildAttributes()}
        form={this.buildForm()}
        indexQueryFunc={this.modifyIndexQuery}
        createAcknowledgementElement={UserCreateAcknowledgement} />
    );
  },
});
