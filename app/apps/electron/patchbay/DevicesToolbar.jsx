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

const DevicesToolbar = React.createClass({
  propTypes: {
    selectedRecord: React.PropTypes.object.isRequired,
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
      'Config.Routing.LinkRule': 'link'
    })[this.props.selectedRecord.model]

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

  buildUpdateForm(client) {
    return {
      name: {
        type: 'string',
        value: client.record ? client.record.get('name') : '',
      },
    };
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
            disabled={this.props.selectedRecord.model !== 'Client.Standalone'}
            modalElement={UpdateModal}
            key={(this.props.selectedRecord && this.props.selectedRecord.id || 'no-id') }
            modalProps={{
              contentPrefix: 'apps.electron.patchbay.modals.update',
              form: this.buildUpdateForm(this.props.selectedRecord),
              app: 'auth',
              model: 'Client.Standalone',
              recordId: (this.props.selectedRecord.record ?
                         this.props.selectedRecord.record.get('id') :
                         'no-id'),
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
                : List.of(null)
            }}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  },
});

export default DevicesToolbar;
