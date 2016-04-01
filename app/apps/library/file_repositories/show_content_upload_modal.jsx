import React from 'react';
import Translate from 'react-translate-component';

import Modal from '../../../widgets/admin/modal_widget.jsx';
import Upload from '../../../widgets/admin/upload_widget.jsx';

export default React.createClass({

  propTypes: {
    repository: React.PropTypes.object.isRequired,
  },

  render() {
    return (
      <Modal
        ref="modal"
        size="large"
        contentPrefix="widgets.vault.file_browser.modals.upload">
        <Upload repository={this.props.repository} />
      </Modal>
    );
  }
});
