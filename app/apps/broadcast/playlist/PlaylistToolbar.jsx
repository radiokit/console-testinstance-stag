import React, { PropTypes } from 'react';

import ToolbarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolbarButtonModal from '../../../widgets/admin/toolbar_button_modal_widget.jsx';
import DeleteModal from '../../../widgets/admin/crud/delete_modal.jsx';
import AddTrackModal from './modals/AddTrackModal.jsx';
import 'whatwg-fetch';

export default React.createClass({
  propTypes: {
    offset: PropTypes.number.isRequired,
    selectedRecordIds: PropTypes.object.isRequired,
    reloadData: PropTypes.func.isRequired,
    app: PropTypes.string,
    model: PropTypes.string,
  },


  render() {
    if(this.props.lineupBaseUrl && this.props.lineupChannelId) {
      const that = this;

      return (
        <ToolbarGroup>
          <ToolbarButtonModal
            icon="plus"
            labelTextKey="apps.broadcast.playlist.toolbar.add_button"
            modalElement={AddTrackModal}
            modalProps={{
              onSave: this.props.reloadData,
              offset: this.props.offset,
            }}
          />
          <ToolbarButtonModal
            icon="delete"
            labelTextKey="apps.broadcast.playlist.toolbar.delete_button"
            disabled={!this.props.selectedRecordIds.size}
            modalElement={DeleteModal}
            modalProps={{
              contentPrefix: 'apps.broadcast.playlist.delete',
              performFunc: (index, recordId) => {
                fetch(`${this.props.lineupBaseUrl}/api/lineup/v1.0/channel/${this.props.lineupChannelId}/playlist/track/${recordId}`, {
                  method: 'DELETE',
                }).then(function(response) {
                  return true;
                }).catch(function(error) {
                  return false;
                });
              },
              selectedRecordIds: this.props.selectedRecordIds,
              afterFormAccept: this.props.reloadData,
            }}
          />
        </ToolbarGroup>      
      );

    } else {
      return (
        <ToolbarGroup>
          <ToolbarButtonModal
            icon="plus"
            labelTextKey="apps.broadcast.playlist.toolbar.add_button"
            modalElement={AddTrackModal}
            modalProps={{
              onSave: this.props.reloadData,
              offset: this.props.offset,
            }}
          />
          <ToolbarButtonModal
            icon="delete"
            labelTextKey="apps.broadcast.playlist.toolbar.delete_button"
            disabled={!this.props.selectedRecordIds.size}
            modalElement={DeleteModal}
            modalProps={{
              contentPrefix: 'apps.broadcast.playlist.delete',
              app: this.props.app,
              model: this.props.model,
              selectedRecordIds: this.props.selectedRecordIds,
              afterFormAccept: this.props.reloadData,
            }}
          />
        </ToolbarGroup>      
      );
    }
  }
});
