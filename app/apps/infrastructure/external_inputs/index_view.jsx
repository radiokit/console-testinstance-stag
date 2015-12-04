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
      .query("plumber", "Media.Input.Stream.HTTP")
      .select("id", "location")
      .where("references", "deq", "user_account_id", this.context.currentUserAccount.get("id"))
      .where("references", "deq", "role", "infrastructure")
      .order("location", "asc")
  },


  buildAttributes: function() {
    return {
      location: { renderer: "string" },
      level: { renderer: "peakmeter", props: { model: "Media.Input.Stream.HTTP"} },
    }
  },


  render: function() {
    return (
      <Section>
        <GridRow>
          <GridCell size="large" center={true}>
            <CreateModal ref="createModal" />
            <DeleteModal ref="deleteModal" selectedRecordIds={this.state.selectedRecordIds} />

            <Card contentPrefix="apps.infrastructure.external_inputs.index">
              <CardHeader/>
              <CardBody cardPadding={false}>
                <TableBrowser onSelect={this.onTableSelect} selectable={true} attributes={this.buildAttributes()} actions={[]} contentPrefix="apps.infrastructure.external_inputs.index.table" recordsQuery={this.buildRecordsQuery()}>
                  <ToolBarGroup>
                    <ToolBarButton icon="plus" labelTextKey="apps.infrastructure.external_inputs.index.actions.create" onClick={this.onCreateButtonClick} />
                    <ToolBarButton icon="delete" hintTooltipKey="apps.infrastructure.external_inputs.index.actions.delete" onClick={this.onDeleteButtonClick} disabled={this.state.selectedRecordIds.count() === 0} />
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
