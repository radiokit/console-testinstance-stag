import React from 'react';
import { Link } from 'react-router';
import Translate from 'react-translate-component';
import Immutable from 'immutable';

import GridRow from '../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../widgets/admin/grid_cell_widget.jsx';
import Card from '../../widgets/admin/card_widget.jsx';
import CardBody from '../../widgets/admin/card_body_widget.jsx';
import CardHeader from '../../widgets/admin/card_header_widget.jsx';
import CardToolBar from '../../widgets/admin/card_tool_bar_widget.jsx';
import CardToolBarCreate from '../../widgets/admin/card_tool_bar_create_widget.jsx';
import CardToolBarSettings from '../../widgets/admin/card_tool_bar_settings_widget.jsx';
import CardSidebar from '../../widgets/admin/card_sidebar_widget.jsx';
import TableBrowser from '../../widgets/admin/table_browser_widget.jsx';
import TableBrowserToolbarGroup from '../../widgets/admin/table_browser_toolbar_group_widget.jsx';
import Alert from '../../widgets/admin/alert_widget.jsx';
import Section from '../../widgets/admin/section_widget.jsx';
import Loading from '../../widgets/general/loading_widget.jsx';

import TagSelector from './tag_selector_widget.jsx';
import MetadataModal from './metadata_modal.jsx';
import TagModal from './tag_modal.jsx';
import DeleteModal from './delete_modal.jsx';

import VaultHelper from '../../helpers/vault_helper.js';
import RoutingHelper from '../../helpers/routing_helper.js';

export default React.createClass({
  propTypes: {
    repositoryRole: React.PropTypes.string.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
    routingPrefix: React.PropTypes.object.isRequired,
  },


  contextTypes: {
    currentUserAccount: React.PropTypes.object.isRequired,
  },


  getInitialState: function() {
    return {
      currentRepository: null,
      loadedRepository: false,
      availableCategories: null,
      loadedCategories: false,
      loadingError: false,
      selectedTagItemIds: [],
      selectedRecordIds: new Immutable.Seq().toIndexedSeq(),
      recordsQuery: null,
      recordIdsQuery: null,
    };
  },


  onTagItemChange: function(tagItemId, newState) {
    let selectedTagItemIds = this.state.selectedTagItemIds.slice(); // Shallow copy

    if(newState === false) {
      selectedTagItemIds.splice(selectedTagItemIds.indexOf(tagItemId), 1);

    } else {
      selectedTagItemIds.push(tagItemId);
    }


    this.setState({
      selectedRecordIds: new Immutable.Seq().toIndexedSeq(),
      selectedTagItemIds: selectedTagItemIds
    }, () => {
      // this.loadFiles();
      // FIXME fast clicking can cause that requests come in reverse order than clicked
      // and not the last one will be shown but the last that came
    });
  },


  componentDidUpdate: function() {
    if(this.state.loadedRepository) {
      if(!this.state.loadedCategories) {
        this.loadCategories();
      }

      if(!this.state.recordsQuery) {
        this.buildRecordsQuery();
      }

      if(!this.state.recordIdsQuery) {
        this.buildRecordIdsQuery();
      }
    }
  },


  componentDidMount: function() {
    VaultHelper.loadRepository(this, this.props.repositoryRole);
  },


  onFileSelect: function(selectedRecordIds) {
    this.setState({
      selectedRecordIds: selectedRecordIds
    });
  },


  onTagClick: function() {
    this.refs.tagModal.show();
  },


  onMetadataClick: function() {
    this.refs.metadataModal.show();
  },


  onDownloadClick: function() {
    alert("Not implemented yet"); // TODO
  },


  onDeleteClick: function() {
    this.refs.deleteModal.show();
  },


  loadCategories: function() {
    window.data
      .query("vault", "Data.Tag.Category")
      .select("id", "name", "tag_items")
      .joins("tag_items")
      .where("record_repository_id", "eq", this.state.currentRepository.get("id"))
      .order("name", "asc")
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({
            loadingError: true
          })
        }
      }).on("fetch", (_event, _query, data) => {
        if(this.isMounted()) {
          this.setState({
            availableCategories: data,
            loadedCategories: true
          })
        }
      }).fetch();
  },


  buildRecordsQuery: function() {
    this.setState({
      recordsQuery: window.data
        .query("vault", "Data.Record.File")
        .select("id", "name", "metadata_items", "tag_items")
        .joins("metadata_items")
        .joins("tag_items")
        .where("record_repository_id", "eq", this.state.currentRepository.get("id"))
    });
  },


  buildRecordIdsQuery: function() {
    this.setState({
      recordIdsQuery: window.data
        .query("vault", "Data.Record.File")
        .select("id")
        .where("record_repository_id", "eq", this.state.currentRepository.get("id"))
    });
  },


  buildTableAttributes: function() {
    let attributes = {
      name: { renderer: "string", linkFunc: (record) => { return RoutingHelper.apps.shows.files.show(this, record); } },
    };

    return this.state.currentRepository.get("metadata_schemas").reduce((acc, metadataSchema) => {
      acc[metadataSchema.get("key")] = {
        renderer: metadataSchema.get("kind"),
        headerText: metadataSchema.get("name"),
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


  render: function() {
    if(this.state.loadingError) {
      return (<Alert type="error" fullscreen={true} infoTextKey="general.errors.communication.general" />);

    } else {
      if(this.state.loadedRepository === false || this.state.loadedCategories === false || this.state.recordsQuery === null) {
        return (<Loading info={true} infoTextKey="apps.shows.files.index.loading"/>);

      } else {
        return (
          <div>
            <TagModal ref="tagModal" tagCategoriesWithItems={this.state.availableCategories} selectedRecordIds={this.state.selectedRecordIds} />
            <MetadataModal ref="metadataModal" metadataSchemas={this.state.currentRepository.get("metadata_schemas")} selectedRecordIds={this.state.selectedRecordIds} />
            <DeleteModal ref="deleteModal" selectedRecordIds={this.state.selectedRecordIds} />

            <Card contentPrefix={this.props.contentPrefix + ".index"} cardPadding={false}>
              <CardHeader/>
              <CardBody>
                <CardSidebar>
                  <TagSelector onTagItemChange={this.onTagItemChange} selectedTagItemIds={this.state.selectedTagItemIds} tagCategoriesWithItems={this.state.availableCategories}/>
                  <TableBrowser onSelect={this.onFileSelect} selectable={true} attributes={this.buildTableAttributes()} actions={[]} contentPrefix={this.props.contentPrefix + ".index.table"} recordsQuery={this.state.recordsQuery} recordIdsQuery={this.state.recordIdsQuery}>
                    <TableBrowserToolbarGroup>
                      <Link type="button" className="btn btn-default-light" to={this.props.routingPrefix.files.create(this)}><i className="mdi mdi-upload"/><Translate content={this.props.contentPrefix + ".index.actions.create"} component="span"/></Link>
                      <button type="button" className="btn btn-default-light" disabled={this.state.selectedRecordIds.count() === 0} onClick={this.onDownloadClick}><i className="mdi mdi-download"/></button>
                      <button type="button" className="btn btn-default-light" disabled={this.state.selectedRecordIds.count() === 0} onClick={this.onDeleteClick}><i className="mdi mdi-delete"/></button>
                    </TableBrowserToolbarGroup>

                    <TableBrowserToolbarGroup>
                      <button type="button" className="btn btn-default-light" disabled={this.state.selectedRecordIds.count() === 0} onClick={this.onTagClick}><i className="mdi mdi-folder"/><Translate content={this.props.contentPrefix + ".index.actions.tags"} component="span"/></button>
                    </TableBrowserToolbarGroup>

                    <TableBrowserToolbarGroup>
                      <button type="button" className="btn btn-default-light" disabled={this.state.selectedRecordIds.count() === 0} onClick={this.onMetadataClick}><i className="mdi mdi-barcode"/><Translate content={this.props.contentPrefix + ".index.actions.metadata"} component="span"/></button>
                    </TableBrowserToolbarGroup>
                  </TableBrowser>
                </CardSidebar>
              </CardBody>
            </Card>
          </div>
        );
      }
    }
  }
});
