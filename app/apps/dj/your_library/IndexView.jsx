import React from 'react';
import Counterpart from 'counterpart';

import Index from '../../../widgets/admin/crud/index_widget.jsx';


Counterpart.registerTranslations('en', require('./IndexView.locale.en.js'));
Counterpart.registerTranslations('pl', require('./IndexView.locale.pl.js'));


export default React.createClass({
  contextTypes: {
    currentAccount: React.PropTypes.object.isRequired,
    userAccount: React.PropTypes.object.isRequired,
  },

  modifyIndexQuery(query) {
    return query
      .where('references', 'deq', 'user_account_id', this.context.currentAccount.get('id'))
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
        type="list"
        contentPrefix="apps.dj.your_library"
        app="vault"
        model="Data.Record.Repository"
        attributes={this.buildAttributes()}
        form={this.buildForm()}
        indexQueryFunc={this.modifyIndexQuery}
        createEnabled={false}
        deleteEnabled={false}
      />
    );
  },
});
