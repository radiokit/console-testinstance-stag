import React from 'react';

import Show from '../../../widgets/admin/crud/show_widget.jsx';
import { List } from 'immutable';

import SidebarPartial from './show_sidebar_partial.jsx';
import ContentPartial from './show_content_partial.jsx';

const ShowView = React.createClass({

  contextTypes: {
    params: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      tagFilter: List(),
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
      incoming: {
        element: ContentPartial, props: {
          stage: 'incoming', tagFilter: this.state.tagFilter,
        },
      },
      current: {
        element: ContentPartial, props: {
          stage: 'current', tagFilter: this.state.tagFilter,
        },
      },
      archive: {
        element: ContentPartial, props: {
          stage: 'archive', tagFilter: this.state.tagFilter,
        },
      },
      trash: {
        element: ContentPartial, props: {
          stage: 'trash', tagFilter: this.state.tagFilter,
        },
      },
    };
  },

  buildSideBar() {
    return {
      test: {
        element: SidebarPartial,
        props: {
          tagFilter: this.state.tagFilter,
          onTagFilterUpdate: this.onTagFilterUpdate,
        },
      },
    };
  },

  modifyShowQuery(query) {
    return query
      .select(
        'metadata_schemas.id',
        'metadata_schemas.name',
        'metadata_schemas.key',
        'metadata_schemas.kind',
        'metadata_schemas.tag_category_id',
      ) // metadata_schemas and tag_categories fields are required by the content partial
      .joins('metadata_schemas')
      .select('tag_categories.id', 'tag_categories.name')
      .joins('tag_categories')
      .select('tag_items.id', 'tag_items.name', 'tag_items.tag_category_id')
      .joins('tag_items');
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
