import React from 'react';
import { Link } from 'react-router';
import Immutable from 'immutable';

import GridRow from '../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../widgets/admin/grid_cell_widget.jsx';
import Card from '../../widgets/admin/card_widget.jsx';
import CardBody from '../../widgets/admin/card_body_widget.jsx';
import CardHeader from '../../widgets/admin/card_header_widget.jsx';
import CardToolBar from '../../widgets/admin/card_tool_bar_widget.jsx';
import CardToolBarCreate from '../../widgets/admin/card_tool_bar_create_widget.jsx';
import Table from '../../widgets/admin/table_widget.jsx';
import TableActionShow from '../../widgets/admin/table_action_show.jsx';
import Alert from '../../widgets/admin/alert_widget.jsx';
import Section from '../../widgets/admin/section_widget.jsx';
import Loading from '../../widgets/general/loading_widget.jsx';

import TagSelector from './tag_selector_widget.jsx';
import TagModal from './tag_modal.jsx';

import VaultHelper from '../../helpers/vault_helper.js';
import RoutingHelper from '../../helpers/routing_helper.js';

export default React.createClass({
  propTypes: {
    role: React.PropTypes.string.isRequired,
  },


  contextTypes: {
    scopeUserAccountId: React.PropTypes.string
  },


  getInitialState: function() {
    return {
      currentRepository: null,
      loadedRepository: false,
      availableFiles: null,
      loadedFiles: false,
      availableCategories: null,
      loadedCategories: false,
      loadingError: false,
      selectedTagItemIds: [],
      selectedRecords: new Immutable.Seq().toIndexedSeq(),
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
      selectedRecords: new Immutable.Seq().toIndexedSeq(),
      selectedTagItemIds: selectedTagItemIds
    }, () => {
      this.loadFiles();
      // FIXME fast clicking can cause that requests come in reverse order than clicked
      // and not the last one will be shown but the last that came
    });
  },


  componentDidUpdate: function() {
    if(this.state.loadedRepository) {
      if(!this.state.loadedFiles) {
        this.loadFiles();
      }
      if(!this.state.loadedCategories) {
        this.loadCategories();
      }
    }
  },


  componentDidMount: function() {
    VaultHelper.loadRepository(this, this.props.role);
  },


  onFileSelect: function(selectedRecords) {
    this.setState({
      selectedRecords: selectedRecords
    });
  },


  onTagClick: function() {
    this.refs.tagModal.show();
  },


  onDownloadClick: function() {
    alert("Not implemented yet"); // TODO
  },


  onDeleteClick: function() {
    alert("Not implemented yet"); // TODO
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
      }).on("update", (_, response) => {
        if(this.isMounted()) {
          this.setState({
            availableCategories: response.getData(),
            loadedCategories: true
          })
        }
      }).fetch();
  },


  loadFiles: function() {
    let query =
      window.data
      .query("vault", "Data.Record.File")
      .select("id", "name", "metadata_items", "tag_items")
      .joins("metadata_items")
      .joins("tag_items")
      .where("record_repository_id", "eq", this.state.currentRepository.get("id"))
      .countTotal()
      .limit(0, 100)
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({
            loadingError: true
          })
        }
      }).on("update", (_, response) => {
        if(this.isMounted()) {
          this.setState({
            availableFiles: response.getData(),
            loadedFiles: true
          })
        }
      });

    if(this.state.selectedTagItemIds.length !== 0) {
      query.where("tag_associations.id", "in", ...this.state.selectedTagItemIds);
    }

    query.fetch();
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
      if(this.state.loadedRepository === false || this.state.loadedFiles === false || this.state.loadedCategories === false) {
        return (<Loading info={true} infoTextKey="apps.shows.files.index.loading"/>);

      } else {
        var that = this;
        return (
          <div>
            <TagModal ref="tagModal" tagCategoriesWithItems={this.state.availableCategories} selectedRecords={this.state.selectedRecords} />

            <Card contentPrefix="apps.shows.files.index" cardPadding={false}>
              <CardHeader>
                <CardToolBar>
                  <CardToolBarCreate path={RoutingHelper.apps.shows.files.create(this)} hintTooltipKey="apps.shows.files.index.actions.create" />
                </CardToolBar>
              </CardHeader>
              <CardBody>
                <div className="row">
                  <div className="col-sm-4 col-md-3 col-lg-2">
                    <TagSelector onTagItemChange={this.onTagItemChange} selectedTagItemIds={this.state.selectedTagItemIds} tagCategoriesWithItems={this.state.availableCategories}/>
                  </div>

                  <div className="col-sm-8 col-md-9 col-lg-10">
                    <div className="small-padding">
                      <div className="btn-toolbar margin-bottom-xl">
                        <div className="btn-group">
                          <button type="button" className="btn btn-default-light" disabled={this.state.selectedRecords.count() === 0} onClick={this.onTagClick}><i className="mdi mdi-folder"/></button>
                          <button type="button" className="btn btn-default-light" disabled={this.state.selectedRecords.count() === 0} onClick={this.onDownloadClick}><i className="mdi mdi-download"/></button>
                          <button type="button" className="btn btn-default-light" disabled={this.state.selectedRecords.count() === 0} onClick={this.onDeleteClick}><i className="mdi mdi-delete"/></button>
                        </div>
                        <div className="btn-group pull-right">
                          <button type="button" className="btn btn-default-light"><i className="mdi mdi-chevron-left"/></button>
                          <button type="button" className="btn btn-default-light"><i className="mdi mdi-chevron-right"/></button>
                        </div>
                      </div>

                      <Table onSelect={this.onFileSelect} selectable={true} attributes={this.buildTableAttributes()} actions={[]} contentPrefix="apps.shows.files.index.table" records={this.state.availableFiles} />
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        );
      }
    }
  }
});
