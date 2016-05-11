import React from 'react';

import CreateModal from '../../../widgets/admin/crud/create_modal.jsx';
import ToolbarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolbarButton from '../../../widgets/admin/toolbar_button_widget.jsx';
import ToolbarButtonModal from '../../../widgets/admin/toolbar_button_modal_widget.jsx';
import IndexCreateAcknowledgement from './IndexCreateAcknowledgement.jsx';

const DevicesToolbar = React.createClass({
  propTypes: {
    selectedLinkRule: React.PropTypes.object,
    selectedClient: React.PropTypes.object,
    onDeleteClick: React.PropTypes.func,
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
        <ToolbarButton icon="delete" disabled={this.props.selectedLinkRule === null && this.props.selectedClient === null} onClick={this.props.onDeleteClick} />
      </ToolbarGroup>
    );
  },
});

export default DevicesToolbar;
