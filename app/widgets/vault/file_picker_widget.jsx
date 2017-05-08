import React, { PropTypes } from 'react';
import Translate from 'react-translate-component';
import { throttle } from 'lodash';

import TableBrowser from '../admin/table_browser_widget.jsx';
import RadioKit from '../../services/RadioKit';
import './file_picker_widget.scss';

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

  refreshTable() {
    if (this.refs.tableBrowser) {
      this.refs.tableBrowser.reloadData();
    }
  },

  buildAttributes() {
    return {
      name: { renderer: 'string', sortable: true },
      inserted_at: { renderer: 'datetime', sortable: true },
    };
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
        <div style={{position: 'relative'}}>
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
      </div>
    );
  },
});
