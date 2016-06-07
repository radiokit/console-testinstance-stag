import React from 'react';
import { Seq, List } from 'immutable';
import { isEqual } from 'lodash';
import multiDownload from 'multi-download';

import DeleteModal from '../../../widgets/admin/crud/delete_modal.jsx';
import TableBrowser from '../../../widgets/admin/table_browser_widget.jsx';
import ToolbarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolbarButton from '../../../widgets/admin/toolbar_button_widget.jsx';
import ToolbarButtonModal from '../../../widgets/admin/toolbar_button_modal_widget.jsx';
import RadioKit from '../../../services/RadioKit';

import UploadModal from './show_content_upload_modal.jsx';
import MetadataModal from './show_content_metadata_modal.jsx';
import TagModal from './show_content_tag_modal.jsx';

const ShowContentPartial = React.createClass({

  propTypes: {
    record: React.PropTypes.object.isRequired,
    app: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
    stage: React.PropTypes.oneOf(['incoming', 'current', 'archive', 'trash']).isRequired,
    tagFilter: React.PropTypes.array.isRequired,
  },

  getInitialState() {
    return {
      selectedRecordIds: Seq().toIndexedSeq(),
      selectedRecords: Seq().toIndexedSeq(),
      selectedAssociations: List(),
    };
  },

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.tagFilter, this.props.tagFilter)) {
      this.reloadTable();
    }
  },

  getCategories() {
    const { record } = this.props;
    const tags = record.get('tag_items', List()).groupBy(item => item.get('tag_category_id'));
    return record
      .get('tag_categories', List())
      .map(category => category.set('tag_items', tags.get(category.get('id')) || List()))
    ;
  },

  onTableSelect(selectedRecordIds, selectedRecords) {
    this.setState({
      selectedRecordIds,
      selectedRecords,
    });
    this.buildSelectedTags(selectedRecordIds);
  },

  onDownloadClick() {
    this.state.selectedRecordIds.count() > 0 && RadioKit
      .query('vault', 'Data.Record.File')
      .select('private_download_url')
      .where('id', 'in', this.state.selectedRecordIds.toJS())
      .on('error', () => {
        // FIXME
      })
      .on('fetch', (_event, _query, data) => {
        multiDownload(data.map((record) => record.get('private_download_url')).toJS());
      }).fetch();
  },

  onDeleteClick() {
    if (this.props.stage === 'trash') {
      this.refs.deleteModal.show();
    } else {
      this.moveFiles('trash');
    }
  },

  buildSelectedTags(selectedRecordIds) {
    selectedRecordIds.count() > 0 && RadioKit
      .query('vault', 'Data.Tag.Association')
      .select('record_file_id', 'tag_item_id', 'id')
      .where('record_file_id', 'in', selectedRecordIds.toJS())
      .on('error', () => {
        // FIXME
      })
      .on('fetch', (_event, _query, data) => {
        this.setState({
          selectedAssociations: data,
        });
      }).fetch();
  },

  refreshTagData() {
    this.buildSelectedTags(this.state.selectedRecordIds);
  },

  reloadTable() {
    this.refs.tableBrowser.reloadData();
  },

  moveFiles(newStage) {
    const patch = { stage: newStage };
    if (this.props.stage === 'trash') {
      patch.destroy_at = null;
    }
    if (newStage === 'trash') {
      patch.destroy_in = 1000 * 60 * 60 * 24 * 30;
    }
    this.setState({
      stageMovingIndex: this.state.selectedRecordIds.count() - 1,
    });
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

  buildTableAttributes() {
    const attributes = {
      name: { renderer: 'string', sortable: true },
    };
    return this.props.record.get('metadata_schemas').reduce((acc, metadataSchema) => {
      /* eslint no-param-reassign: 0 */
      acc[metadataSchema.get('key')] = {
        renderer: metadataSchema.get('kind'),
        headerText: metadataSchema.get('name'),
        valueFunc: (record) => {
          const foundMetadataItem = record
            .get('metadata_items')
            .find(
              metadataItem => (metadataItem.get('metadata_schema_id') === metadataSchema.get('id'))
            );
          if (foundMetadataItem) {
            return foundMetadataItem.get(`value_${metadataSchema.get('kind')}`);
          }
          return null;
        },
      };
      return acc;
    }, attributes);
  },

  buildTagFilterQuery(query) {
    const tagIdsFilter = this.props.tagFilter.map((tag) => tag.id);
    if (this.props.tagFilter.length > 0) {
      return query.where('tag_associations.tag_item_id', 'in', tagIdsFilter);
    }
    return query;
  },

  buildTableRecordsQuery() {
    return RadioKit
      .query('vault', 'Data.Record.File')
      .select(
        'id',
        'name',
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
        'metadata_items.value_waveform',
        'metadata_items.value_image',
        'metadata_items.metadata_schema_id',
        'tag_items.id',
        'tag_items.name',
        'tag_items.tag_category_id',
        'stage'
      )
      .joins('metadata_items')
      .joins('tag_items')
      .joins('tag_associations')
      .where('stage', 'eq', this.props.stage)
      .where('record_repository_id', 'eq', this.props.record.get('id'));
  },

  renderMoveToButton(stage) {
    return (
      <ToolbarButton
        icon="folder-move"
        labelTextKey={`${this.props.contentPrefix}.actions.move_to.${stage}`}
        disabled={this.state.selectedRecordIds.count() === 0}
        onClick = {() => this.moveFiles(stage)}
      />
    );
  },

  render() {
    return (
      <TableBrowser
        ref="tableBrowser"
        onSelect={this.onTableSelect}
        selectable
        attributes={this.buildTableAttributes()}
        contentPrefix="widgets.vault.file_browser.table"
        requestFullRecords
        recordsQuery={this.buildTagFilterQuery(this.buildTableRecordsQuery())}
      >
        <ToolbarGroup>
          {(() => (
            (this.props.stage === 'incoming')
              ? (
                  <ToolbarButtonModal
                    icon="upload"
                    labelTextKey={`${this.props.contentPrefix}.actions.upload`}
                    modalElement={UploadModal}
                    modalProps={{ repository: this.props.record }}
                  />
                )
              : null
            )
          )()}
          <ToolbarButton
            icon="download"
            disabled={this.state.selectedRecordIds.count() === 0}
            onClick={this.onDownloadClick}
          />
          <ToolbarButton
            icon="delete"
            labelTextKey={`${
              this.props.contentPrefix
              }.actions.${
              (this.props.stage === 'trash' ? 'delete' : 'move_to.trash')
              }`}
            disabled={this.state.selectedRecordIds.count() === 0}
            onClick={this.onDeleteClick}
          />
          <DeleteModal
            ref="deleteModal"
            contentPrefix={`${this.props.contentPrefix}.modals.delete`}
            selectedRecordIds={this.state.selectedRecordIds}
            app="vault"
            model="Data.Record.File"
            onSuccess={ this.reloadTable }
          />
        </ToolbarGroup>

        <ToolbarGroup>
          <ToolbarButtonModal
            icon="folder"
            labelTextKey={`${this.props.contentPrefix}.actions.tags.assignTags`}
            disabled={this.state.selectedRecordIds.count() === 0}
            modalElement={TagModal}
            modalProps={{
              selectedRecordIds: this.state.selectedRecordIds,
              tagCategories: this.getCategories(),
              initialAssociations: this.state.selectedAssociations,
              onDismiss: this.refreshTagData,
            }}
          />
        </ToolbarGroup>

        {(() => (
          (this.props.record.get('metadata_schemas').count() !== 0)
            ? (
              <ToolbarGroup>
                <ToolbarButtonModal
                  icon="barcode"
                  labelTextKey="widgets.vault.file_browser.modals.metadata.header"
                  disabled={this.state.selectedRecordIds.count() === 0}
                  modalElement={MetadataModal}
                  modalProps={{
                    contentPrefix: 'widgets.vault.file_browser.modals.metadata',
                    selectedRecordIds: this.state.selectedRecordIds,
                    selectedRecords: this.state.selectedRecords,
                    metadataSchemas: this.props.record.get('metadata_schemas'),
                    onDismiss: this.reloadTable,
                  }}
                />
              </ToolbarGroup>
            )
            : null
        ))()}

        <ToolbarGroup>
         {(() => {
           switch (this.props.stage) {
             case 'incoming':
               return this.renderMoveToButton('current');
             case 'current':
               return (
                <div>
                  {this.renderMoveToButton('incoming')}
                  {this.renderMoveToButton('archive')}
                </div>
              );
             case 'archive':
               return this.renderMoveToButton('current');
             case 'trash':
               return this.renderMoveToButton('current');
             default: return null;
           }
         })()}
         </ToolbarGroup>

      </TableBrowser>
    );
  },
});

export default ShowContentPartial;
