import React from 'react';
import Immutable from 'immutable';
import Counterpart from 'counterpart';

import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import TableBrowser from '../../../widgets/admin/table_browser_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';
import CardBody from '../../../widgets/admin/card_body_widget.jsx';
import CardHeader from '../../../widgets/admin/card_header_widget.jsx';
import ToolBar from '../../../widgets/admin/toolbar_widget.jsx';
import ToolBarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolBarButton from '../../../widgets/admin/toolbar_button_widget.jsx';
import DataQuery from '../../../widgets/api/data_query_widget.jsx';
import CreateModal from './create_modal.jsx';
import DeleteModal from './delete_modal.jsx';

import RoutingHelper from '../../../helpers/routing_helper.js';

export default React.createClass({
  contextTypes: {
    currentUserAccount: React.PropTypes.object.isRequired,
  },


  getInitialState: function() {
    return {
      selectedRecordIds: new Immutable.Seq().toIndexedSeq(),
    }
  },


  onCreateButtonClick: function(e) {
    e.preventDefault();
    this.refs.createModal.show();
  },


  onDeleteButtonClick: function(e) {
    e.preventDefault();
    this.refs.deleteModal.show();
  },


  onTableSelect: function(selectedRecordIds) {
    this.setState({
      selectedRecordIds: selectedRecordIds
    });
  },


  buildRecordsQuery: function() {
    return window.data
      .query("plumber", "Resource.Architecture.ClientNode")
      .select("id", "name", "os_type", "os_version", "app_version", "cpu_load", "memory_usage", "current_network_interface_type", "current_network_mobile_type", "network_strength", "power_battery_charging_state", "power_battery_charging_type", "power_battery_level", "power_battery_health")
      .where("references", "deq", "user_account_id", this.context.currentUserAccount.get("id"))
      .where("references", "deq", "role", "infrastructure");
  },

  // |> validate_inclusion(:current_network_interface_type, ~w(bluetooth dummy ethernet mobile vpn wifi wimax unknown))
  // |> validate_inclusion(:current_network_mobile_type, ~w(1xrtt cdma edge ehrpd evdo0 evdoa evdob gprs hsdpa hspa hspap hsupa iden lte umts unknown))
  // |> validate_inclusion(:power_battery_charging_state, ~w(charging discharging full notcharging unknown))
  // |> validate_inclusion(:power_battery_charging_type, ~w(ac usb wireless unknown))
  // |> validate_inclusion(:power_battery_health, ~w(cold dead good overheat overvoltage failure unknown))
  // |> validate_number(:power_battery_level, greater_than_or_equal_to: 0, less_than_or_equal_to: 100)


  buildAttributes: function() {
    return {
      name: { renderer: "string" },
      os_type: { renderer: "string", valueFunc: (record, attribute) => {
        let osTypeHuman = Counterpart.translate(`apps.infrastructure.client_nodes.index.table.cells.os_type.${record.get("os_type")}`);

        if(record.get("os_version"))
          return `${osTypeHuman} ${record.get("os_version")}`;
        else {
          return osTypeHuman;
        }
      } },
      app_version: { renderer: "string" },
      cpu_load: { renderer: "percent" },
      memory_usage: { renderer: "percent" },
      network_type: { renderer: "string", valueFunc: (record) => {
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
      } },
      network_strength: { renderer: "percent" },
      // power_battery_charging_state: { renderer: "string" },
      // power_battery_charging_type: { renderer: "string" },
      // power_battery_level: { renderer: "string" },
      // power_battery_health: { renderer: "string" },
    }
  },


  render: function() {
    return (
      <Section>
        <GridRow>
          <GridCell size="large" center={true}>
            <CreateModal ref="createModal" />
            <DeleteModal ref="deleteModal" selectedRecordIds={this.state.selectedRecordIds} />

            <Card contentPrefix="apps.infrastructure.client_nodes.index">
              <CardHeader/>
              <CardBody cardPadding={false}>
                <TableBrowser onSelect={this.onTableSelect} selectable={true} attributes={this.buildAttributes()} actions={[]} contentPrefix="apps.infrastructure.client_nodes.index.table" recordsQuery={this.buildRecordsQuery()}>
                  <ToolBarGroup>
                    <ToolBarButton icon="plus" labelTextKey="apps.infrastructure.client_nodes.index.actions.create" onClick={this.onCreateButtonClick} />
                    <ToolBarButton icon="delete" hintTooltipKey="apps.infrastructure.client_nodes.index.actions.delete" onClick={this.onDeleteButtonClick} disabled={this.state.selectedRecordIds.count() === 0} />
                  </ToolBarGroup>
                </TableBrowser>
              </CardBody>
            </Card>
          </GridCell>
        </GridRow>
      </Section>
    );
  }
});
