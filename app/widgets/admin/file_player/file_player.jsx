import React from 'react';
import classNames from 'classnames';

import PlayerStore, {
  State,
} from './file_player_store';
import connectPlayer from './file_player_store_connector.jsx';
import AudioWidget from './file_player_audio_widget.jsx';
import './file_player.scss';

const FilePlayer = React.createClass({
  propTypes: {
    player: React.PropTypes.object,
  },

  getInitialState() {
    return {
      expanded: true,
    };
  },

  componentWillReceiveProps(newProps) {
    if (
      newProps.player.get('state') !== State.hidden &&
      this.props.player.get('state') === State.hidden &&
      !this.state.expanded
    ) {
      this.setState({
        expanded: true,
      });
    }
  },

  componentDidUpdate() {
    if (this.refs.audioWidget) {
      this.refs.audioWidget.changeTagState(this.props.player.get('state'));
    }
  },

  onPlay() {
    PlayerStore.play();
  },

  onPause() {
    PlayerStore.pause();
  },

  onEnd() {
    PlayerStore.pause();
  },

  onError() {
    // eslint-disable-next-line no-console
    console.error('Error occured when playing audio file');
    PlayerStore.markAsErroneus();
  },

  toggleExpand() {
    this.setState({
      expanded: !this.state.expanded,
    });
  },

  closePlayer() {
    PlayerStore.clear();
  },

  render() {
    const playerState = this.props.player;

    if (playerState.get('state') === State.hidden) {
      return (<noscript />);
    }

    return (
      <div className={classNames('fileplayer', { 'fileplayer--expanded': this.state.expanded })}>
        <div className="fileplayer-buttons">
          <button
            type="button"
            className="fileplayer-buttons-closeButton"
            onClick={this.closePlayer}
          >
            <i className="mdi mdi-close" />
          </button>
          <button
            type="button"
            className="fileplayer-buttons-expandButton"
            onClick={this.toggleExpand}
          >
            <i className={`mdi mdi-chevron-${(this.state.expanded ? 'right' : 'left')}`} />
          </button>
        </div>
        <div className="fileplayer-content">
          <h5 className="fileplayer-title">{playerState.getIn(['source', 'name'])}</h5>
          <AudioWidget
            onPlay={this.onPlay}
            onPause={this.onPause}
            onEnd={this.onEnd}
            onError={this.onError}
            onAbort={this.onAbort}
            ref="audioWidget"
            source={playerState.getIn(['source', 'url'])}
          />
        </div>
      </div>
    );
  },
});

export default connectPlayer(FilePlayer);
