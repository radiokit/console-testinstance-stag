import React, { PropTypes } from 'react';
import Counterpart from 'counterpart';
import { List } from 'immutable';

import Loading from '../../widgets/general/loading_widget.jsx';
import Alert from '../../widgets/admin/alert_widget.jsx';
import RadioKit from '../../services/RadioKit.js';
import TagItemScope from './tag_item_scope.jsx';

Counterpart.registerTranslations('en', require('./app.locale.en.js'));
Counterpart.registerTranslations('pl', require('./app.locale.pl.js'));

export default React.createClass({
  propTypes: {
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired,
  },

  contextTypes: {
    currentUser: PropTypes.object.isRequired,
  },

  childContextTypes: {
    currentTagItemName: PropTypes.string,
    currentTagItemId: PropTypes.string,
    currentTagCategoryId: PropTypes.string,
    currentRepositoryId: PropTypes.string,
  },

  getInitialState() {
    return {
      availableTagMetadatas: new List([]),
      currentTagItemId: null,
      currentTagItemName: null,
      currentRepositoryId: null,
      error: null,
      loaded: false,
    };
  },

  getChildContext() {
    return {
      currentTagItemName: this.state.currentTagItemName,
      currentTagItemId: this.state.currentTagItemId,
      currentTagCategoryId: this.state.currentTagCategoryId,
      currentRepositoryId: this.state.currentRepositoryId,
    };
  },

  componentDidMount() {
    this.queryTagItemId();
  },

  componentWillReceiveProps(newProps) {
    if (
      (this.props.location.pathname !== newProps.location.pathname) &&
      (this.state.availableTagMetadatas.size > 1) &&
      this.state.currentTagItemId
    ) {
      // if user navigates between DJ subapplications
      // and he has access to more than one tag item 'scope'
      // reset previously picked tag item

      this.setState({ currentTagItemId: null });
    }
  },

  onQuerySuccess(_event, _record, data) {
    if (!data || !data.size) {
      this.setState({
        loaded: true,
        error: 'notfound',
      });
    } else if (data.size === 1) {
      const tagItemMetadata = data.first();

      this.setState({
        loaded: true,
        error: null,
        currentTagItemId: tagItemMetadata.getIn(['tag_item', 'id'], null),
        currentTagItemName: tagItemMetadata.getIn(['tag_item', 'name'], null),
        currentTagCategoryId: tagItemMetadata.getIn(['tag_item', 'tag_category_id'], null),
        currentRepositoryId: tagItemMetadata.getIn(
          ['metadata_schema', 'record_repository_id'],
          null
        ),
      });
    } else {
      this.setState({
        loaded: true,
        error: null,
        availableTagMetadatas: data,
      });
    }
  },

  onQueryFailure() {
    this.setState({
      loaded: true,
      error: 'connection',
    });
  },

  onChooseTagItem(tagItemMetadata) {
    this.setState({
      currentTagItemId: tagItemMetadata.getIn(['tag_item', 'id'], null),
      currentTagItemName: tagItemMetadata.getIn(['tag_item', 'name'], null),
      currentTagCategoryId: tagItemMetadata.getIn(['tag_item', 'tag_category_id'], null),
      currentRepositoryId: tagItemMetadata.getIn(
        ['metadata_schema', 'record_repository_id'],
        null
      ),
    });
  },

  queryTagItemId() {
    RadioKit
      .query('vault', 'Data.Metadata.Item')
      .select(
        'id',
        'value_string',
        'tag_item.id',
        'tag_item.name',
        'tag_item.tag_category_id',
        'metadata_schema.record_repository_id',
        'metadata_schema.key',
      )
      .joins('tag_item')
      .joins('metadata_schema')
      .where('metadata_schema.key', 'in', 'author_email author_emails')
      .where('value_string', 'like', `%${this.context.currentUser.get('email')}%`)
      .on('fetch', this.onQuerySuccess)
      .on('error', this.onQueryFailure)
      .fetch();
  },

  renderTagItemPicker() {
    return (
      <TagItemScope
        availableTagMetadatas={this.state.availableTagMetadatas}
        onChooseTagItem={this.onChooseTagItem}
      />
    );
  },

  render() {
    if (this.state.loaded === false) {
      return <Loading info infoTextKey="apps.dj.loading" />;
    }

    if (this.state.error) {
      const key = ({
        connection: 'general.errors.communication.general',
        notfound: 'apps.dj.errors.not_found',
      })[this.state.error];

      return <Alert type="error" infoTextKey={key} />;
    }

    if (!this.state.currentTagItemId) {
      return this.renderTagItemPicker();
    }

    return this.props.children;
  },
});
