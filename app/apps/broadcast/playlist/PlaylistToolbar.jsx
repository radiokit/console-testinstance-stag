import React from 'react';

import ToolbarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolbarButtonModal from '../../../widgets/admin/toolbar_button_modal_widget.jsx';
import AddTrackModal from './modals/AddTrackModal.jsx';

const PlaylistToolbar = React.createClass({
  render() {
    // <ToolbarButtonModal
    //   icon="border-color"
    //   labelTextKey="apps.broadcast.playlist.toolbar.update_button"
    //   modalElement={null}
    //   modalProps={{
    //
    //   }}
    // />
    // <ToolbarButtonModal
    //   icon="delete"
    //   labelTextKey="apps.broadcast.playlist.toolbar.delete_button"
    //   disabled={false}
    //   modalElement={null}
    //   modalProps={{
    //
    //   }}
    // />
    return (
      <ToolbarGroup>
        <ToolbarButtonModal
          icon="plus"
          labelTextKey="apps.broadcast.playlist.toolbar.add_button"
          modalElement={AddTrackModal}
          modalProps={{}}
        />
      </ToolbarGroup>
    );
  },
});

export default PlaylistToolbar;
