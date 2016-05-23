import React from 'react';
import { Seq, List } from 'immutable';
import Moment from 'moment';
import Counterpart from 'counterpart';

import ScheduleItemModal from '../../../widgets/admin/schedule/schedule_item_modal.jsx';
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

  getInitialState() {
    return {
      loadedFiles: false,
      availableVaultFiles: Seq().toIndexedSeq(),
    };
  },

  componentDidMount() {
    this.props.data
      .query('vault', 'Data.Record.File')
      .select('id', 'name', 'metadata_schemas', 'metadata_items', 'stage')
      .joins('metadata_items')
      .joins('metadata_schemas')
      .where('stage', 'eq', 'current')
      .on('error', () => {
        this.setState({
          loadingError: true,
        });
      }).on('fetch', (_event, _query, data) => {
        if (data.count() !== 0) {
          this.setState({
            availableVaultFiles: this.filterAvailableFiles(data),
          });
        }
      })
      .fetch();
  },

  filterAvailableFiles(data) {
    return data
      .filter((record) => !record.get('metadata_schemas')
        .filter((schema) => schema.get('key') === 'duration')
        .isEmpty());
  },

  onDelete() {
    setTimeout(() => {
      const { onCRUD, onActiveItemChange } = this.props;
      onCRUD && onCRUD();
      onActiveItemChange && onActiveItemChange(null);
    }, 500);
  },

  getFilesData() {
    return this.state.availableVaultFiles.toList().map(file => (
      {
        id: file.get('id'),
        name: file.get('name'),
      }
    ));
  },

  getDateValue(key) {
    return this.props.activeItem ? this.props.activeItem.get(key) : Moment.utc();
  },

  buildNewForm() {
    return {
      file: {
        type: 'object',
        values: this.getFilesData(),
      },
      name: {
        type: 'string',
      },
      start_at: {
        type: 'datetime',
        value: Moment.utc().toISOString(),
      },
      stop_at: {
        type: 'datetime',
        value: Moment.utc().clone().add(1, 'minute').toISOString(),
      },
    };
  },

  buildUpdateForm() {
    return {
      name: {
        type: 'string',
      },
      start_at: {
        type: 'datetime',
        value: Moment(this.getDateValue('start_at')).toISOString(),
      },
      stop_at: {
        type: 'datetime',
        value: Moment(this.getDateValue('stop_at')).toISOString(),
      },
    };
  },

  render() {
    console.log("activeItem: " + this.props.activeItem);
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
            data: this.state.availableVaultFiles,
            contentPrefix: 'playlist_toolbar.add',
            onSuccess: this.props.onCRUD,
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
            data: this.state.availableVaultFiles,
            contentPrefix: 'playlist_toolbar.update',
            app: 'plumber',
            model: 'Media.Input.File.RadioKit.Vault',
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
