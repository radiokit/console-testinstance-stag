import React from 'react';
import Immutable from 'immutable';

import TableBrowser from '../../../widgets/admin/table_browser_widget.jsx';
import ToolBar from '../../../widgets/admin/toolbar_widget.jsx';
import ToolBarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolBarButton from '../../../widgets/admin/toolbar_button_widget.jsx';
import ToolBarButtonModal from '../../../widgets/admin/toolbar_button_modal_widget.jsx';

import CreateModal from './create_modal.jsx';
import DeleteModal from './delete_modal.jsx';
import UpdateModal from './update_modal.jsx';

export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    indexQueryFunc: React.PropTypes.func,
    app: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
    form: React.PropTypes.object,
    updateForm: React.PropTypes.object,
    attributes: React.PropTypes.object.isRequired,
    readEnabled: React.PropTypes.bool.isRequired,
    createEnabled: React.PropTypes.bool.isRequired,
    createModalElement: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.instanceOf(React.Component)]),
    createModalProps: React.PropTypes.object,
    readEnabled: React.PropTypes.bool.isRequired,
    deleteEnabled: React.PropTypes.bool.isRequired,
    updateEnabled: React.PropTypes.bool.isRequired,
    selectable: React.PropTypes.bool.isRequired,
    createAcknowledgementElement: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.instanceOf(React.Component)]),
  },


  contextTypes: {
    history: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
  },


  getDefaultProps: function() {
    return {
      readEnabled: true,
      createEnabled: true,
      updateEnabled: false, // FIXME add missing locales and change this to true
      deleteEnabled: true,
      selectable: true,
    }
  },


  getInitialState: function() {
    return {
      selectedRecordIds: new Immutable.Seq().toIndexedSeq(),
      selectedRecords: new Immutable.Seq().toIndexedSeq(),
    }
  },


  /**
   * Callback called when user clicked a row in the table.
   */
  onRecordClick: function(record) {
    let currentLocation = this.context.location.pathname.split("/");
    currentLocation.pop();
    let newLocation = currentLocation.join("/") + "/show/" + record.get("id");
    this.context.history.replaceState(null, newLocation);
  },


  /**
   * Callback called when user selected/deselected some records in the table.
   * Just stores list of selected IDs in the state.
   */
  onTableSelect(selectedRecordIds, selectedRecords) {
    this.setState({
      selectedRecordIds: selectedRecordIds,
      selectedRecords: selectedRecords,
    });
  },

  onRefresh() {
    this.refs.tableBrowser.reloadData();
  },


  /**
   * Builds default index query for app/model specified in props.
   *
   * To avoid necessity to manually pass select()ed fields in most cases
   * it will try to determine which fields should be queried. It always add "id".
   # It will also add "references" if it detects "scope-..." renderer.
   * Then it uses `attributes` from props to guess rest of the fields as most
   * probably what we want do show in the table is somehow similar to what
   * should we query from the backend.
   *
   * It will take all keys from `attributes` except:
   * # fields that have `valueFunc` as that in most cases indicates that
   *   they do not have their reprentation in backend's database schema
   *   and their value is computed in runtime,
   * # fields that have "peakmeter" set as renderer as these fields obviously
   *   contain volatile information and have no real backend representation,
   * # fields that have "scope-user-account" or "scope-broadcast-channel" set as
   #   renderer as these fields need access to "references" field.
   * # fields that have "scope-organization-account" or "scope-broadcast-channel" set as
   #   renderer as these fields need access to "references" field.
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

      if(attributeConfig.renderer === "scope-user-account" || attributeConfig.renderer === "scope-organization-account" || attributeConfig.renderer === "scope-broadcast-channel") {
        attributesForSelect.push("references");

      } else if(attributeConfig.hasOwnProperty("attribute") && typeof(attributeConfig.attribute) === "string") {
        attributesForSelect.push(attributeConfig.attribute);

      } else if(typeof(attributeConfig.valueFunc) !== "function" && attributeConfig.renderer !== "peakmeter") {
        attributesForSelect.push(attributeName)
      }
    });
    query = query.select.apply(this, attributesForSelect);

    if(this.props.indexQueryFunc) {
      query = this.props.indexQueryFunc(query);
    }

    return query;
  },


  fillUpdateForm() {
    const form = this.props.form ? this.props.form : this.props.updateForm;

    // Update modal requires only one record
    if(this.state.selectedRecords.count() === 1) {
      const record = this.state.selectedRecords.first();
      Object.keys(form).forEach((key) => {
        form[key].value = record.get(key);
      });
      return form;
    }
    else {
      return form;
    }
  },


  render: function() {
    return (
      <TableBrowser
        ref="tableBrowser"
        onSelect={this.onTableSelect}
        selectable={this.props.selectable}
        attributes={this.props.attributes}
        contentPrefix={`${this.props.contentPrefix}.index.table`}
        recordsQuery={this.buildIndexQuery()}
        requestFullRecords = {this.props.updateEnabled}
        recordsLinkFunc={this.props.readEnabled === true ? this.onRecordClick : undefined}
      >
        <ToolBarGroup>
          {() => {
            if(this.props.createEnabled === true) {
              if(this.props.createModalElement) {
                return <ToolBarButtonModal
                  icon="plus"
                  labelTextKey={`${this.props.contentPrefix}.index.actions.create`}
                  modalElement={this.props.createModalElement}
                  modalProps={this.props.createModalProps}
                />;

              } else {
                return <ToolBarButtonModal
                  icon="plus"
                  labelTextKey={`${this.props.contentPrefix}.index.actions.create`}
                  modalElement={CreateModal}
                  modalProps={
                    {
                      acknowledgementElement: this.props.createAcknowledgementElement,
                      contentPrefix: this.props.contentPrefix + ".index.modals.create",
                      selectedRecordIds: this.state.selectedRecordIds,
                      form: this.props.form,
                      app: this.props.app,
                      model: this.props.model,
                      onDismiss: this.onRefresh,
                    }
                  } />;
              }
            }
          }()}

          {() => {
            if(this.props.updateEnabled === true) {
              return <ToolBarButtonModal
                icon="border-color"
                hintTooltipKey={`${this.props.contentPrefix}.index.actions.update`}
                modalElement={UpdateModal}
                modalProps={
                  {
                    acknowledgementElement: this.props.createAcknowledgementElement,
                    contentPrefix: this.props.contentPrefix + ".index.modals.update",
                    recordId: this.state.selectedRecordIds.first(),
                    form: this.fillUpdateForm(),
                    app: this.props.app,
                    model: this.props.model,
                    onDismiss: this.onRefresh,
                  }
                }
                disabled={this.state.selectedRecordIds.count() !== 1} />;
            }
          }()}

          {() => {
            if(this.props.deleteEnabled === true) {
              return <ToolBarButtonModal
                icon="delete"
                hintTooltipKey={`${this.props.contentPrefix}.index.actions.delete`}
                modalElement={DeleteModal}
                modalProps={
                  {
                    acknowledgementElement: this.props.createAcknowledgementElement,
                    contentPrefix: this.props.contentPrefix + ".index.modals.delete",
                    selectedRecordIds: this.state.selectedRecordIds,
                    form: this.props.form,
                    app: this.props.app,
                    model: this.props.model,
                    onDismiss: this.onRefresh,
                  }
                }
                disabled={this.state.selectedRecordIds.count() === 0} />
            }
          }()}
        </ToolBarGroup>
      </TableBrowser>
    );
  }
});
