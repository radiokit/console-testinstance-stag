import React, { PropTypes } from 'react';

import Loading from '../../../widgets/general/loading_widget.jsx';
import Alert from '../../../widgets/admin/alert_widget.jsx';
import RadioKit from '../../../services/RadioKit.js';
import './IndexView.scss';

function encodeJSON(obj) {
  return encodeURIComponent(JSON.stringify(obj));
}

export default React.createClass({
  contextTypes: {
    currentTagItemId: PropTypes.string.isRequired,
    currentTagCategoryId: PropTypes.string.isRequired,
    currentTagItemName: PropTypes.string.isRequired,
    currentRepositoryId: PropTypes.string.isRequired,
  },

  getInitialState() {
    return {
      playoutUrl: '',
      error: null,
      loaded: false,
    };
  },

  componentDidMount() {
    this.queryMetadataPlayoutUrl();
  },

  onQuerySuccess(_event, _record, data) {
    if (!data || !data.size) {
      this.setState({
        loaded: true,
        error: 'notfound',
      });
    } else {
      const playoutMetadata = data.first();

      if (!playoutMetadata.get('value_text')) {
        this.setState({
          loaded: true,
          error: 'notfound',
        });
      }

      this.setState({
        loaded: true,
        error: null,
        playoutUrl: playoutMetadata.get('value_text'),
        playoutMetadataId: playoutMetadata.get('id'),
      });
    }
  },

  onQueryFailure() {
    this.setState({
      loaded: true,
      error: 'connection',
    });
  },

  getPlayoutUrl() {
    const tag = encodeJSON([this.context.currentTagItemId]);
    const tagOptions = encodeJSON([{ tag_category: 'genre', min: 3 }]);
    const metadata = encodeJSON([{
      key: 'series_name',
      value: this.context.currentTagItemName,
    }]);
    const metadataOptions = encodeJSON([
      { key: 'podcast_lead', kind: 'string', required: true },
      { key: 'guest', kind: 'string', required: false },
    ]);
    const playoutUrl = this.state.playoutUrl;

    // eslint-disable-next-line max-len
    return `${playoutUrl}&tag=${tag}&tag_options=${tagOptions}&metadata=${metadata}&metadata_options=${metadataOptions}`;
  },

  queryMetadataPlayoutUrl() {
    RadioKit
      .query('vault', 'Data.Metadata.Item')
      .select('id', 'value_text')
      .joins('tag_item')
      .joins('metadata_schema')
      .where('metadata_schema.key', 'eq', 'playout_url')
      .where('tag_item.id', 'eq', this.context.currentTagItemId)
      .on('fetch', this.onQuerySuccess)
      .on('error', this.onQueryFailure)
      .fetch();
  },

  render() {
    if (this.state.loaded === false) {
      return <Loading info infoTextKey="apps.dj.loading" />;
    }

    if (this.state.error) {
      const key = ({
        connection: 'general.errors.communication.general',
        notfound: 'apps.dj.errors.playout_not_found',
      })[this.state.error];

      return <Alert type="error" infoTextKey={key} />;
    }

    return (
      <div className="Dj-GoLive-indexView">
        <iframe src={this.getPlayoutUrl()} />
      </div>
    );
  },
});
