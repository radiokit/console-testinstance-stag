import React, { PropTypes } from 'react';

import ToolbarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolbarButtonModal from '../../../widgets/admin/toolbar_button_modal_widget.jsx';
import DeleteModal from '../../../widgets/admin/crud/delete_modal.jsx';
import AddTrackModal from './modals/AddTrackModal.jsx';

const PlaylistToolbar = ({ selectedRecordIds, onDelete }) => (
  <ToolbarGroup>
    <ToolbarButtonModal
      icon="plus"
      labelTextKey="apps.broadcast.playlist.toolbar.add_button"
      modalElement={AddTrackModal}
      modalProps={{}}
    />
    <ToolbarButtonModal
      icon="delete"
      labelTextKey="apps.broadcast.playlist.toolbar.delete_button"
      disabled={!selectedRecordIds.size}
      modalElement={DeleteModal}
      modalProps={{
        contentPrefix: 'apps.broadcast.playlist.delete',
        app: 'plumber',
        model: 'Media.Input.File.RadioKit.Vault',
        selectedRecordIds,
        afterFormAccept: onDelete,
      }}
    />
  </ToolbarGroup>
);

PlaylistToolbar.propTypes = {
  selectedRecordIds: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PlaylistToolbar;
