import React from 'react';
import Immutable from 'immutable';
import Moment from 'moment';
import { Data } from 'radiokit-api';

import CreateModal from '../../../widgets/admin/crud/create_modal.jsx';
import UpdateModal from '../../../widgets/admin/crud/update_modal.jsx';
import DeleteModal from '../../../widgets/admin/crud/delete_modal.jsx';
import ToolbarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolbarButtonModal from '../../../widgets/admin/toolbar_button_modal_widget.jsx';

const PlaylistToolbar = React.createClass({
  propTypes: {
    data: React.PropTypes.object,
    currentBroadcastChannel: React.PropTypes.object.isRequired,
    offsetStart: React.PropTypes.number.isRequired,
    onOffsetStartChange: React.PropTypes.func,
    onZoomChange: React.PropTypes.func,
    activeItem: React.PropTypes.object.isRequired,
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

  getFilesData() {
    return this.state.availableVaultFiles.toList().map(file => {
      return {
        id: Data.buildRecordGlobalID('vault', 'Data.Record.File', file.get('id')),
        name: file.get('name'),
      };
    });
  },

  getDateValue(key) {
    return this.props.activeItem ? this.props.activeItem.get(key) : Moment.utc();
  },

  buildNewForm() {
    return {
      location: {
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
        value: this.getDateValue('start_at').toISOString(),
      },
      stop_at: {
        type: 'datetime',
        value: this.getDateValue('stop_at').toISOString(),
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
            contentPrefix: 'apps.broadcast.playlist.add_button',
            form: this.buildNewForm(),
            app: 'plumber',
            model: 'Media.Input.File.Http',
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
            contentPrefix: 'apps.broadcast.playlist.edit_button',
            form: this.buildUpdateForm(),
            app: 'plumber',
            model: 'Media.Input.File.Http',
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
            contentPrefix: 'apps.broadcast.playlist.delete_button',
            app: 'plumber',
            model: 'Media.Input.File.Http',
            selectedRecordIds: (this.props.activeItem
              ? Immutable.List.of(this.props.activeItem.get('id'))
              : Immutable.List.of(null)),
            afterFormAccept: this.props.onCRUD,
          }}
        />
      </ToolbarGroup>
    );
  },
});

export default PlaylistToolbar;
