import React from 'react';
import Immutable from 'immutable';

import TableBrowser from '../../../widgets/admin/table_browser_widget.jsx';
import ToolbarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolbarButton from '../../../widgets/admin/toolbar_button_widget.jsx';
import ToolbarButtonModal from '../../../widgets/admin/toolbar_button_modal_widget.jsx';

import UploadModal from './show_content_upload_modal.jsx';
import MetadataModal from './show_content_metadata_modal.jsx';
import TagModal from './show_content_tag_modal.jsx';

export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    app: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
    stage: React.PropTypes.oneOf(['incoming', 'ready', 'archive', 'trash']).isRequired,
  },


  getInitialState: function() {
    return {
      selectedRecordIds: new Immutable.Seq().toIndexedSeq(),
    };
  },


  onTableSelect: function(selectedRecordIds) {
    this.setState({
      selectedRecordIds: selectedRecordIds
    });
  },



  buildTableAttributes: function() {
    let attributes = {
      name: { renderer: "string" },
    };

    return this.props.record.get("metadata_schemas").reduce((acc, metadataSchema) => {
      acc[metadataSchema.get("key")] = {
        renderer: metadataSchema.get("kind"),
        // headerText: metadataSchema.get("name"),
        valueFunc: (record, attribute) => {
          let metadataItem = record.get("metadata_items").find((metadataItem) => { return metadataItem.get("metadata_schema_id") === metadataSchema.get("id") })

          if(metadataItem) {
            return metadataItem.get("value_" + metadataSchema.get("kind"));
          }
        }
      };
      return acc;

    }, attributes);
  },


  buildTableRecordsQuery: function() {
    return window.data
      .query("vault", "Data.Record.File")
      .select("id", "name", "metadata_items", "tag_items")
      .joins("metadata_items")
      .joins("tag_items")
      .where("stage", "eq", this.props.stage)
      .where("record_repository_id", "eq", this.props.record.get("id"));
  },


  render: function() {
    return (
      <TableBrowser onSelect={this.onTableSelect} selectable={true} attributes={this.buildTableAttributes()} contentPrefix="widgets.vault.file_browser.table" recordsQuery={this.buildTableRecordsQuery()}>
        <ToolbarGroup>
          {() => {
            if(this.props.stage === "incoming") {
              return (<ToolbarButtonModal icon="upload" labelTextKey={this.props.contentPrefix + ".actions.upload"} modalElement={UploadModal} modalProps={{repository: this.props.record }} />);
            }
          }()}
          <ToolbarButton icon="download" disabled={this.state.selectedRecordIds.count() === 0} onClick={this.onDownloadClick}/>
          <ToolbarButton icon="delete" disabled={this.state.selectedRecordIds.count() === 0} onClick={this.onDeleteClick}/>
        </ToolbarGroup>

        {() => {
          if(this.props.record.get("tag_categories").count() !== 0) {
            return (
              <ToolbarGroup>
                <ToolbarButtonModal icon="folder" labelTextKey={this.props.contentPrefix + ".actions.tags"} disabled={this.state.selectedRecordIds.count() === 0} modalElement={TagModal} modalProps={{ selectedRecordIds: this.state.selectedRecordIds, tagCategories: this.props.record.get("tag_categories") }} />
              </ToolbarGroup>
            );
          }
        }()}

        {() => {
          if(this.props.record.get("metadata_schemas").count() !== 0) {
            return (
              <ToolbarGroup>
                <ToolbarButtonModal icon="barcode" labelTextKey="widgets.vault.file_browser.modals.metadata.header" disabled={this.state.selectedRecordIds.count() === 0} modalElement={MetadataModal} modalProps={{ selectedRecordIds: this.state.selectedRecordIds, metadataSchemas: this.props.record.get("metadata_schemas") }} />
              </ToolbarGroup>
            );
          }
        }()}

      </TableBrowser>
    );
  }
});
