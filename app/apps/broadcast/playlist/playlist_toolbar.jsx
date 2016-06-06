import React from 'react';
import { List } from 'immutable';
import Counterpart from 'counterpart';
import connect from 'immview-react-connect';

import ScheduleItemModal from './manual_add/schedule_item_modal.jsx';
import DeleteModal from '../../../widgets/admin/crud/delete_modal.jsx';
import ToolbarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolbarButtonModal from '../../../widgets/admin/toolbar_button_modal_widget.jsx';
import AutoDJAddModal from './autodj_add';

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
          icon="plus"
          labelTextKey="playlist_toolbar.add_button"
          modalElement={ScheduleItemModal}
          modalProps={{
            defaultTimeOffset: this.props.offsetStart,
            contentPrefix: 'playlist_toolbar.add',
            onSuccess: this.props.onCRUD,
          }}
        />

        <ToolbarButtonModal
          icon="plus"
          labelTextKey="playlist_toolbar.add_dj_button"
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
            contentPrefix: 'playlist_toolbar.update',
            defaultTimeOffset: this.props.offsetStart,
            record: this.props.activeItem,
            onSuccess: this.props.onCRUD,
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
export default PlaylistToolbar;
