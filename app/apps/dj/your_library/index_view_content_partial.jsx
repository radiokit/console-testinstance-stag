import React, { PropTypes } from 'react';
import { Seq } from 'immutable';
import multiDownload from 'multi-download';

import RadioKit from '../../../services/RadioKit';
import DeleteModal from '../../../widgets/admin/crud/delete_modal.jsx';
import ToolbarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolbarButton from '../../../widgets/admin/toolbar_button_widget.jsx';
import ToolbarButtonModal from '../../../widgets/admin/toolbar_button_modal_widget.jsx';
import TableBrowser from '../../../widgets/admin/table_browser_widget.jsx';
import MetadataModal from './index_content_metadata_modal.jsx';
import UploadModal from './index_content_upload_modal.jsx';

const DJLibraryIndexContent = React.createClass({
  propTypes: {
    app: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    contextPrefix: PropTypes.string.isRequired,
    stage: PropTypes.oneOf(['incoming', 'current', 'archive', 'trash']).isRequired,
    record: PropTypes.object.isRequired,
    tagItemId: PropTypes.string.isRequired,
  },

  getInitialState() {
    return {
      selectedRecordIds: Seq().toIndexedSeq(),
      selectedRecords: Seq().toIndexedSeq(),
    };
  },

  onTableSelect(selectedRecordIds, selectedRecords) {
    this.setState({
      selectedRecordIds,
      selectedRecords,
    });
  },

  onDownloadError() {
    // TODO
  },

  onDownloadSuccess(_event, _query, data) {
    multiDownload(data.map(record => record.get('private_download_url')).toJS());
  },

  onDownloadClick() {
    this.state.selectedRecordIds.count() > 0 && RadioKit
      .query('vault', 'Data.Record.File')
      .select('private_download_url')
      .where('id', 'in', this.state.selectedRecordIds.toJS())
      .on('error', this.onDownloadError)
      .on('fetch', this.onDownloadSuccess)
      .fetch();
  },

  onDeleteClick() {
    if (this.props.stage === 'trash') {
      this.refs.deleteModal.show();
    } else {
      this.moveFiles('trash');
    }
  },

  getFilteredMetadataSchemas() {
    return this.props.record.get('metadata_schemas')
      .filter(this.shouldShowMetadata);
  },

  moveFiles(newStage) {
    const patch = { stage: newStage };

    if (this.props.stage === 'trash') {
      patch.destroy_at = null;
    }

    if (newStage === 'trash') {
      patch.destroy_in = 1000 * 60 * 60 * 24 * 30;
    }

    this.setState({ stageMovingIndex: this.state.selectedRecordIds.count() - 1 });

    this.state.selectedRecordIds.forEach((recordId) => {
      RadioKit
        .record('vault', 'Data.Record.File', recordId)
        .on('loaded', () => {
          if (this.state.stageMovingIndex === 0) {
            this.reloadTable();
          } else {
            this.setState({
              stageMovingIndex: this.state.stageMovingIndex - 1,
            });
          }
        })
        .update(patch);
    });
  },

  isMetadataSchemaSortable(metadataSchema) {
    const kind = metadataSchema.get('kind');

    return (
      kind === 'string' ||
      kind === 'db' ||
      kind === 'integer' ||
      kind === 'text' ||
      kind === 'float' ||
      kind === 'date' ||
      kind === 'time' ||
      kind === 'datetime' ||
      kind === 'url' ||
      kind === 'duration'
    );
  },

  shouldShowMetadata(schema) {
    const key = schema.get('key');

    return schema.get('tag_category_id') === null &&
      (key !== 'artist') &&
      (key !== 'duration');
  },

  buildMetadataAttribute(acc, metadataSchema) {
    // eslint-disable-next-line no-param-reassign
    acc[metadataSchema.get('key')] = {
      renderer: metadataSchema.get('kind'),
      headerText: metadataSchema.get('name'),
      sortable: this.isMetadataSchemaSortable(metadataSchema),
      sortableFunc: (query, attribute, direction) => query.scope(
        'sorted_by_metadata',
        metadataSchema.get('key'),
        metadataSchema.get('kind'),
        direction,
      ),
      valueFunc: (record) => {
        const foundMetadataItem = record.get('metadata_items').find(metadataItem =>
          metadataItem.get('metadata_schema_id') === metadataSchema.get('id')
        );

        if (foundMetadataItem) {
          return foundMetadataItem.get(`value_${metadataSchema.get('kind')}`);
        }

        return null;
      },
    };

    return acc;
  },

  buildTableAttributes() {
    const attributes = {
      name: { renderer: 'string', sortable: true },
      play: { renderer: 'play', sortable: false, valueFunc: this.getFilteredMetadataSchemas },
      inserted_at: { renderer: 'datetime', sortable: true },
    };

    return this.getFilteredMetadataSchemas().reduce(this.buildMetadataAttribute, attributes);
  },

  buildTableRecordsQuery() {
    return RadioKit
      .query('vault', 'Data.Record.File')
      .select(
        'id',
        'name',
        'inserted_at',
        'metadata_items.id',
        'metadata_items.value_string',
        'metadata_items.value_db',
        'metadata_items.value_url',
        'metadata_items.value_text',
        'metadata_items.value_float',
        'metadata_items.value_integer',
        'metadata_items.value_duration',
        'metadata_items.value_date',
        'metadata_items.value_datetime',
        'metadata_items.value_time',
        'metadata_items.value_file',
        'metadata_items.value_image',
        'metadata_items.metadata_schema_id',
        'stage'
      )
      .joins('metadata_items')
      .where('stage', 'eq', this.props.stage)
      .where('record_repository_id', 'eq', this.props.record.get('id'))
      .where('tag_associations.tag_item_id', 'eq', this.props.tagItemId);
  },

  reloadTable() {
    // FIXME refs are pure evil
    this.refs.tableBrowser.reloadData();
  },

  renderMoveToButton(toStage) {
    return (
      <ToolbarButton
        icon="folder-move"
        labelTextKey={`${this.props.contextPrefix}.actions.move_to.${toStage}`}
        disabled={this.state.selectedRecordIds.count() === 0}
        onClick={() => this.moveFiles(toStage)}
      />
    );
  },

  renderMoveToolbarGroup() {
    switch (this.props.stage) {
      case 'incoming':
        return (
          <ToolbarGroup>
            {this.renderMoveToButton('current')}
            {this.renderMoveToButton('archive')}
          </ToolbarGroup>
        );
      case 'current':
        return (
          <ToolbarGroup>
            {this.renderMoveToButton('incoming')}
            {this.renderMoveToButton('archive')}
          </ToolbarGroup>
        );
      case 'archive':
        return (
          <ToolbarGroup>
            {this.renderMoveToButton('incoming')}
            {this.renderMoveToButton('current')}
          </ToolbarGroup>
        );
      case 'trash':
        return (
          <ToolbarGroup>
            {this.renderMoveToButton('current')}
            {this.renderMoveToButton('archive')}
          </ToolbarGroup>
        );
      default: return null;
    }
  },

  renderMetadataToolbarGroup() {
    if (this.props.record.get('metadata_schemas').count() === 0) {
      return null;
    }

    return (
      <ToolbarGroup>
        <ToolbarButtonModal
          icon="barcode"
          labelTextKey="widgets.vault.file_browser.modals.metadata_file.header"
          disabled={this.state.selectedRecordIds.count() === 0}
          modalElement={MetadataModal}
          modalProps={{
            contentPrefix: 'widgets.vault.file_browser.modals.metadata_file',
            selectedRecords: this.state.selectedRecords,
            metadataSchemas: this.getFilteredMetadataSchemas(),
            onDismiss: this.reloadTable,
            recordKey: 'record_file_id',
          }}
        />
      </ToolbarGroup>
    );
  },

  renderUploadButton() {
    if (this.props.stage !== 'incoming') {
      return null;
    }

    return (
      <ToolbarButtonModal
        icon="upload"
        labelTextKey={`${this.props.contextPrefix}.actions.upload`}
        modalElement={UploadModal}
        modalProps={{
          contentPrefix: 'widgets.vault.file_browser.modals.metadata_file',
          metadataSchemas: this.getFilteredMetadataSchemas(),
          repository: this.props.record,
        }}
      />
    );
  },

  render() {
    return (
      <TableBrowser
        ref="tableBrowser"
        attributes={this.buildTableAttributes()}
        contentPrefix="widgets.vault.file_browser.table"
        requestFullRecords
        recordsQuery={this.buildTableRecordsQuery()}
        selectable
        onSelect={this.onTableSelect}
      >
        <ToolbarGroup>
          {this.renderUploadButton()}
          <ToolbarButton
            icon="download"
            disabled={this.state.selectedRecordIds.count() === 0}
            onClick={this.onDownloadClick}
          />
          <ToolbarButton
            icon="delete"
            labelTextKey={`${
              this.props.contextPrefix
              }.actions.${
              (this.props.stage === 'trash' ? 'delete' : 'move_to.trash')
              }`}
            disabled={this.state.selectedRecordIds.count() === 0}
            onClick={this.onDeleteClick}
          />
          <DeleteModal
            ref="deleteModal"
            contentPrefix={`${this.props.contextPrefix}.modals.delete`}
            selectedRecordIds={this.state.selectedRecordIds}
            app="vault"
            model="Data.Record.File"
            onSuccess={this.reloadTable}
          />
        </ToolbarGroup>
        {this.renderMetadataToolbarGroup()}
        {this.renderMoveToolbarGroup()}
      </TableBrowser>
    );
  },
});

export default DJLibraryIndexContent;
