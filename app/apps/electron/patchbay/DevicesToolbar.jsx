import React from 'react';
import Immutable from 'immutable';

import RecordHelper from '../../../helpers/record_helper.js';
import Toolbar from '../../../widgets/admin/toolbar_widget.jsx';
import CreateModal from '../../../widgets/admin/crud/create_modal.jsx';
import UpdateModal from '../../../widgets/admin/crud/update_modal.jsx';
import DeleteModal from '../../../widgets/admin/crud/delete_modal.jsx';
import ToolbarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolbarButtonModal from '../../../widgets/admin/toolbar_button_modal_widget.jsx';
import ClientCreateAcknowledgement from './ClientCreateAcknowledgement.jsx';
import Counterpart from 'counterpart';

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
        name: {
          type: 'string',
          hint: true,
          validators: {
            presence: true,
          },
        },
        audio_type: {
          type: 'toggle',
          checked: RecordHelper.getExtra(this.props.selectedRecord.record, ['electron', 'audio_type'], 'generic'),
          toggleOptions: {
            generic: {
              label: Counterpart.translate('apps.electron.patchbay.toolbar.modals.update.form.audio_type.values.generic'),
              value: 'generic',
            },
            voice: {
              label: Counterpart.translate('apps.electron.patchbay.toolbar.modals.update.form.audio_type.values.voice'),
              value: 'voice',
            },
          },
          fieldValueFunc: (params, value) =>
            RecordHelper.setExtra(Immutable.fromJS(params), ['electron', 'audio_type'], value).toJS(),
        },
        bitrate: {
          type: 'slider',
          value: RecordHelper.getExtra(this.props.selectedRecord.record, ['electron', 'bitrate'], 64),
          min: 8,
          max: 500,
          fieldValueFunc: (params, value) =>
            RecordHelper.setExtra(Immutable.fromJS(params), ['electron', 'bitrate'], value).toJS(),
        },
        latency: {
          type: 'slider',
          value: RecordHelper.getExtra(this.props.selectedRecord.record, ['electron', 'latency'], 100),
          min: 10,
          max: 5000,
          fieldValueFunc: (params, value) =>
            RecordHelper.setExtra(Immutable.fromJS(params), ['electron', 'latency'], value).toJS(),
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
        </ToolbarGroup>

      </Toolbar>
    );
  },
});

export default DevicesToolbar;
