import React from 'react';

import Show from '../../../widgets/admin/crud/show_widget.jsx';

import SidebarPartial from './show_sidebar_partial.jsx';
import ContentPartial from './show_content_partial.jsx';

const ShowView = React.createClass({

  contextTypes: {
    params: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      tagFilter: [],
      stage: null,
    };
  },

  onTagFilterUpdate(filter) {
    this.setState({
      tagFilter: filter,
    });
  },

  buildTabs() {
    return {
      incoming: { element: ContentPartial, props: { stage: "incoming", tagFilter: this.state.tagFilter }},
     ready:    { element: ContentPartial, props: { stage: "ready", tagFilter: this.state.tagFilter }},
      archive:  { element: ContentPartial, props: { stage: "archive", tagFilter: this.state.tagFilter }},
      trash:    { element: ContentPartial, props: { stage: "trash", tagFilter: this.state.tagFilter }},
    };
  },

  buildSideBar() {
    return {
      test: { element: SidebarPartial, props: { tagFilter: this.state.tagFilter, onTagFilterUpdate: this.onTagFilterUpdate }},
    };
  },

  modifyShowQuery(query) {
    return query
      .select("metadata_schemas") // metadata_schemas and tag_categories fields are required by the content partial
      .joins("metadata_schemas")
      .select("tag_categories")
      .joins("tag_categories")
      .select("tag_items")
      .joins("tag_items");
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
        deleteEnabled={false}
      />
    );
  },
});

export default ShowView;
