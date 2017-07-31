import React, { PropTypes } from 'react';
import Counterpart from 'counterpart';

import Loading from '../../widgets/general/loading_widget.jsx';
import Alert from '../../widgets/admin/alert_widget.jsx';
import RadioKit from '../../services/RadioKit.js';

Counterpart.registerTranslations('en', require('./app.locale.en.js'));
Counterpart.registerTranslations('pl', require('./app.locale.pl.js'));

export default React.createClass({
  propTypes: {
    children: PropTypes.node.isRequired,
  },

  contextTypes: {
    currentUser: PropTypes.object.isRequired,
  },


  childContextTypes: {
    currentTagItemId: PropTypes.string,
    currentRepositoryId: PropTypes.string,
  },


  getInitialState() {
    return {
      currentTagItemId: null,
      currentRepositoryId: null,
      error: null,
      loaded: false,
    };
  },

  getChildContext() {
    return {
      currentTagItemId: this.state.currentTagItemId,
      currentRepositoryId: this.state.currentRepositoryId,
    };
  },

  componentDidMount() {
    this.queryTagItemId();
  },

  onQuerySuccess(_a, _b, data) {
    if (!data || !data.size) {
      this.setState({
        loaded: true,
        error: 'notfound',
      });
    } else {
      const tagItemMetadata = data.first();

      this.setState({
        loaded: true,
        error: null,
        currentTagItemId: tagItemMetadata.getIn(['tag_item', 'id'], null),
        currentRepositoryId: tagItemMetadata.getIn(['metadata_schema', 'record_repository_id'], null),
      });
    }
  },

  onQueryFailure() {
    this.setState({
      loaded: true,
      error: 'connection',
    });
  },

  queryTagItemId() {
    RadioKit
      .query('vault', 'Data.Metadata.Item')
      .select(
        'id',
        'tag_item.id',
        'metadata_schema.record_repository_id'
      )
      .joins('tag_item')
      .joins('metadata_schema')
      .where('metadata_schema.key', 'eq', 'author_email')
      .where('value_string', 'eq', this.context.currentUser.get('email'))
      .on('fetch', this.onQuerySuccess)
      .on('error', this.onQueryFailure)
      .fetch();
  },

  render() {
    if (this.state.loaded === false) {
      return (
        <Loading
          info
          infoTextKey="apps.dj.loading"
        />
      );
    } else if (this.state.error) {
      const key = ({
        connection: 'general.errors.communication.general',
        notfound: 'apps.dj.errors.not_found',
      })[this.state.error];

      return <Alert type="error" infoTextKey={key} />;
    }

    return this.props.children;
  },
});
