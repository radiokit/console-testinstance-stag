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
import CRUDCreateModal from './crud_create_modal.jsx';
import CRUDDeleteModal from './crud_delete_modal.jsx';

export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    indexQueryFunc: React.PropTypes.func,
    app: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
    form: React.PropTypes.object.isRequired,
    attributes: React.PropTypes.object.isRequired,
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


  buildIndexQuery: function() {
    let query = window.data.query(this.props.app, this.props.model);
    query = query.select.apply(this, Object.keys(this.props.attributes));

    if(this.props.indexQueryFunc) {
      query = this.props.indexQueryFunc(query);
    }

    return query;
  },


  render: function() {
    return (
      <Section>
        <GridRow>
          <GridCell size="large" center={true}>
            <CRUDCreateModal contentPrefix={this.props.contentPrefix + ".index.modals.create"} ref="createModal" form={this.props.form} app={this.props.app} model={this.props.model} />
            <CRUDDeleteModal contentPrefix={this.props.contentPrefix + ".index.modals.delete"} ref="deleteModal" app={this.props.app} model={this.props.model} selectedRecordIds={this.state.selectedRecordIds} />

            <Card contentPrefix={`${this.props.contentPrefix}.index`}>
              <CardHeader/>
              <CardBody cardPadding={false}>
                <TableBrowser onSelect={this.onTableSelect} selectable={true} attributes={this.props.attributes} actions={[]} contentPrefix={`${this.props.contentPrefix}.index.table`} recordsQuery={this.buildIndexQuery()}>
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
