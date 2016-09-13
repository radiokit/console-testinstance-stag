import React from 'react';
import Immutable from 'immutable';

import RecordHelper from '../../../helpers/record_helper.js';
import Toolbar from '../../../widgets/admin/toolbar_widget.jsx';
import CreateModal from '../../../widgets/admin/crud/create_modal.jsx';
import UpdateModal from '../../../widgets/admin/crud/update_modal.jsx';
import DeleteModal from '../../../widgets/admin/crud/delete_modal.jsx';
import ToolbarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolbarButtonModal from '../../../widgets/admin/toolbar_button_modal_widget.jsx';
import ToolbarButton from '../../../widgets/admin/toolbar_button_widget.jsx';
import ClientCreateAcknowledgement from './ClientCreateAcknowledgement.jsx';
import Counterpart from 'counterpart';
import RadioKit from '../../../services/RadioKit';

Counterpart.registerTranslations('en', require('./DevicesToolbar.locale.en.js'));
Counterpart.registerTranslations('pl', require('./DevicesToolbar.locale.pl.js'));

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
      'Device.Client': 'client',
      'Topology.AudioLink': 'link',
    })[this.props.selectedRecord.model];

    return `apps.electron.patchbay.toolbar.modals.${modalType}.${prefix}`;
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
    if (element.model === 'Device.Client') {
      return {
        name: {
          type: 'string',
          value: element.record ? element.record.get('name') : '',
        },
      };
    }

    if (element.model === 'Resource.AudioInterface') {
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

    if (element.model === 'Topology.AudioLink') {
      return {
        // audio_type: {
        //   type: 'toggle',
        //   checked: RecordHelper.getExtra(this.props.selectedRecord.record, ['electron', 'audio_type'], 'generic'),
        //   toggleOptions: {
        //     generic: {
        //       label: Counterpart.translate('apps.electron.patchbay.toolbar.modals.update.form.audio_type.values.generic'),
        //       value: 'generic',
        //     },
        //     voice: {
        //       label: Counterpart.translate('apps.electron.patchbay.toolbar.modals.update.form.audio_type.values.voice'),
        //       value: 'voice',
        //     },
        //   },
        //   fieldValueFunc: (params, value) => {
        //     console.log("A", params, value);
        //     return RecordHelper.setExtra(Immutable.fromJS(params), ['electron', 'audio_type'], value).toJS();
        //   }
        // },
        bitrate: {
          type: 'slider',
          value: RecordHelper.getExtra(this.props.selectedRecord.record, ['electron', 'bitrate'], 64),
          min: 16,
          max: 320,
          fieldValueFunc: (params, value) =>
            // It is very important that value is integer. So we do parseInt()
            // Otherwise the standalone client application may crash.
            RecordHelper.setExtra(Immutable.fromJS(params), ['electron', 'bitrate'], parseInt(value)).toJS(),
        },
        latency: {
          type: 'slider',
          value: RecordHelper.getExtra(this.props.selectedRecord.record, ['electron', 'latency'], 100),
          min: 10,
          max: 5000,
          fieldValueFunc: (params, value) =>
            // It is very important that value is integer. So we do parseInt()
            // Otherwise the standalone client application may crash.
            RecordHelper.setExtra(Immutable.fromJS(params), ['electron', 'latency'], parseInt(value)).toJS(),
        },
        dataloss: {
          type: 'slider',
          value: RecordHelper.getExtra(this.props.selectedRecord.record, ['electron', 'dataloss'], 10),
          min: 0,
          max: 100,
          hint: true,
          fieldValueFunc: (params, value) =>
            // It is very important that value is integer. So we do parseInt()
            // Otherwise the standalone client application may crash.
            RecordHelper.setExtra(Immutable.fromJS(params), ['electron', 'dataloss'], parseInt(value)).toJS(),
        },
        peer_to_peer: {
          type: 'toggle',
          checked: RecordHelper.getExtra(this.props.selectedRecord.record, ['electron', 'peer_to_peer'], 'true'),
          toggleOptions: {
            true: {
              label: Counterpart.translate('apps.electron.patchbay.toolbar.modals.update.form.peer_to_peer.values.true'),
              value: 'true',
            },
            false: {
              label: Counterpart.translate('apps.electron.patchbay.toolbar.modals.update.form.peer_to_peer.values.false'),
              value: 'false',
            },
          },
          toggleFields: ['sender_ip', 'sender_control_port', 'receiver_ip', 'receiver_data_port', 'receiver_control_port'],
          fieldValueFunc: (params, value) =>
            RecordHelper.setExtra(Immutable.fromJS(params), ['electron', 'peer_to_peer'], value).toJS(),
        },
        sender_ip: {
          type: 'string',
          value: RecordHelper.getExtra(this.props.selectedRecord.record, ['electron', 'sender_ip'], 1025),
          visibility: this.getManualSettingsVisibility('peer_to_peer'),
          fieldValueFunc: (params, value) =>
            RecordHelper.setExtra(Immutable.fromJS(params), ['electron', 'sender_ip'], value).toJS(),
        },
        sender_control_port: {
          type: 'string',
          value: RecordHelper.getExtra(this.props.selectedRecord.record, ['electron', 'sender_control_port'], 1025),
          visibility: this.getManualSettingsVisibility('peer_to_peer'),
          fieldValueFunc: (params, value) =>
            RecordHelper.setExtra(Immutable.fromJS(params), ['electron', 'sender_control_port'], value).toJS(),
        },
        receiver_ip: {
          type: 'string',
          value: RecordHelper.getExtra(this.props.selectedRecord.record, ['electron', 'receiver_ip'], 1025),
          visibility: this.getManualSettingsVisibility('peer_to_peer'),
          fieldValueFunc: (params, value) =>
            RecordHelper.setExtra(Immutable.fromJS(params), ['electron', 'receiver_ip'], value).toJS(),
        },
        receiver_data_port: {
          type: 'string',
          value: RecordHelper.getExtra(this.props.selectedRecord.record, ['electron', 'receiver_data_port'], 1025),
          visibility: this.getManualSettingsVisibility('peer_to_peer'),
          fieldValueFunc: (params, value) =>
            RecordHelper.setExtra(Immutable.fromJS(params), ['electron', 'receiver_data_port'], value).toJS(),
        },
        receiver_control_port: {
          type: 'string',
          value: RecordHelper.getExtra(this.props.selectedRecord.record, ['electron', 'receiver_control_port'], 1025),
          visibility: this.getManualSettingsVisibility('peer_to_peer'),
          fieldValueFunc: (params, value) =>
            RecordHelper.setExtra(Immutable.fromJS(params), ['electron', 'receiver_control_port'], value).toJS(),
        },
      };
    }

    return {};
  },

  getActivateDeactivateButtonLabelKey() {
    const selectedRecord = this.props.selectedRecord;
    let activeKey = 'not_selected';

    if (selectedRecord.model === 'Topology.AudioLink') {
      activeKey = selectedRecord.record.get('active') ? 'disable' : 'enable';
    }

    return `apps.electron.patchbay.toolbar.audiolink.active.${activeKey}`;
  },

  toggleAudioLink() {
    RadioKit
      .record('jungle', 'Topology.AudioLink', this.props.selectedRecord.record.get('id'))
      .on('loaded', () => {
        this.props.onUpdateSuccess();
      })
      .update({ active: !this.props.selectedRecord.record.get('active') });
  },

  getManualSettingsVisibility(fieldName) {
    const setting = RecordHelper.getExtra(this.props.selectedRecord.record, ['electron', fieldName]);

    if (setting !== 'true') {
      return 'none';
    }

    return 'block';
  },

  render() {
    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarButtonModal
            icon="plus"
            labelTextKey="apps.electron.patchbay.toolbar.client.create"
            modalElement={CreateModal}
            modalProps={{
              contentPrefix: 'apps.electron.patchbay.index.modals.create',
              form: this.buildNewForm(),
              app: 'auth',
              model: 'Client.Standalone',
              acknowledgementElement: ClientCreateAcknowledgement,
            }}
          />
          <ToolbarButtonModal
            icon="folder"
            labelTextKey="apps.electron.patchbay.toolbar.client.edit"
            disabled={this.props.selectedRecord.record === null}
            modalElement={UpdateModal}
            key={(this.props.selectedRecord && this.props.selectedRecord.id || 'no-id') }
            modalProps={{
              contentPrefix: 'apps.electron.patchbay.toolbar.modals.update',
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
            hintTooltipKey="apps.electron.patchbay.toolbar.client.delete"
            modalProps={{
              contentPrefix: this.getTranslationPrefix('delete'),
              app: this.props.selectedRecord.app,
              model: this.props.selectedRecord.model,
              selectedRecordIds: this.props.selectedRecord
                ? Immutable.List.of(this.props.selectedRecord.id)
                : Immutable.List.of(null),
            }}
          />
          <ToolbarButton
            icon="power"
            labelTextKey={ this.getActivateDeactivateButtonLabelKey() }
            disabled={this.props.selectedRecord.model !== 'Topology.AudioLink'}
            onClick={this.toggleAudioLink}
          />
        </ToolbarGroup>

      </Toolbar>
    );
  },
});

export default DevicesToolbar;
