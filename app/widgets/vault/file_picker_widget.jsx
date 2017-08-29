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

const options = {
  toggleMetadata: 'toggleMetadata',
  groupBy: 'groupBy',
};

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
      metadataSchemas: this.props.repository.get('metadata_schemas'),
      visibleMetadataSchemas: [],
      groupByType: '',
      groupByValue: '',
      showOption: null,
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

  onGroupByTypeChange(evt) {
    const groupByType = evt.target.value;

    this.setState({ groupByType, groupByValue: '', group: null }, () => {
      if (groupByType === 'tagCategories') {
        this.fetchTagCategories();
      }
    });
  },

  onGroupByValueChange(evt) {
    this.setState({ groupByValue: evt.target.value, group: null });
  },

  onToggleShowOption(showOption) {
    if (this.state.showOption === showOption) {
      this.setState({ showOption: null });
    } else {
      this.setState({ showOption });
    }
  },

  onToggleMetadataToggleOption() {
    this.onToggleShowOption(options.toggleMetadata);
  },

  onToggleGroupByOption() {
    this.onToggleShowOption(options.groupBy);
  },

  onFechTagCategories(_event, _record, data) {
    this.setState({ tagCategories: data });
  },

  onChooseGroup(group) {
    this.setState({ group });
  },

  getFilteredMetadataSchemas() {
    return this.props.repository.get('metadata_schemas', new List())
      .filter(schema => schema.get('tag_category_id') === null);
  },

  clearGroupSelection() {
    this.setState({ group: null });
  },

  refreshTable() {
    if (this.refs.tableBrowser) {
      this.refs.tableBrowser.reloadData();
    }
  },

  fetchTagCategories() {
    RadioKit
      .query('vault', 'Data.Tag.Category')
      .select('id', 'name')
      .where('record_repository_id', 'eq', this.props.repository.get('id'))
      .on('fetch', this.onFechTagCategories)
      .fetch();
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
      .joins('tag_items')
      .where('record_repository_id', 'eq', this.props.repository.get('id'))
      .where('stage', 'in', 'current', 'archive');

    if (this.state.search && this.state.search.length) {
      return query.scope('search', this.state.search);
    } else if (this.state.group) {
      if (this.state.groupByType === 'tagCategories') {
        return query
          .where('tag_associations.tag_item_id', 'eq', this.state.group.get('id'));
      } else if (this.state.groupByType === 'metadataSchemas') {
        const metadataItem = this.state.group;
        const metadataSchema = this.state.metadataSchemas
          .find(schema => schema.get('id') === metadataItem.get('metadata_schema_id'));
        const valueKey = `value_${metadataSchema.get('kind')}`;

        return query
          .where(`metadata_items.${valueKey}`, 'eq', valueKey);
      }
    }

    return query;
  },

  buildGroupsAttributes() {
    if (this.state.groupByType === 'tagCategories') {
      const tagCategory = this.state.tagCategories
        .find(cat => cat.get('id') === this.state.groupByValue);

      return { name: {
        renderer: 'string',
        headerText: tagCategory.get('name'),
        sortable: false,
        valueFunc: tagItem => tagItem.get('name'),
      } };
    }

    const metadataSchema = this.state.metadataSchemas
      .find(schema => schema.get('id') === this.state.groupBy);

    return {
      [metadataSchema.get('key')]: {
        renderer: metadataSchema.get('kind'),
        headerText: metadataSchema.get('name'),
        sortable: false,
        valueFunc: (metadataItem) => metadataItem.get(`value_${metadataSchema.get('kind')}`),
      },
    };
  },

  buildGroupsQuery() {
    if (this.state.groupByType === 'tagCategories') {
      return RadioKit
        .query('vault', 'Data.Tag.Item')
        .select('id', 'name')
        .where('tag_category_id', 'eq', this.state.groupByValue);
    }
    const metadataSchema = this.state.metadataSchemas
      .find(schema => schema.get('id') === this.state.groupBy);
    const valueKey = `value_${metadataSchema.get('kind')}`;

    return RadioKit
      .query('vault', 'Data.Metadata.Item')
      .select('id', 'metadata_schema_id', valueKey)
      .joins('record_file')
      .where('metadata_schema_id', 'eq', this.state.groupBy)
      .where('record_file.stage', 'in', 'current', 'archive')
      .where(valueKey, 'notnull');
      // .scope('uniq_by', 'value_string');
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

  renderToggleMetadataOption() {
    const schemas = this.getFilteredMetadataSchemas()
      .toArray()
      .map(this.renderMetadataSchemaCheckbox);

    return (
      <div className="FilePickerWidget-metadataTogglers">
        {schemas}
      </div>
    );
  },

  renderSelectOption(item) {
    return (
      <option
        key={item.get('id')}
        value={item.get('id')}
      >
        {item.get('name')}
      </option>
    );
  },

  renderGroupByOption() {
    const type = this.state.groupByType;
    let values = null;

    if (type && this.state[type]) {
      values = this.state[type]
        .toArray()
        .map(this.renderSelectOption);
    }

    return (
      <div>
        <div className="form-group">
          <select
            className="form-control"
            value={type}
            onChange={this.onGroupByTypeChange}
          >
            <Translate
              component="option"
              value=""
              content="widgets.vault.file_picker.group_by.off_label"
            />
            <Translate
              component="option"
              value="tagCategories"
              content="widgets.vault.file_picker.group_by.tag_category"
            />
          </select>
        </div>
        <div className="form-group">
          <select
            className="form-control"
            value={this.state.groupByValue}
            onChange={this.onGroupByValueChange}
          >
            <option value="">---</option>
            {values}
          </select>
        </div>
      </div>
    );
  },

  renderOptions() {
    const activeOption = this.state.showOption;
    const toggleMetadataIcon = activeOption === options.toggleMetadata ? 'down' : 'right';
    const groupByMetadataIcon = activeOption === options.groupBy ? 'down' : 'right';
    let content;

    switch (activeOption) {
      case options.toggleMetadata:
        content = this.renderToggleMetadataOption();
        break;
      case options.groupBy:
        content = this.renderGroupByOption();
        break;
      default:
        content = null;
    }

    return (
      <div className="FilePickerWidget-metadata clearfix">
        <div className="form-group">
          <button
            className="btn btn-default FilePickerWidget-metadata-expandButton"
            onClick={this.onToggleMetadataToggleOption}
          >
            <i className={`mdi mdi-chevron-${toggleMetadataIcon}`} />
            <Translate
              component="span"
              content="widgets.vault.file_picker.metadata_visibility_label"
            />
          </button>
          <button
            className="btn btn-default FilePickerWidget-metadata-expandButton"
            onClick={this.onToggleGroupByOption}
          >
            <i className={`mdi mdi-chevron-${groupByMetadataIcon}`} />
            <Translate
              component="span"
              content="widgets.vault.file_picker.group_by.title"
            />
          </button>
        </div>
        {content}
      </div>
    );
  },

  renderContent() {
    const group = this.state.group;
    if (!this.state.groupByValue || group) {
      return (
        <TableBrowser
          key={`recordBrowser-${group && group.get('id')}`}
          ref="tableBrowser"
          limit={this.props.pageLimit}
          recordsLinkFunc={this.props.onFileChoose}
          contentPrefix="widgets.vault.file_browser.table"
          requestFullRecords
          attributes={this.buildAttributes()}
          recordsQuery={this.buildQuery()}
        >
          {group && (
            <div className="btn-group">
              <button
                className="btn btn-default-light"
                onClick={this.clearGroupSelection}
              >
                <i className="mdi mdi-chevron-left" />
                {group.get('name')}
              </button>
            </div>
          )}
        </TableBrowser>
      );
    }

    return (
      <TableBrowser
        key={this.state.groupByValue}
        ref="groupBrowser"
        limit={this.props.pageLimit}
        recordsLinkFunc={this.onChooseGroup}
        contentPrefix="widgets.vault.file_browser.table"
        attributes={this.buildGroupsAttributes()}
        recordsQuery={this.buildGroupsQuery()}
      />
    );
  },

  render() {
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
        {this.renderOptions()}
        {this.renderContent()}
      </div>
    );
  },
});
