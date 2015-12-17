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
    createEnabled: React.PropTypes.bool.isRequired,
    deleteEnabled: React.PropTypes.bool.isRequired,
  },


  getDefaultProps: function() {
    return {
      createEnabled: true,
      deleteEnabled: true,
    }
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


  /**
   * Callback called when user selected/deselected some records in the table.
   * Just stores list of selected IDs in the state.
   */
  onTableSelect: function(selectedRecordIds) {
    this.setState({
      selectedRecordIds: selectedRecordIds
    });
  },


  /**
   * Builds default index query for app/model specified in props.
   *
   * To avoid necessity to manually pass select()ed fields in most cases
   * it will try to determine which fields should be queried. It always add "id".
   * Then it uses `attributes` from props to guess rest of the fields as most
   * probably what we want do show in the table is somehow similar to what
   * should we query from the backend.
   *
   * It will take all keys from `attributes` except:
   * # fields that have `valueFunc` as that in most cases indicates that
   *   they do not have their reprentation in backend's database schema
   *   and their value is computed in runtime.
   * # fields that have "peakmeter" set as renderer as these fields obviously
   *   contain volatile information and have no real backend representation.
   *
   * After all it calls `indexQueryFunc` passed to props (if it was defined).
   * It passes generic query mentioned before as the only argument and expects
   * that query will be returned. That gives chance to parent component to modify
   * query before it is passed further.
   */
  buildIndexQuery: function() {
    let query = window.data.query(this.props.app, this.props.model);
    let attributesForSelect = ["id"];
    Object.keys(this.props.attributes).map((attributeName) => {
      let attributeConfig = this.props.attributes[attributeName];

      if(typeof(attributeConfig.valueFunc) !== "function" && attributeConfig.renderer !== "peakmeter") {
        attributesForSelect.push(attributeName)
      }
    });
    query = query.select.apply(this, attributesForSelect);

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
            {() => {
              if(this.props.createEnabled === true) {
                return <CRUDCreateModal contentPrefix={this.props.contentPrefix + ".index.modals.create"} ref="createModal" form={this.props.form} app={this.props.app} model={this.props.model} />
              }
            }}
            {() => {
              if(this.props.deleteEnabled === true) {
                return <CRUDDeleteModal contentPrefix={this.props.contentPrefix + ".index.modals.delete"} ref="deleteModal" app={this.props.app} model={this.props.model} selectedRecordIds={this.state.selectedRecordIds} />
              }
            }}

            <Card contentPrefix={`${this.props.contentPrefix}.index`}>
              <CardHeader/>
              <CardBody cardPadding={false}>
                <TableBrowser onSelect={this.onTableSelect} selectable={true} attributes={this.props.attributes} actions={[]} contentPrefix={`${this.props.contentPrefix}.index.table`} recordsQuery={this.buildIndexQuery()}>
                  <ToolBarGroup>
                    {() => {
                      if(this.props.createEnabled === true) {
                        return <ToolBarButton icon="plus" labelTextKey={`${this.props.contentPrefix}.index.actions.create`} onClick={this.onCreateButtonClick} />;
                      }
                    }}
                    {() => {
                      if(this.props.deleteEnabled === true) {
                        return <ToolBarButton icon="delete" hintTooltipKey={`${this.props.contentPrefix}.index.actions.delete`} onClick={this.onDeleteButtonClick} disabled={this.state.selectedRecordIds.count() === 0} />
                      }
                    }}
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
