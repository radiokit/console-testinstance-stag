import React from 'react';
import Counterpart from 'counterpart';

import Index from '../../../widgets/admin/crud/index_widget.jsx';

Counterpart.registerTranslations("en", require('./IndexView.locale.en.js'));
Counterpart.registerTranslations("pl", require('./IndexView.locale.pl.js'));


export default React.createClass({
  contextTypes: {
    availableAccounts: React.PropTypes.object.isRequired,
  },

  modifyIndexQuery: function(query) {
    const availableUserAccountIds = this.context.availableAccounts.map((account) => {
      return account.get('id');
    }).toJS();

    const accountsCondition = ['references', 'din', 'user_account_id']
      .concat(availableUserAccountIds)

    return query
      .order("name", "asc")
      .where.apply(this, accountsCondition)
  },


  buildAttributes: function() {
    return {
      name:                   { renderer: "string" },
      slug:                   { renderer: "string" },
      timezone:               { renderer: "string" },
      metadata_string:        { renderer: "string" },
      metadata_updated_at:    { renderer: "datetime" },
      media_routing_group_id: { renderer: "string", props:{ selectable: true } },
      user_account:           { renderer: "scope-user-account" },
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
      slug: {
        type: "string",
        hint: true,
        validators: {
          presence: true,
        }
      },
      timezone: {
        type: "string",
        hint: true,
        validators: {
          presence: true,
        }
      },
      media_routing_group_id: {
        type: "string",
        hint: true,
        validators: {
          presence: true,
        }
      },
      description: {
        type: "string",
        hint: false,
      },
      homepage_url: {
        type: "string",
        hint: false,
      },
      genre: {
        type: "string",
        hint: false,
      },
      metadata_string: {
        type: "string",
        hint: false,
      },
      user_account: {
        type: "scope-user-account",
        validators: {
          presence: true,
        }
      },
    }
  },


  render: function() {
    return (
      <Index contentPrefix="apps.infrastructure.broadcast_channels" app="agenda" model="Broadcast.Channel" attributes={this.buildAttributes()} form={this.buildForm()} indexQueryFunc={this.modifyIndexQuery} />
    );
  }
});
