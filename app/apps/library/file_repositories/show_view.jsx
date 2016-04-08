import React from 'react';

import Show from '../../../widgets/admin/crud/show_widget.jsx';

import SidebarPartial from './show_sidebar_partial.jsx';
import ContentPartial from './show_content_partial.jsx';

const ShowView = React.createClass({

   contextTypes: {
    params: React.PropTypes.object.isRequired,
  },

  getInitialState(){
    return {
        filter: null,
        categories:[],
        stage: null,
    }
  },

  onTagFilterUpdate(f){
    this.setState({
      filter: f
    });
  },

  buildTabs() {
    return {
      incoming: { element: ContentPartial, props: { stage: "incoming", filter: this.state.filter }},
      ready:    { element: ContentPartial, props: { stage: "ready",  filter: this.state.filter }},
      archive:  { element: ContentPartial, props: { stage: "archive", filter: this.state.filter }},
      trash:    { element: ContentPartial, props: { stage: "trash", filter: this.state.filter }},
    }
  },

  buildSideBar(){
    return {
      test: { element: SidebarPartial, props: { categories: this.state.categories, filter:this.state.filter, onTagFilterUpdate: this.onTagFilterUpdate }},
    }
  },

  modifyShowQuery(query) {
    return query
      .select("metadata_schemas") // metadata_schemas and tag_categories fields are required by the content partial
      .joins("metadata_schemas")
      .select("tag_categories")
      .joins("tag_categories")
      .select("tag_items")
      .joins("tag_items")
  },

  render() {
    return (
      <Show
        contentPrefix="apps.library.file_repositories"
        app="vault"
        model="Data.Record.Repository"
        showQueryFunc={this.modifyShowQuery}
        sidebarElement={this.buildSideBar()}
        contentElement={this.buildTabs()}
        deleteEnabled={false} />
    );
  }
});

export default ShowView;
