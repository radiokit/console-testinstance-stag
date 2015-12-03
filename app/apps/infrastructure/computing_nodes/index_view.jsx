import React from 'react';
import Immutable from 'immutable';

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
      .query("plumber", "Resource.Architecture.ComputingNode")
      .select("id", "hostname", "listen_port_tcp_min", "listen_port_tcp_max", "listen_port_udp_min", "listen_port_udp_max", "provider", "physical_location_country", "listen_ports", "media_input_stream_http", "media_input_stream_rtp", "media_server_rtsp", "media_output_stream_icecast2", "media_routing_mix_group", "media_routing_link")
      .joins("listen_ports")
      .joins("media_input_stream_http")
      .joins("media_input_stream_rtp")
      .joins("media_server_rtsp")
      .joins("media_output_stream_icecast2")
      .joins("media_routing_mix_group")
      .joins("media_routing_link")
      .where("references", "deq", "role", "infrastructure");
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


  render: function() {
    return (
      <Section>
        <GridRow>
          <GridCell size="large" center={true}>
            <CreateModal ref="createModal" />
            <DeleteModal ref="deleteModal" selectedRecordIds={this.state.selectedRecordIds} />

            <Card contentPrefix="apps.infrastructure.computing_nodes.index">
              <CardHeader/>
              <CardBody cardPadding={false}>
                <TableBrowser onSelect={this.onTableSelect} selectable={true} attributes={this.buildAttributes()} actions={[]} contentPrefix="apps.infrastructure.computing_nodes.index.table" recordsQuery={this.buildRecordsQuery()}>
                  <ToolBarGroup>
                    <ToolBarButton icon="plus" labelTextKey="apps.infrastructure.computing_nodes.index.actions.create" onClick={this.onCreateButtonClick} />
                    <ToolBarButton icon="delete" hintTooltipKey="apps.infrastructure.computing_nodes.index.actions.delete" onClick={this.onDeleteButtonClick} disabled={this.state.selectedRecordIds.count() === 0} />
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
