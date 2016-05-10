import React from 'react';
import Immutable from 'immutable';
import Moment from 'moment';
import Counterpart from 'counterpart';

import CreateModal from '../../../widgets/admin/crud/create_modal.jsx';
import UpdateModal from '../../../widgets/admin/crud/update_modal.jsx';
import DeleteModal from '../../../widgets/admin/crud/delete_modal.jsx';
import ToolbarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolbarButtonModal from '../../../widgets/admin/toolbar_button_modal_widget.jsx';

Counterpart.registerTranslations('en', require('./playlist_toolbar_en.js'));
Counterpart.registerTranslations('pl', require('./playlist_toolbar_pl.js'));

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
      availableVaultFiles: new Immutable.Seq().toIndexedSeq(),
    };
  },

  componentDidMount() {
    this.props.data
      .query('vault', 'Data.Record.File')
      .select('id', 'name')
      .on('error', () => {
        this.setState({
          loadingError: true,
        });
      }).on('fetch', (_event, _query, data) => {
        if (data.count() !== 0) {
          this.setState({
            availableVaultFiles: data.toIndexedSeq(),
          });
        }
      }).fetch();
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
    return (
      <ToolbarGroup position="right">
        <ToolbarButtonModal
          icon="plus"
          labelTextKey="apps.broadcast.playlist.add_button"
          modalElement={CreateModal}
          modalProps={{
            contentPrefix: 'apps.broadcast.playlist.add',
            form: this.buildNewForm(),
            app: 'plumber',
            model: 'Media.Input.File.RadioKit.Vault',
            afterFormAccept: this.props.onCRUD,
          }}
        />

        <ToolbarButtonModal
          icon="folder"
          labelTextKey="apps.broadcast.playlist.update_button"
          disabled={this.props.activeItem === null}
          modalElement={UpdateModal}
          key={(this.props.activeItem && this.props.activeItem.get('id')) || 'no-id' }
          modalProps={{
            contentPrefix: 'apps.broadcast.playlist.update',
            form: this.buildUpdateForm(),
            app: 'plumber',
            model: 'Media.Input.File.RadioKit.Vault',
            recordId: (this.props.activeItem ? this.props.activeItem.get('id') : null),
            afterFormAccept: this.props.onCRUD,
          }}
        />

        <ToolbarButtonModal
          icon="delete"
          labelTextKey="apps.broadcast.playlist.delete_button"
          disabled={this.props.activeItem === null}
          modalElement={DeleteModal}
          modalProps={{
            contentPrefix: 'apps.broadcast.playlist.delete',
            app: 'plumber',
            model: 'Media.Input.File.RadioKit.Vault',
            selectedRecordIds: (this.props.activeItem
              ? Immutable.List.of(this.props.activeItem.get('id'))
              : Immutable.List.of(null)),
            afterFormAccept: this.onDelete,
          }}
        />
      </ToolbarGroup>
    );
  },
});

export default PlaylistToolbar;
