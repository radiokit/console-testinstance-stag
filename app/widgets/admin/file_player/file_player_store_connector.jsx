import React from 'react';
import FilePlayerStore from './file_player_store';

const FilePlayerStoreConnector = Element => React.createClass({
  componentWillMount() {
    FilePlayerStore.addUpdateListener(this.updateElement);
  },

  componentWillUnmount() {
    FilePlayerStore.removeUpdateListener(this.updateElement);
  },

  updateElement() {
    this.forceUpdate();
  },

  render() {
    const storeState = FilePlayerStore.getState();

    return (
      <Element {...this.props} player={storeState} />
    );
  },
});

export default FilePlayerStoreConnector;
