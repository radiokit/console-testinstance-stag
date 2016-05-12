import React from 'react';
import Immutable from 'immutable';

import CreateModal from '../../../widgets/admin/crud/create_modal.jsx';
import UpdateModal from '../../../widgets/admin/crud/update_modal.jsx';
import DeleteModal from '../../../widgets/admin/crud/delete_modal.jsx';
import ToolbarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolbarButton from '../../../widgets/admin/toolbar_button_widget.jsx';
import ToolbarButtonModal from '../../../widgets/admin/toolbar_button_modal_widget.jsx';
import IndexCreateAcknowledgement from './IndexCreateAcknowledgement.jsx';

const DevicesToolbar = React.createClass({
  propTypes: {
    selectedLinkRule: React.PropTypes.object,
    selectedClient: React.PropTypes.object,
  },

  contextTypes: {
    currentUserAccount: React.PropTypes.object.isRequired,
  },

  buildNewForm: function() {
    return {
      name: {
        type: "string",
        hint: true,
        validators: {
          presence: true,
        }
      },
      application: {
        type: "hidden",
        value: "electron",
      },
      account_id: {
        type: "hidden",
        value: this.context.currentUserAccount.get("id"),
      },
    }
  },

  buildUpdateForm(client) {
    return {
      name: {
        type: 'string',
        value: client ? client.get("name") : ""
      },
    };
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
            acknowledgementElement: IndexCreateAcknowledgement
          }}
        />
        <ToolbarButtonModal
          icon="folder"
          labelTextKey="apps.electron.patchbay.index.update_button"
          disabled={this.props.selectedClient === null}
          modalElement={UpdateModal}
          key={(this.props.selectedClient && this.props.selectedClient.get('id')) || 'no-id' }
          modalProps={{
            contentPrefix: 'apps.electron.patchbay.index.modals.update',
            form: this.buildUpdateForm(this.props.selectedClient),
            app: 'plumber',
            model: 'Client.Standalone',
            recordId: (this.props.selectedClient ? this.props.selectedClient.get('id') :'no-id'),
          }}
        />
        <ToolbarButtonModal
          icon="delete"
          disabled={this.props.selectedLinkRule === null && this.props.selectedClient === null}
          modalElement={DeleteModal}
          modalProps={{
            contentPrefix: 'apps.broadcast.playlist.delete_button',
            app: 'plumber',
            model: this.props.selectedClient
              ? "Client.Standalone"
              : "Config.Routing.LinkRule",
            selectedRecordIds: this.props.selectedClient
              ? Immutable.List.of(this.props.selectedClient ? this.props.selectedClient.get('id') : this.props.selectedLinkRule.get('id'))
              : Immutable.List.of(null),
            afterFormAccept: this.onDelete,
          }}
        />
      </ToolbarGroup>
    );
  },
});

export default DevicesToolbar;
