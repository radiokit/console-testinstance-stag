import React from 'react';
import Counterpart from 'counterpart';
import IndexTableBrowser from '../../../widgets/admin/crud/index_table_browser_widget.jsx';

Counterpart.registerTranslations('en', require('./ShowEventsPartial.locale.en.js'));
Counterpart.registerTranslations('pl', require('./ShowEventsPartial.locale.pl.js'));


export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired,
  },


  modifyIndexQuery(query) {
    return query
      .where('reservation_resource_id', 'eq', this.props.record.get('id'))
      .order('start_at', 'desc');
  },


  buildForm() {
    return {
      description: {
        type: 'string',
      },
      start_at: {
        type: 'datetime',
      },
      stop_at: {
        type: 'datetime',
      },
      reservation_resource_id: {
        type: 'hidden',
        value: this.props.record.get('id'),
      },
    };
  },


  buildAttributes() {
    return {
      description: { renderer: 'string' },
      start_at: { renderer: 'string' },
      stop_at: { renderer: 'string' },
    };
  },


  render() {
    return (
      <IndexTableBrowser
        contentPrefix={`${this.props.contentPrefix}.table`}
        app="agenda"
        model="Reservation.Event"
        form={this.buildForm()}
        attributes={this.buildAttributes()}
        indexQueryFunc={this.modifyIndexQuery}
        readEnabled={false}
      />
    );
  },
});
