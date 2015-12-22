import React from 'react';

import Index from '../../../widgets/admin/crud/index_widget.jsx';

export default React.createClass({
  modifyIndexQuery: function(query) {
    return query
      .joins("listen_ports")
      .joins("media_input_stream_http")
      .joins("media_input_stream_rtp")
      .joins("media_server_rtsp")
      .joins("media_output_stream_icecast2")
      .joins("media_routing_mix_group")
      .joins("media_routing_link")
      .select("listen_ports")
      .select("media_input_stream_http")
      .select("media_input_stream_rtp")
      .select("media_server_rtsp")
      .select("media_output_stream_icecast2")
      .select("media_routing_mix_group")
      .select("media_routing_link")
      .where("references", "deq", "role", "infrastructure")
      .order("hostname", "asc");
  },


  buildAttributes: function() {
    return {
      hostname:                     { renderer: "string" },
      provider:                     { renderer: "string" },
      physical_location_country:    { renderer: "string" },
      tcp_ports:                    { renderer: "string", valueFunc: (record) => {
        let utilised = record.get("listen_ports").count((listenPort) => { return listenPort.get("protocol") === "tcp"; });
        let total = new Immutable.Range(record.get("listen_port_tcp_min"), record.get("listen_port_tcp_max")).count();
        return `${utilised} / ${total}`;
      } },
      udp_ports:                    { renderer: "string", valueFunc: (record) => {
        let utilised = record.get("listen_ports").count((listenPort) => { return listenPort.get("protocol") === "udp"; });
        let total = new Immutable.Range(record.get("listen_port_udp_min"), record.get("listen_port_udp_max")).count();
        return `${utilised} / ${total}`;
      } },
      media_input_stream_rtp:       { renderer: "counter" },
      media_input_stream_http:      { renderer: "counter" },
      media_server_rtsp:            { renderer: "counter" },
      media_output_stream_icecast2: { renderer: "counter" },
      media_routing_mix_group:      { renderer: "counter" },
      media_routing_link:           { renderer: "counter" },
    }
  },


  buildForm: function() {
    return {
      hostname: {
        type: "string",
        hint: true,
        validators: {
          presence: true,
        }
      },

      provider: {
        type: "string",
      },

      listen_port_tcp_min: {
        type: "number",
        validators: {
          presence: true,
        }
      },

      listen_port_tcp_max: {
        type: "number",
        validators: {
          presence: true,
        }
      },

      listen_port_udp_min: {
        type: "number",
        validators: {
          presence: true,
        }
      },

      listen_port_udp_max: {
        type: "number",
        validators: {
          presence: true,
        }
      },
    }
  },


  render: function() {
    return (
      <Index contentPrefix="apps.infrastructure.computing_nodes" app="plumber" model="Resource.Architecture.ComputingNode" attributes={this.buildAttributes()} form={this.buildForm()} indexQueryFunc={this.modifyIndexQuery} />
    );
  }
});
