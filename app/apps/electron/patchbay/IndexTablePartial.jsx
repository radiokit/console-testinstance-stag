import React from "react";
import Counterpart from "counterpart";

import IndexTableBrowser from '../../../widgets/admin/crud/index_table_browser_widget.jsx';

Counterpart.registerTranslations("en", require('./IndexTablePartial.locale.en.js'));
Counterpart.registerTranslations("pl", require('./IndexTablePartial.locale.pl.js'));

export default React.createClass({
  contextTypes: {
    currentUserAccount: React.PropTypes.object.isRequired,
  },


  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
  },


  modifyIndexQuery: function(query) {
    return query
      .select("source_audio_interface", "destination_audio_interface")
      .joins("source_audio_interface")
      .joins("destination_audio_interface")
      // .where("references", "deq", "owner", Data.buildRecordGlobalID("auth", "Client.Standalone", this.props.record.get("id")))
      // .order("name", "asc")
  },


  buildForm: function() {
    return {
    }
  },


  buildAttributes: function() {
    return {
      source_audio_interface: { renderer: "string", valueFunc: (record, attribute) => {
        return record.get(attribute) != null && record.get(attribute).get("name"); }
      },
      destination_audio_interface: { renderer: "string", valueFunc: (record, attribute) => { return
        record.get(attribute) != null && record.get(attribute).get("name"); }
      },
    }
  },

  render: function() {
    return (
      <IndexTableBrowser
        contentPrefix={this.props.contentPrefix}
        app="plumber" model="Config.Routing.LinkRule"
        form={this.buildForm()}
        attributes={this.buildAttributes()}
        indexQueryFunc={this.modifyIndexQuery}
        readEnabled={false}
        createEnabled={true}
        deleteEnabled={true}
        selectable={true} />
    );
  }
});
