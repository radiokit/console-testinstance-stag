import React from 'react';

import Index from '../../../widgets/admin/crud/index_widget.jsx';

export default React.createClass({
  modifyIndexQuery: function(query) {
    return query
      .where("references", "deq", "role", "infrastructure")
      .order("name", "asc")
  },


  buildAttributes: function() {
    return {
      name: { renderer: "string" },
      os_type: { renderer: "string", valueFunc: (record, attribute) => {
        if(record.get("os_type")) {
          let osTypeHuman = Counterpart.translate(`apps.infrastructure.client_nodes.index.table.cells.os_type.${record.get("os_type")}`);

          if(record.get("os_version"))
            return `${osTypeHuman} ${record.get("os_version")}`;
          else {
            return osTypeHuman;
          }
        }
      } },
      app_version: { renderer: "string" },
      cpu_load: { renderer: "percent" },
      memory_usage: { renderer: "percent" },
      network_type: { renderer: "string", valueFunc: (record) => {
        if(record.get("current_network_interface_type")) {
          let networkTypeHuman = Counterpart.translate(`apps.infrastructure.client_nodes.index.table.cells.network_type.${record.get("current_network_interface_type")}`)

          switch(record.get("current_network_interface_type")) {
            case "mobile":
              let generation;

              switch(record.get("current_network_mobile_type")) {
                case "gprs":
                case "edge":
                  generation = "2G"; break;
                case "umts":
                case "hsdpa":
                case "hsupa":
                case "hspa":
                case "cdma":
                case "evdo0":
                case "evdoa":
                case "evdob":
                case "1xrtt":
                  generation = "3G"; break;

                case "lte":
                case "ehrpd":
                case "iden":
                case "hspap":
                  generation = "4G"; break;

                default:
                  generation = "?G"; break;
              }

              return `${networkTypeHuman} (${generation})`;

            default:
              return networkTypeHuman;
          }
        }
      } },
      network_strength: { renderer: "percent" },
      // power_battery_charging_state: { renderer: "string" },
      // power_battery_charging_type: { renderer: "string" },
      // power_battery_level: { renderer: "string" },
      // power_battery_health: { renderer: "string" },
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
      <Index contentPrefix="apps.infrastructure.client_nodes" app="plumber" model="Resource.Architecture.ClientNode" attributes={this.buildAttributes()} form={this.buildForm()} indexQueryFunc={this.modifyIndexQuery} />
    );
  }
});
