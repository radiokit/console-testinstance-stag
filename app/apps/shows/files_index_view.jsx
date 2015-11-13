import React from 'react';
import { Link } from 'react-router';

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
import TagSelector from '../../widgets/vault/tag_selector_widget.jsx';
import RoutingHelper from '../../helpers/routing_helper.js';
import AccountHelper from '../../helpers/account_helper.js';

export default React.createClass({
  getInitialState: function() {
    return {
      currentRepository: null,
      loadedRepository: false,
      availableFiles: null,
      loadedFiles: false,
      availableCategories: null,
      loadedCategories: false,
      loadingError: false,
      selectedTagItemIds: []
    };
  },


  onTagItemChange: function(tagItemId, newState) {
    let selectedTagItemIds = this.state.selectedTagItemIds.slice(); // Shallow copy

    if(newState === false) {
      selectedTagItemIds.splice(selectedTagItemIds.indexOf(tagItemId), 1);

    } else {
      selectedTagItemIds.push(tagItemId);
    }

    this.setState({ selectedTagItemIds: selectedTagItemIds }, () => {
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
    this.loadRepository();
  },


  loadRepository: function() {
    window.data
      .query("vault", "Record.Repository")
      .select("id")
      .where("references", "deq", "user_account_id", AccountHelper.getCurrentAccountIdFromContext(this))
      .where("references", "deq", "role", "shows")
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({
            loadingError: true
          })
        }
      }).on("update", (_, response) => {
        if(this.isMounted()) {

          if(response.getData().count() != 0) {
            this.setState({
              currentRepository: response.getData().first(),
              loadedRepository: true
            });

          } else {
            this.setState({
              loadingError: true
            })
          }
        }
      }).fetch();
  },


  loadCategories: function() {
    window.data
      .query("vault", "Tag.Category")
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
      .query("vault", "Record.File")
      .select("id", "name")
      .where("record_repository_id", "eq", this.state.currentRepository.get("id"))
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


  render: function() {
    if(this.state.loadingError) {
      return (<Alert type="error" fullscreen={true} infoTextKey="general.errors.communication.general" />);

    } else {
      if(this.state.loadedRepository === false || this.state.loadedFiles === false || this.state.loadedCategories === false) {
        return (<Loading info={true} infoTextKey="apps.shows.files.index.loading"/>);

      } else {
        var that = this;
        return (
          <Section>
            <GridRow>
              <GridCell size="large" center={true}>
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
                          <Table attributes={{
                            name:           { renderer: "text", props: { linkFunc: (item) => { return RoutingHelper.apps.shows.files.show(this, item); } } },
                            duration_total: { renderer: "text" },
                          }} actions={[]} contentPrefix="apps.shows.files.index.table" records={this.state.availableFiles} />
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </GridCell>
            </GridRow>
          </Section>
        );
      }
    }
  }
});
