import React, { PropTypes } from 'react';

import ToolbarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolbarButtonModal from '../../../widgets/admin/toolbar_button_modal_widget.jsx';
import DeleteModal from '../../../widgets/admin/crud/delete_modal.jsx';
import AddTrackModal from './modals/AddTrackModal.jsx';

const PlaylistToolbar = ({ selectedRecordIds, reloadData, offset }) => (
  <ToolbarGroup>
    <ToolbarButtonModal
      icon="plus"
      labelTextKey="apps.broadcast.playlist.toolbar.add_button"
      modalElement={AddTrackModal}
      modalProps={{
        onSave: reloadData,
        offset,
      }}
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
        afterFormAccept: reloadData,
      }}
    />
  </ToolbarGroup>
);

PlaylistToolbar.propTypes = {
  offset: PropTypes.number.isRequired,
  selectedRecordIds: PropTypes.object.isRequired,
  reloadData: PropTypes.func.isRequired,
};

export default PlaylistToolbar;
