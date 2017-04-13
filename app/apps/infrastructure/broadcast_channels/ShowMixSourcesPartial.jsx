import React from 'react';
import Counterpart from 'counterpart';
import { Data } from 'radiokit-api';
import IndexTableBrowser from '../../../widgets/admin/crud/index_table_browser_widget.jsx';

Counterpart.registerTranslations("en", require('./ShowMixSourcesPartial.locale.en.js'));
Counterpart.registerTranslations("pl", require('./ShowMixSourcesPartial.locale.pl.js'));


export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired,
  },


  modifyIndexQuery(query) {
    return query
      .where("channel_id", "eq", this.props.record.get("id"))
      .order("name", "asc")
  },


  buildForm: function() {
    return {
      name: {
        type: "string",
        hint: true,
      },
      description: {
        type: "string",
      },
      metadata_string: {
        type: "string",
      },
      channel_id: {
        type: "hidden",
        value: this.props.record.get("id"),
      }
    }
  },


  buildAttributes: function() {
    return {
      name:            { renderer: "string" },
      description:     { renderer: "string" },
      metadata_string: { renderer: "string" },      
    }
  },


  render: function() {
    return (
      <IndexTableBrowser
        contentPrefix={this.props.contentPrefix + ".table"}
        app="agenda"
        model="Broadcast.Mix.Source"
        form={this.buildForm()}
        attributes={this.buildAttributes()}
        indexQueryFunc={this.modifyIndexQuery}
        readEnabled={false} />
    );
  }
});
