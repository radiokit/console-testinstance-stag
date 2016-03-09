import React from 'react';
import { Data } from 'radiokit-api';
import IndexTableBrowser from '../../../widgets/admin/crud/index_table_browser_widget.jsx';

export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired,
  },


  modifyIndexQuery: function(query) {
    return query
      .where("references", "deq", "owner", Data.buildRecordGlobalID("auth", "Client.Standalone", this.props.record.get("id")))
      .order("name", "asc")
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
    }
  },


  buildAttributes: function() {
    return {
      name:         { renderer: "string" },
      os_name:      { renderer: "string" },
      direction:    { renderer: "string" },
    }
  },


  render: function() {
    return (
      <IndexTableBrowser contentPrefix={this.props.contentPrefix + ".table"} app="plumber" model="Resource.Architecture.AudioInterface" form={this.buildForm()} attributes={this.buildAttributes()} indexQueryFunc={this.modifyIndexQuery} createEnabled={false} deleteEnabled={false} />
    );
  }
});
