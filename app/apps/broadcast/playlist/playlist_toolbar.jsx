import React from 'react';
import { List } from 'immutable';
import Counterpart from 'counterpart';
import connect from 'immview-react-connect';

import ScheduleItemModal from '../../../widgets/admin/schedule/schedule_item_modal.jsx';
import DeleteModal from '../../../widgets/admin/crud/delete_modal.jsx';
import ToolbarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolbarButtonModal from '../../../widgets/admin/toolbar_button_modal_widget.jsx';
import AutoDJAddModal from './autodj_add';
import FilesDomain from '../../../services/FilesDomain';


import translationPL from './playlist_toolbar_pl.js';
import translationEN from './playlist_toolbar_en.js';

Counterpart.registerTranslations('pl', { playlist_toolbar: translationPL });
Counterpart.registerTranslations('en', { playlist_toolbar: translationEN });

const PlaylistToolbar = React.createClass({
  propTypes: {
    data: React.PropTypes.object,
    currentBroadcastChannel: React.PropTypes.object.isRequired,
    offsetStart: React.PropTypes.number.isRequired,
    onOffsetStartChange: React.PropTypes.func,
    onZoomChange: React.PropTypes.func,
    activeItem: React.PropTypes.object,
    onActiveItemChange: React.PropTypes.func,
    onCRUD: React.PropTypes.func,
    availableVaultFiles: React.PropTypes.object,
  },

  filterAvailableFiles(data) {
    return data;
  },

  componentDidMount(){
    FilesDomain.loadFiles();
  },

  onDelete() {
    setTimeout(() => {
      const { onCRUD, onActiveItemChange } = this.props;
      onCRUD && onCRUD();
      onActiveItemChange && onActiveItemChange(null);
    }, 500);
  },

  render() {
    return (
      <ToolbarGroup position="right">

        <ToolbarButtonModal
          icon="folder"
          labelTextKey="playlist_toolbar.add_button"
          modalElement={ScheduleItemModal}
          key={(this.props.activeItem && this.props.activeItem.get('id')) || 'toolbar_add_button_no-id' }
          modalProps={{
            data: this.state.availableVaultFiles,
            contentPrefix: 'apps.broadcast.playlist.edit_button',
            form: this.buildUpdateForm(),
            app: 'plumber',
            model: 'Media.Input.File.Http',
            recordId: (this.props.activeItem ? this.props.activeItem.get('id') : null),
            afterFormAccept: this.props.onCRUD,
          }}
        />

        <ToolbarButtonModal
          icon="plus"
          labelTextKey="playlist_toolbar.add_button"
          modalElement={ScheduleItemModal}
          modalProps={{
            defaultTimeOffset: this.props.offsetStart,
            files: this.props.availableVaultFiles,
            contentPrefix: 'playlist_toolbar.add',
            onSuccess: this.props.onCRUD,
            searchDomain: FilesDomain,
          }}
        />

        <ToolbarButtonModal
          icon="plus"
          labelTextKey="apps.broadcast.playlist.add_dj_button"
          modalElement={AutoDJAddModal}
          modalProps={{
            currentBroadcastChannel: this.props.currentBroadcastChannel.get('id'),
            defaultTimeOffset: this.props.offsetStart,
            afterFormAccept: this.props.onCRUD,
          }}
        />

        <ToolbarButtonModal
          icon="border-color"
          labelTextKey="playlist_toolbar.update_button"
          disabled={this.props.activeItem === null}
          modalElement={ScheduleItemModal}
          modalProps={{
            files: this.props.availableVaultFiles,
            contentPrefix: 'playlist_toolbar.update',
            defaultTimeOffset: this.props.offsetStart,
            record: this.props.activeItem,
            onSuccess: this.props.onCRUD,
            searchDomain: FilesDomain,
          }}
        />

        <ToolbarButtonModal
          icon="delete"
          labelTextKey="playlist_toolbar.delete_button"
          disabled={this.props.activeItem === null}
          modalElement={DeleteModal}
          modalProps={{
            contentPrefix: 'playlist_toolbar.delete',
            app: 'plumber',
            model: 'Media.Input.File.RadioKit.Vault',
            selectedRecordIds: (this.props.activeItem
              ? List.of(this.props.activeItem.get('id'))
              : List.of(null)),
            afterFormAccept: this.onDelete,
          }}
        />
      </ToolbarGroup>
    );
  },
});
export default connect(PlaylistToolbar,
  FilesDomain.map(
    (data) => data
      .get('files')
      .filter((record) => record.get('stage') === 'current')
  ),
  (data) => {
    return {
      availableVaultFiles: data,
    };
  }
);
