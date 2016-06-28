import React from 'react';
import {
  List,
} from 'immutable';

import Toolbar from '../../../widgets/admin/toolbar_widget.jsx';
import CreateModal from '../../../widgets/admin/crud/create_modal.jsx';
import UpdateModal from '../../../widgets/admin/crud/update_modal.jsx';
import DeleteModal from '../../../widgets/admin/crud/delete_modal.jsx';
import ToolbarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolbarButtonModal from '../../../widgets/admin/toolbar_button_modal_widget.jsx';
import IndexCreateAcknowledgement from './IndexCreateAcknowledgement.jsx';
import Counterpart from 'counterpart';

const DevicesToolbar = React.createClass({
  propTypes: {
    selectedRecord: React.PropTypes.object.isRequired,
    onUpdateSuccess: React.PropTypes.func,
  },


  contextTypes: {
    currentUserAccount: React.PropTypes.object.isRequired,
  },


  shouldComponentUpdate(nextProps) {
    const selectedRecordId = this.props.selectedRecord.id;
    const newSelectedRecordId = nextProps.selectedRecord.id;
    const selectedRecordName = this.props.selectedRecord.record ?
      this.props.selectedRecord.record.get('name') : '';
    const newSelectedRecordName = nextProps.selectedRecord.record ?
      nextProps.selectedRecord.record.get('name') : '';

    return (
      (selectedRecordId !== newSelectedRecordId) ||
      (selectedRecordName !== newSelectedRecordName)
    );
  },


  getTranslationPrefix(modalType) {
    const prefix = ({
      'Client.Standalone': 'client',
      'Config.Routing.LinkRule': 'link',
    })[this.props.selectedRecord.model];

    return `apps.electron.patchbay.modals.${modalType}.${prefix}`;
  },


  buildNewForm() {
    return {
      name: {
        type: 'string',
        hint: true,
        validators: {
          presence: true,
        },
      },
      application: {
        type: 'hidden',
        value: 'electron',
      },
      account_id: {
        type: 'hidden',
        value: this.context.currentUserAccount.get('id'),
      },
    };
  },

  buildUpdateForm(element) {
    if (element.model === 'Client.Standalone') {
      return {
        name: {
          type: 'string',
          value: element.record ? element.record.get('name') : '',
        },
      };
    }

    if (element.model === 'Resource.Architecture.AudioInterface') {
      return {
        os_name: {
          type: 'skipped',
          value: element.record ? element.record.get('os_name') : '',
        },
        name: {
          type: 'string',
          value: element.record ? element.record.get('name') : '',
        },
      };
    }

    if (element.model === 'Config.Routing.LinkRule') {
      return {
        active: {
          type: 'toggle',
          checked: element.active,
          toggleOptions: {
            true: {
              label: Counterpart.translate('apps.electron.patchbay.modals.update.action.enable'),
              value: 'true',
            },
            false: {
              label: Counterpart.translate('apps.electron.patchbay.modals.update.action.disable'),
              value: 'false',
            },
          },
        },
        bitrate_playback: {
          type: 'slider',
          value: this.props.selectedRecord.record.get('extra') ?
            (this.props.selectedRecord.record.get('extra').get('bitrate_playback') || 8) :
            8,
          min: 8,
          max: 500,
        },
        bitrate_capture: {
          type: 'slider',
          value: this.props.selectedRecord.record.get('extra') ?
            (this.props.selectedRecord.record.get('extra').get('bitrate_playback') || 8) :
            8,
          min: 8,
          max: 500,
        },
        latency_playback: {
          type: 'slider',
          value: this.props.selectedRecord.record.get('extra') ?
            (this.props.selectedRecord.record.get('extra').get('latency_playback') || 10) :
            10,
          min: 10,
          max: 60000,
        },
        latency_capture: {
          type: 'slider',
          value: this.props.selectedRecord.record.get('extra') ?
            (this.props.selectedRecord.record.get('extra').get('latency_capture') || 10) :
            10,
          min: 10,
          max: 60000,
        },
      };
    }

    return {};
  },

  render() {
    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarButtonModal
            icon="plus"
            labelTextKey="apps.electron.patchbay.index.add_button"
            modalElement={CreateModal}
            modalProps={{
              contentPrefix: 'apps.electron.patchbay.index.modals.create',
              form: this.buildNewForm(),
              app: 'auth',
              model: 'Client.Standalone',
              acknowledgementElement: IndexCreateAcknowledgement,
            }}
          />
          <ToolbarButtonModal
            icon="folder"
            labelTextKey="apps.electron.patchbay.update_button"
            disabled={this.props.selectedRecord.record === null}
            modalElement={UpdateModal}
            key={(this.props.selectedRecord && this.props.selectedRecord.id || 'no-id') }
            modalProps={{
              contentPrefix: 'apps.electron.patchbay.modals.update',
              form: this.buildUpdateForm(this.props.selectedRecord),
              app: this.props.selectedRecord.app,
              model: this.props.selectedRecord.model,
              recordId: (this.props.selectedRecord.record ?
                         this.props.selectedRecord.record.get('id') :
                         'no-id'),
              onSuccess: this.props.onUpdateSuccess,
            }}
          />
          <ToolbarButtonModal
            icon="delete"
            disabled={this.props.selectedRecord.record === null}
            modalElement={DeleteModal}
            modalProps={{
              contentPrefix: this.getTranslationPrefix('delete'),
              app: this.props.selectedRecord.app,
              model: this.props.selectedRecord.model,
              selectedRecordIds: this.props.selectedRecord
                ? List.of(this.props.selectedRecord.id)
                : List.of(null),
            }}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  },
});

export default DevicesToolbar;
