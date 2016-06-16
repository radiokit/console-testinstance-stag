import React from 'react';
import Counterpart from 'counterpart';

import Index from '../../../widgets/admin/crud/index_widget.jsx';
import AutoDJAddModal from './autodj_add';

Counterpart.registerTranslations('en', require('./IndexView.locale.en.js'));
Counterpart.registerTranslations('pl', require('./IndexView.locale.pl.js'));

export default React.createClass({
  contextTypes: {
    availableUserAccounts: React.PropTypes.object.isRequired,
    currentBroadcastChannel: React.PropTypes.object.isRequired,
  },


  modifyIndexQuery(query) {
    return query
      .select('broadcast_content_type.name')
      .joins('broadcast_content_type')
      .where('broadcast_content_type.broadcast_channel_id', 'eq', this.context.currentBroadcastChannel.get('id'));
  },


  buildAttributes() {
    return {
      name: { renderer: 'string' },
      broadcast_content_type_name: { renderer: 'string', valueFunc: record => record.get('broadcast_content_type').get('name') },
      time_start: { renderer: 'string', sortable: true },
      time_stop: { renderer: 'string', sortable: true },
      on_monday: { renderer: 'boolean', sortable: true },
      on_tuesday: { renderer: 'boolean', sortable: true },
      on_wednesday: { renderer: 'boolean', sortable: true },
      on_thursday: { renderer: 'boolean', sortable: true },
      on_friday: { renderer: 'boolean', sortable: true },
      on_saturday: { renderer: 'boolean', sortable: true },
      on_sunday: { renderer: 'boolean', sortable: true },
    };
  },


  buildForm() {
    return {
      name: {
        type: 'string',
      },
    };
  },


  render() {
    return (
      <Index
        contentPrefix="apps.broadcast.auto"
        app="agenda"
        model="Schedule.Weekly.item"
        attributes={this.buildAttributes()}
        form={this.buildForm()}
        createModalElement={AutoDJAddModal}
        createModalProps={{
          availableUserAccounts: this.context.availableUserAccounts,
          currentBroadcastChannel: this.context.currentBroadcastChannel.get('id'),
          currentBroadcastChannelEntity: this.context.currentBroadcastChannel,
          defaultTimeOffset: Date.now(),
        }}
        indexQueryFunc={this.modifyIndexQuery}
      />
    );
  },
});
