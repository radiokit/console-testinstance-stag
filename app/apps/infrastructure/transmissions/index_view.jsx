import React from 'react';

import CRUD from '../../../widgets/admin/crud_widget.jsx';

export default React.createClass({
  modifyIndexQuery: function(query) {
    return query
    .select("client_node")
    .joins("client_node");
  },


  buildAttributes: function() {
    return {
      device_name: { renderer: "string", valueFunc: (record) => { return record.get("client_node").get("name") } },
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
      <CRUD contentPrefix="apps.infrastructure.transmissions" createEnabled={false} deleteEnabled={false} app="plumber" model="Media.Input.Stream.RTP" attributes={this.buildAttributes()} form={this.buildForm()} indexQueryFunc={this.modifyIndexQuery} />
    );
  }
});
