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


  onTableSelect: function(selectedRecordIds) {
    this.setState({
      selectedRecordIds: selectedRecordIds
    });
  },


  buildRecordsQuery: function() {
    return window.data
      .query("plumber", "Media.Input.Stream.RTP")
      .select("id", "client_node")
      .joins("client_node")
      // .where("references", "deq", "user_account_id", this.context.currentUserAccount.get("id"))
      // .where("references", "deq", "role", "joint")
  },


  buildAttributes: function() {
    return {
      device_name: { renderer: "string", valueFunc: (record, attribute) => { return record.get("client_node").get("name"); } },
      level: { renderer: "peakmeter", props: { model: "Media.Input.Stream.RTP"} },
    }
  },


  render: function() {
    return (
      <Section>
        <GridRow>
          <GridCell size="large" center={true}>
            <Card contentPrefix="apps.infrastructure.transmissions.index">
              <CardHeader/>
              <CardBody cardPadding={false}>
                <TableBrowser onSelect={this.onTableSelect} selectable={true} attributes={this.buildAttributes()} actions={[]} contentPrefix="apps.infrastructure.transmissions.index.table" recordsQuery={this.buildRecordsQuery()}>
                </TableBrowser>
              </CardBody>
            </Card>
          </GridCell>
        </GridRow>
      </Section>
    );
  }
});
