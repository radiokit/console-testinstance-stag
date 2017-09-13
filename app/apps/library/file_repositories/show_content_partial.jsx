import _ from 'mudash';
import React from 'react';
import { Seq, List } from 'immutable';
import multiDownload from 'multi-download';

import DeleteModal from '../../../widgets/admin/crud/delete_modal.jsx';
import TableBrowser from '../../../widgets/admin/table_browser_widget.jsx';
import ToolbarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolbarButton from '../../../widgets/admin/toolbar_button_widget.jsx';
import ToolbarButtonModal from '../../../widgets/admin/toolbar_button_modal_widget.jsx';
import RadioKit from '../../../services/RadioKit';

import UploadModal from './show_content_upload_modal.jsx';
import MetadataModal from './show_content_metadata_modal.jsx';
import StageModal from './show_content_stage_modal.jsx';
import TagModal from './show_content_tag_modal.jsx';

const ShowContentPartial = React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    app: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
    stage: React.PropTypes.oneOf(['incoming', 'current', 'archive', 'trash']).isRequired,
    tagFilter: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      selectedRecordIds: Seq().toIndexedSeq(),
      selectedRecords: Seq().toIndexedSeq(),
      selectedAssociations: List(),
      selectedAssociationsLoading: false,
    };
  },

  componentDidUpdate(prevProps) {
    if (prevProps.tagFilter !== this.props.tagFilter) {
      this.reloadTable();
    }
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
    this.refs.deleteModal.show();
  },

  getFilteredMetadataSchemas() {
    return this.props.record.get('metadata_schemas')
      .filter((schema) => schema.get('tag_category_id') === null);
  },

  getCategories() {
    const { record } = this.props;
    const tags = record.get('tag_items', List()).groupBy(item => item.get('tag_category_id'));
    return record
      .get('tag_categories', List())
      .map(category => category.set('tag_items', tags.get(category.get('id')) || List()))
    ;
  },

  buildSelectedTags(selectedRecordIds) {
    if (selectedRecordIds.count() > 0) {
      const chunks = _.chunk(selectedRecordIds, 100);
      let result = List();
      let resolved = 0;

      this.setState({
        selectedAssociationsLoading: true,
      }, () => {
        chunks
          .forEach((chunk) => {
            RadioKit
              .query('vault', 'Data.Tag.Association')
              .select('record_file_id', 'tag_item_id', 'id')
              .where('record_file_id', 'in', chunk.toJS())
              .on('error', () => {
                // FIXME
              })
              .on('fetch', (_event, _query, data) => {
                resolved++;
                result = result.concat(data);

                if (resolved === chunks.count()) {
                  this.setState({
                    selectedAssociationsLoading: false,
                    selectedAssociations: result,
                  });
                }
              }).fetch();
          });
      });
    }
  },

  refreshTagData() {
    this.buildSelectedTags(this.state.selectedRecordIds);
  },

  reloadTable() {
    // FIXME refs are pure evil
    this.refs.tableBrowser.reloadData();
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
      kind === 'duration');
  },

  buildTableAttributes() {
    const attributes = {
      name: { renderer: 'string', sortable: true },
      play: { renderer: 'play', sortable: false, valueFunc: this.getFilteredMetadataSchemas },
      inserted_at: { renderer: 'datetime', sortable: true },
    };

    return this.getFilteredMetadataSchemas()
      .reduce((acc, metadataSchema) => {
      /* eslint no-param-reassign: 0 */
        acc[metadataSchema.get('key')] = {
          renderer: metadataSchema.get('kind'),
          headerText: metadataSchema.get('name'),
          sortable: this.isMetadataSchemaSortable(metadataSchema),
          sortableFunc: (query, attribute, direction) => {
            return query
              .scope(
                'sorted_by_metadata', metadataSchema.get('key'),
                metadataSchema.get('kind'), direction
              );
          },
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
    let fullQuery = query;

    this.props.tagFilter.forEach((tag) => {
      fullQuery = fullQuery.where('tag_associations.tag_item_id', 'eq', tag.get('id'));
    });

    return fullQuery;
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

  renderMoveToButton(stage) {
    return (
      <ToolbarButtonModal
        icon="folder-move"
        labelTextKey={`${this.props.contentPrefix}.actions.move_to.${stage}`}
        disabled={this.state.selectedRecordIds.count() === 0}
        modalElement={StageModal}
        modalProps={{
          contentPrefix: 'widgets.vault.file_browser.modals.stage',
          selectedRecordIds: this.state.selectedRecordIds,
          toStage: stage,
          currentStage: this.props.stage,
          onDismiss: this.reloadTable,
        }}
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

  renderDeleteButton() {
    if (this.props.stage === 'trash') {
      return (
        <ToolbarButton
          icon="delete"
          labelTextKey={`${this.props.contentPrefix}.actions.delete`}
          disabled={this.state.selectedRecordIds.count() === 0}
          onClick={this.onDeleteClick}
        />
      );
    }

    return this.renderMoveToButton('trash');
  },

  renderUploadButton() {
    if (this.props.stage !== 'incoming') {
      return null;
    }

    return (
      <ToolbarButtonModal
        icon="upload"
        labelTextKey={`${this.props.contentPrefix}.actions.upload`}
        modalElement={UploadModal}
        modalProps={{ repository: this.props.record }}
      />
    );
  },

  render() {
    return (
      <TableBrowser
        ref="tableBrowser"
        onSelect={this.onTableSelect}
        selectable
        searchable
        attributes={this.buildTableAttributes()}
        contentPrefix="widgets.vault.file_browser.table"
        requestFullRecords
        recordsQuery={this.buildTagFilterQuery(this.buildTableRecordsQuery())}
      >
        <ToolbarGroup>
          {this.renderUploadButton()}
          <ToolbarButton
            icon="download"
            disabled={this.state.selectedRecordIds.count() === 0}
            onClick={this.onDownloadClick}
          />
          {this.renderDeleteButton()}
          <DeleteModal
            ref="deleteModal"
            contentPrefix={`${this.props.contentPrefix}.modals.delete`}
            selectedRecordIds={this.state.selectedRecordIds}
            app="vault"
            model="Data.Record.File"
            onSuccess={this.reloadTable}
          />
        </ToolbarGroup>

        <ToolbarGroup>
          <ToolbarButtonModal
            icon="folder"
            labelTextKey={`${this.props.contentPrefix}.actions.tags.assignTags`}
            disabled={this.state.selectedAssociationsLoading || this.state.selectedRecordIds.count() === 0}
            modalElement={TagModal}
            modalProps={{
              selectedRecordIds: this.state.selectedRecordIds,
              tagCategories: this.getCategories(),
              initialAssociations: this.state.selectedAssociations,
              onDismiss: this.refreshTagData,
            }}
          />
        </ToolbarGroup>
        {this.renderMetadataToolbarGroup()}
        {this.renderMoveToolbarGroup()}
      </TableBrowser>
    );
  },
});

export default ShowContentPartial;
