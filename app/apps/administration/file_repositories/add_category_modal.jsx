import React from 'react';
import Translate from 'react-translate-component';

import Modal from '../../../widgets/admin/modal_widget.jsx';


export default React.createClass({
  propTypes: {
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

  onTagAppliedSucess: function(record) {
    this.setState({
      index: this.state.index + 1
    });
  },

  onPerform: function(index, recordId) {
    this.onTagAppliedSucess();
  },


  render: function() {
    return (
      <Modal ref="modal">
        <div>
          hello
        </div>
      </Modal>
    );
  }
});
