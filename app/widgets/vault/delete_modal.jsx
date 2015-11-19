import React from 'react';
import Translate from 'react-translate-component';

import Modal from '../../widgets/admin/modal_widget.jsx';


export default React.createClass({
  propTypes: {
    selectedRecordIds: React.PropTypes.object.isRequired,
  },


  show: function() {
    this.refs.modal.show();
  },


  render: function() {
    return (
      <Modal ref="modal" contentPrefix="widgets.vault.file_browser.modals.delete" warning="irreversible">
        <Translate component="p" content="widgets.vault.file_browser.modals.delete.confirmation" count={this.props.selectedRecordIds.count()} />
      </Modal>
    );
  }
});
