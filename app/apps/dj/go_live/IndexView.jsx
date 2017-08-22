import React, { PropTypes } from 'react';

import Loading from '../../../widgets/general/loading_widget.jsx';
import Alert from '../../../widgets/admin/alert_widget.jsx';
import RadioKit from '../../../services/RadioKit.js';
import './IndexView.scss';

export default React.createClass({
  contextTypes: {
    currentTagItemId: PropTypes.string.isRequired,
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

      this.setState({
        loaded: true,
        error: null,
        playoutUrl: playoutMetadata.get('value_string'),
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

  queryMetadataPlayoutUrl() {
    RadioKit
      .query('vault', 'Data.Metadata.Item')
      .select('id', 'value_string')
      .joins('tag_item')
      .joins('metadata_schema')
      .where('metadata_schema.key', 'eq', 'playout-url')
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
        <iframe src={this.state.playoutUrl} />
      </div>
    );
  },
});
