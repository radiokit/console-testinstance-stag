import React from 'react';
import Counterpart from 'counterpart';

import Index from '../../../widgets/admin/crud/index_widget.jsx';

Counterpart.registerTranslations("en", require('./IndexView.locale.en.js'));
Counterpart.registerTranslations("pl", require('./IndexView.locale.pl.js'));


export default React.createClass({
  modifyIndexQuery: function(query) {
    return query
      .order("name", "asc")
  },


  buildAttributes: function() {
    return {
      name:                   { renderer: "string" },
      slug:                   { renderer: "string" },
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
