import React from 'react';

import {
  State,
} from './file_player_store';

const FilePlayerAudioWidget = React.createClass({
  propTypes: {
    source: React.PropTypes.string,
    onPlay: React.PropTypes.func,
    onPause: React.PropTypes.func,
    onEnd: React.PropTypes.func,
    onError: React.PropTypes.func,
    onAbort: React.PropTypes.func,
  },

  shouldComponentUpdate(newProps) {
    return this.props.source !== newProps.source;
  },

  componentDidUpdate() {
    if (this.refs.audio) {
      this.refs.audio.load();
    }
  },

  changeTagState(newState) {
    if (!this.refs.audio) {
      return;
    }

    switch (newState) {
      case State.playing:
        this.refs.audio.play();
        break;
      case State.paused:
        this.refs.audio.pause();
        break;
      default:
    }
  },

  render() {
    return (
      <audio
        controls
        ref="audio"
        onPlay={this.props.onPlay}
        onPause={this.props.onPause}
        onEnded={this.props.onEnd}
        onError={this.props.onError}
        onAbort={this.props.onAbort}
      >
        <source
          src={this.props.source}
          type="audio/mpeg"
        />
      </audio>
    );
  },
});

export default FilePlayerAudioWidget;
