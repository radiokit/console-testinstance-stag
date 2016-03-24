import React from 'react';
import Translate from 'react-translate-component';

import Modal from '../../../widgets/admin/modal_widget.jsx';


export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    selectedRecordIds: React.PropTypes.object.isRequired,
    tagCategories: React.PropTypes.object.isRequired,
  },

  getInitialState: function() {
    return {
      index: 0
    }
  },

  show: function() {
    this.refs.modal.show();
  },

  onConfirm: function(){

  },

  onCancel: function(){

  },

  render: function() {
    return (
      <Modal ref="modal" size="normal" contentPrefix={"apps.administration.file_repositories"} onConfirm={this.onConfirm} onCancel={this.onCancel} warning="irreversible" proceedType="danger">
        <div className="modal-body">
          <Translate component="p" content={this.props.contentPrefix + ".info.confirm_delete"}/>
          <Translate component="button" content={this.props.contentPrefix + ".modals.action.delete"} role="button" className="btn btn-danger" />
          <Translate component="button" content={this.props.contentPrefix + ".modals.action.cancel"} role="button" className="btn btn-default" />
        </div>
      </Modal>
    );
  }
});
