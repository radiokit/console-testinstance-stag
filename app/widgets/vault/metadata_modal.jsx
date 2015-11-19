import React from 'react';
import Translate from 'react-translate-component';

import ModalForEach from '../../widgets/admin/modal_foreach_widget.jsx';


export default React.createClass({
  propTypes: {
    selectedRecordIds: React.PropTypes.object.isRequired,
  },


  getInitialState: function() {
    return {
      index: 0
    }
  },


  show: function() {
    this.refs.modal.show();
  },


  onDeleteSuccess: function(record) {
    this.setState({
      index: this.state.index + 1
    });
  },


  onPerform: function(index, recordId) {

  },


  render: function() {
    return (
      <ModalForEach ref="modal" onPerform={this.onPerform} contentPrefix="widgets.vault.file_browser.modals.metadata" recordIds={this.props.selectedRecordIds} index={this.state.index}>
        <div>
          <Translate component="p" content="widgets.vault.file_browser.modals.metadata.message.confirmation" count={this.props.selectedRecordIds.count()} />
        </div>

        <div>
          <Translate component="p" content="widgets.vault.file_browser.modals.metadata.message.progress" />
        </div>

        <div>
          <Translate component="p" content="widgets.vault.file_browser.modals.metadata.message.acknowledgement" count={this.props.selectedRecordIds.count()} />
        </div>

        <div>
          <Translate component="p" content="widgets.vault.file_browser.modals.metadata.message.cancelled" />
        </div>
      </ModalForEach>
    );
  }
});
