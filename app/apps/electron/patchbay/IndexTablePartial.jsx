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
      .joins("source_audio_interface")
      .joins("destination_audio_interface")
      // .where("references", "deq", "owner", Data.buildRecordGlobalID("auth", "Client.Standalone", this.props.record.get("id")))
      // .order("name", "asc")
  },


  buildForm: function() {
    return {
      source_audio_interface_id: {
        type: "query",
        appName: "plumber",
        model: "Resource.Architecture.AudioInterface",
        modifyQueryFunc: (query) => { return query.where("direction", "eq", "capture"); }, // TODO add scope limitation
        validators: {
          presence: true,
        }
      },
      destination_audio_interface_id: {
        type: "query",
        appName: "plumber",
        model: "Resource.Architecture.AudioInterface",
        modifyQueryFunc: (query) => { return query.where("direction", "eq", "playback"); }, // TODO add scope limitation
        validators: {
          presence: true,
        }
      },
    }
  },


  buildFullAudioInterfaceName: function(linkRuleRecord, attribute, callback) {
    if(linkRuleRecord.get(attribute)) {
      let clientRecord = window.data.fromGlobalID(linkRuleRecord.get(attribute).get("references").get("owner"))

      window.data.query(clientRecord.options.appName, clientRecord.options.model)
        .select("name")
        .where("id", "eq", clientRecord.options.recordId)
        .on("fetch", (_event, _query, clientStandaloneRecord) => {
          callback(`${clientStandaloneRecord.first().get("name")} - ${linkRuleRecord.get(attribute).get("name")}`)
        })
        .fetch();
    }
  },


  buildAttributes: function() {
    return {
      source_audio_interface:      { renderer: "lambda", props: { lambda: this.buildFullAudioInterfaceName } },
      destination_audio_interface: { renderer: "lambda", props: { lambda: this.buildFullAudioInterfaceName } },
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
