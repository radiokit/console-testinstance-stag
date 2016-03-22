import React from 'react';

import Show from '../../../widgets/admin/crud/show_widget.jsx';

import SidebarPartial from './show_sidebar_partial.jsx';
import ContentPartial from './show_content_partial.jsx';


export default React.createClass({

  getInitialState: function(){
    return {
        filter: null,
        tags:[],
    }
  },

  onTagFilterUpdate: function(f){

    this.setState({
      filter: f
    });
  },

  buildTabs: function() {
    return {
      incoming: { element: ContentPartial, props: { stage: "incoming", filter: this.state.filter }},
      ready:    { element: ContentPartial, props: { stage: "ready",  filter: this.state.filter }},
      archive:  { element: ContentPartial, props: { stage: "archive", filter: this.state.filter }},
      trash:    { element: ContentPartial, props: { stage: "trash", filter: this.state.filter }},
    }
  },
  buildSideBar : function(){
    return {
      test: { element: SidebarPartial, props: { tags: this.state.tags, selectedTag:this.state.filter, onTagFilterUpdate: this.onTagFilterUpdate }},
    }
  },

  modifyShowQuery: function(query) {
    return query
      .select("metadata_schemas") // metadata_schemas and tag_categories fields are required by the content partial
      .joins("metadata_schemas")
      .select("tag_categories")
      .joins("tag_categories")
  },


  render: function() {
    return (
      <Show contentPrefix="apps.library.file_repositories" app="vault" model="Data.Record.Repository" showQueryFunc={this.modifyShowQuery} sidebarElement={this.buildSideBar()} contentElement={this.buildTabs()} deleteEnabled={false} />
    );
  }
});
