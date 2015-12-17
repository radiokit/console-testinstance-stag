import React from 'react';
import Immutable from 'immutable';
import Counterpart from 'counterpart';

import GridRow from '../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../widgets/admin/section_widget.jsx';
import TableBrowser from '../../widgets/admin/table_browser_widget.jsx';
import Card from '../../widgets/admin/card_widget.jsx';
import CardBody from '../../widgets/admin/card_body_widget.jsx';
import CardHeader from '../../widgets/admin/card_header_widget.jsx';
import ToolBar from '../../widgets/admin/toolbar_widget.jsx';
import ToolBarGroup from '../../widgets/admin/toolbar_group_widget.jsx';
import ToolBarButton from '../../widgets/admin/toolbar_button_widget.jsx';
import CreateModal from './crud_create_modal.jsx';
import DeleteModal from './crud_delete_modal.jsx';

export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    queryFunc: React.PropTypes.func.isRequired,
    attributesFunc: React.PropTypes.func.isRequired,
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
    return this.props.queryFunc(window.data);
  },


  buildAttributes: function() {
    return this.props.attributesFunc();
  },


  render: function() {
    return (
      <Section>
        <GridRow>
          <GridCell size="large" center={true}>
            <CreateModal contentPrefix={this.props.contentPrefix + ".index.modals.create"} ref="createModal" />
            <DeleteModal contentPrefix={this.props.contentPrefix + ".index.modals.delete"} ref="deleteModal" selectedRecordIds={this.state.selectedRecordIds} />

            <Card contentPrefix={`${this.props.contentPrefix}.index`}>
              <CardHeader/>
              <CardBody cardPadding={false}>
                <TableBrowser onSelect={this.onTableSelect} selectable={true} attributes={this.buildAttributes()} actions={[]} contentPrefix={`${this.props.contentPrefix}.index.table`} recordsQuery={this.buildRecordsQuery()}>
                  <ToolBarGroup>
                    <ToolBarButton icon="plus" labelTextKey={`${this.props.contentPrefix}.index.actions.create`} onClick={this.onCreateButtonClick} />
                    <ToolBarButton icon="delete" hintTooltipKey={`${this.props.contentPrefix}.index.actions.delete`} onClick={this.onDeleteButtonClick} disabled={this.state.selectedRecordIds.count() === 0} />
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
