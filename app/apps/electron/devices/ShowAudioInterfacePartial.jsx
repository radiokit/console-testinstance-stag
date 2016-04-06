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
      name:                 { renderer: "string" },
      os_name:              { renderer: "string" },
      direction:            { renderer: "string" },
      transmission_enabled: { renderer: "toggle",
                              attribute: "extra",
                              valueFunc: (record, attribute) => {
                                if(!record.has("extra")) return false;
                                if(record.get("extra") === null) return false;
                                if(!record.get("extra").has("electron")) return false;
                                if(record.get("extra").get("electron") === null) return false;
                                if(!record.get("extra").get("electron").has("transmission_enabled")) return false;
                                if(typeof(record.get("extra").get("electron").get("transmission_enabled")) !== "boolean") return false;
                                return record.get("extra").get("electron").get("transmission_enabled");
                              },
                              props: {
                                toggleFunc: (record, attribute, value) => {
                                  window.data
                                    .record("plumber", "Resource.Architecture.AudioInterface", record.get("id"))
                                    .update({ extra: { electron: { transmission_enabled: !value } } });
                                }
                              }
                            },
    }
  },


  render: function() {
    return (
      <IndexTableBrowser contentPrefix={this.props.contentPrefix + ".table"} app="plumber" model="Resource.Architecture.AudioInterface" form={this.buildForm()} attributes={this.buildAttributes()} indexQueryFunc={this.modifyIndexQuery} readEnabled={false} createEnabled={false} deleteEnabled={false} selectable={false} />
    );
  }
});
