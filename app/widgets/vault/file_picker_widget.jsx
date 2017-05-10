import React, { PropTypes } from 'react';
import Translate from 'react-translate-component';
import { throttle } from 'lodash';
import { List } from 'immutable';

import TableBrowser from '../admin/table_browser_widget.jsx';
import RadioKit from '../../services/RadioKit';
import './file_picker_widget.scss';

function isMetadataSchemaSortable(schema) {
  const kind = schema.get('kind');

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
}

export default React.createClass({
  propTypes: {
    pageLimit: PropTypes.number,
    repository: PropTypes.object.isRequired,
    onFileChoose: PropTypes.func.isRequired,
  },

  getDefaultProps() {
    return {
      pageLimit: 100,
    };
  },

  getInitialState() {
    return {
      search: '',
      visibleMetadataSchemas: [],
      showMetadataTogglers: false,
    };
  },

  componentWillMount() {
    this.refreshTable = throttle(this.refreshTable, 500);
  },

  onSearchChange(evt) {
    this.setState({
      search: evt.target.value,
    }, this.refreshTable);
  },

  onToggleMetadataItem(evt) {
    const metadataSchemaId = evt.target.value;

    if (this.state.visibleMetadataSchemas.includes(metadataSchemaId)) {
      this.setState({
        visibleMetadataSchemas: this.state.visibleMetadataSchemas
          .filter(id => id !== metadataSchemaId),
      });
    } else {
      this.setState({
        visibleMetadataSchemas: [
          ...this.state.visibleMetadataSchemas,
          metadataSchemaId,
        ],
      });
    }
  },

  onMetadataTogglersVisibilityChange() {
    this.setState({
      showMetadataTogglers: !this.state.showMetadataTogglers,
    });
  },

  getFilteredMetadataSchemas() {
    return this.props.repository.get('metadata_schemas', new List())
      .filter(schema => schema.get('tag_category_id') === null);
  },

  refreshTable() {
    if (this.refs.tableBrowser) {
      this.refs.tableBrowser.reloadData();
    }
  },

  buildAttributes() {
    const schemas = this.props.repository.get('metadata_schemas', new List());
    const attributes = {
      name: { renderer: 'string', sortable: true },
      inserted_at: { renderer: 'datetime', sortable: true },
    };

    return this.state.visibleMetadataSchemas.reduce((acc, schemaId) => {
      const schema = schemas.find(it => it.get('id') === schemaId);
      if (!schema) {
        return acc;
      }

      // eslint-disable-next-line no-param-reassign
      acc[schema.get('key')] = {
        renderer: schema.get('kind'),
        headerText: schema.get('name'),
        sortable: isMetadataSchemaSortable(schema),
        sortableFunc: (query, attribute, direction) => query.scope(
          'sorted_by_metadata',
          schema.get('key'),
          schema.get('kind'),
          direction
        ),
        valueFunc: (record) => {
          const foundMetadataItem = record
            .get('metadata_items')
            .find(metadataItem => metadataItem.get('metadata_schema_id') === schemaId);

          if (!foundMetadataItem) {
            return null;
          }

          return foundMetadataItem.get(`value_${schema.get('kind')}`);
        },
      };

      return acc;
    }, attributes);
  },

  buildQuery() {
    const query = RadioKit
      .query('vault', 'Data.Record.File')
      .select(
        'id',
        'name',
        'inserted_at',
        'stage',
        'metadata_items.id',
        'metadata_items.metadata_schema_id',
        'metadata_items.value_string',
        'metadata_items.value_db',
        'metadata_items.value_text',
        'metadata_items.value_float',
        'metadata_items.value_integer',
        'metadata_items.value_duration',
        'metadata_items.value_date',
        'metadata_items.value_datetime',
        'metadata_items.value_time',
        'metadata_items.value_file',
        'metadata_items.value_image',
        'metadata_items.value_url',
      )
      .joins('metadata_items')
      .where('record_repository_id', 'eq', this.props.repository.get('id'))
      .where('stage', 'in', 'current', 'archive');

    if (this.state.search && this.state.search.length) {
      const searchText = this.state.search.split('').map(letter => `${letter}%`).join('');
      return query.where('name', 'ilike', `%${searchText}`);
    }

    return query;
  },

  renderMetadataSchemaCheckbox(metadataSchema) {
    const selected = this.state.visibleMetadataSchemas.find(id =>
      id === metadataSchema.get('id')
    );

    return (
      <div
        className="checkbox FilePickerWidget-metadataTogglers-checkbox"
        key={metadataSchema.get('id')}
      >
        <label>
          <input
            type="checkbox"
            value={metadataSchema.get('id')}
            selected={selected}
            onChange={this.onToggleMetadataItem}
          />
          {metadataSchema.get('name')}
        </label>
      </div>
    );
  },

  renderMetadataTogglers() {
    if (!this.state.showMetadataTogglers) {
      return null;
    }

    const schemas = this.getFilteredMetadataSchemas()
      .toArray()
      .map(this.renderMetadataSchemaCheckbox);

    return (
      <div className="FilePickerWidget-metadataTogglers">
        {schemas}
      </div>
    );
  },

  render() {
    const metadataIcon = this.state.showMetadataTogglers ? 'down' : 'right';

    return (
      <div className="FilePickerWidget">
        <div className="FilePickerWidget-header">
          <Translate
            component="h4"
            content="widgets.vault.file_picker.search_label"
          />
          <div className="form-group">
            <input
              type="text"
              name="search"
              className="form-control"
              onChange={this.onSearchChange}
              value={this.state.search}
            />
            <Translate
              component="label"
              content="widgets.vault.file_picker.search_input_label"
              htmlFor="search"
            />
          </div>
        </div>
        <div className="FilePickerWidget-metadata clearfix">
          <button
            className="btn btn-default FilePickerWidget-metadata-expandButton"
            onClick={this.onMetadataTogglersVisibilityChange}
          >
            <i className={`mdi mdi-chevron-${metadataIcon}`} />
            <Translate
              component="span"
              content="widgets.vault.file_picker.metadata_label"
            />
          </button>
          {this.renderMetadataTogglers()}
        </div>
        <TableBrowser
          ref="tableBrowser"
          limit={this.props.pageLimit}
          recordsLinkFunc={this.props.onFileChoose}
          contentPrefix="widgets.vault.file_browser.table"
          requestFullRecords
          attributes={this.buildAttributes()}
          recordsQuery={this.buildQuery()}
        />
      </div>
    );
  },
});
