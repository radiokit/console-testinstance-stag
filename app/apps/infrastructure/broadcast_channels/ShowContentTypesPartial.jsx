import React from 'react';
import Counterpart from 'counterpart';
import { Data } from 'radiokit-api';
import IndexTableBrowser from '../../../widgets/admin/crud/index_table_browser_widget.jsx';

Counterpart.registerTranslations("en", require('./ShowContentTypesPartial.locale.en.js'));
Counterpart.registerTranslations("pl", require('./ShowContentTypesPartial.locale.pl.js'));


export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired,
  },


  modifyIndexQuery(query) {
    return query
      .where("broadcast_channel_id", "eq", this.props.record.get("id"))
      .order("name", "asc")
  },


  buildForm: function() {
    return {
      name: {
        type: "string",
        validators: {
          presence: true,
        },
      },
      broadcast_channel_id: {
        type: "hidden",
        value: this.props.record.get("id"),
      }
    }
  },


  buildAttributes: function() {
    return {
      name:          { renderer: "string" },
    }
  },


  render: function() {
    return (
      <IndexTableBrowser
        contentPrefix={this.props.contentPrefix + ".table"}
        app="agenda"
        model="Broadcast.ContentType"
        form={this.buildForm()}
        attributes={this.buildAttributes()}
        indexQueryFunc={this.modifyIndexQuery}
        readEnabled={false} />
    );
  }
});
