import React from 'react';

import Index from '../../../widgets/admin/crud/index_widget.jsx';

export default React.createClass({
  modifyIndexQuery: function(query) {
    return query
    .select("audio_interface", "client_node")
    .joins("audio_interface")
    .joins("client_node");
  },


  buildAttributes: function() {
    return {
      device_name: { renderer: "string", valueFunc: (record) => {
        if(record.has("client_node")) {
          return record.get("client_node").get("name") }
        }
      },
      audio_interface_name: { renderer: "string", valueFunc: (record) => {
        if(record.has("audio_interface")) {
          return record.get("audio_interface").get("name") }
        }
      },
      level: { renderer: "peakmeter", props: { model: "Media.Input.Stream.RTP"} },
    }
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


  render: function() {
    return (
      <Index contentPrefix="apps.infrastructure.transmissions" createEnabled={false} deleteEnabled={false} app="plumber" model="Media.Input.Stream.RTP" attributes={this.buildAttributes()} form={this.buildForm()} indexQueryFunc={this.modifyIndexQuery} />
    );
  }
});
