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
      .query("auth", "User.Account")
      .select("id", "name_custom")
      .order("name_custom", "asc")
  },


  buildAttributes: function() {
    return {
      name_custom: { renderer: "string" },
    }
  },


  render: function() {
    return (
      <Section>
        <GridRow>
          <GridCell size="large" center={true}>
            <CreateModal ref="createModal" />
            <DeleteModal ref="deleteModal" selectedRecordIds={this.state.selectedRecordIds} />

            <Card contentPrefix="apps.organization.user_accounts.index">
              <CardHeader/>
              <CardBody cardPadding={false}>
                <TableBrowser onSelect={this.onTableSelect} selectable={true} attributes={this.buildAttributes()} actions={[]} contentPrefix="apps.organization.user_accounts.index.table" recordsQuery={this.buildRecordsQuery()}>
                  <ToolBarGroup>
                    <ToolBarButton icon="plus" labelTextKey="apps.organization.user_accounts.index.actions.create" onClick={this.onCreateButtonClick} />
                    <ToolBarButton icon="delete" hintTooltipKey="apps.organization.user_accounts.index.actions.delete" onClick={this.onDeleteButtonClick} disabled={this.state.selectedRecordIds.count() === 0} />
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
