import React from 'react';
import connectPlayer from './file_player/file_player_store_connector.jsx';
import FilePlayerStore, {
  State,
} from './file_player/file_player_store';

const TableCellPlayButton = React.createClass({
  propTypes: {
    record: React.PropTypes.object,
    player: React.PropTypes.object,
    value: React.PropTypes.object,
  },

  onPlayClick() {
    const playerState = this.props.player.get('state');

    if (this.props.record.get('id') === this.props.player.getIn(['source', 'id'])) {
      if (playerState === State.playing) {
        FilePlayerStore.pause();
      } else {
        FilePlayerStore.play();
      }
    } else {
      FilePlayerStore.setSource(
        this.props.record.set('metadata_schemas', this.props.value)
      );

      FilePlayerStore.play();
    }
  },

  isPlaying() {
    return (
      this.props.player.get('state') === State.playing &&
      this.props.record.get('id') === this.props.player.getIn(['source', 'id'])
    );
  },

  render() {
    return (
      <button
        type="button"
        className="btn btn-default-light"
        onClick={this.onPlayClick}
      >
        <i className={`mdi mdi-${this.isPlaying() ? 'pause' : 'play'}`} />
      </button>
    );
  },
});

export default connectPlayer(TableCellPlayButton);
