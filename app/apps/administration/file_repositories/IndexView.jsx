import React from 'react';
import Counterpart from 'counterpart';

import Index from '../../../widgets/admin/crud/index_widget.jsx';

Counterpart.registerTranslations("en", require('./IndexView.locale.en.js'));
Counterpart.registerTranslations("pl", require('./IndexView.locale.pl.js'));

const IndexView = React.createClass({

  modifyIndexQuery(query) {
    return query
      .order('name', 'asc');
  },

  buildAttributes() {
    return {
      name: { renderer: 'string' },
      files_size_total: { renderer: 'filesize' },
      files_count: { renderer: 'integer' },
      user_account: { renderer: 'scope-user-account' },
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
      user_account: {
        type: 'scope-user-account',
        validators: {
          presence: true,
        },
      },
    };
  },

  render() {
    return (
      <Index
        contentPrefix="apps.administration.file_repositories"
        app="vault"
        model="Data.Record.Repository"
        attributes={ this.buildAttributes() }
        form={ this.buildForm() }
        updateForm = {
        {
          name: {
            type: 'string',
            hint: true,
            validators: {
              presence: true,
            },
          },
        }}
        updateEnabled = {true}
        indexQueryFunc={ this.modifyIndexQuery }
      />
    );
  },
});

export default IndexView;
