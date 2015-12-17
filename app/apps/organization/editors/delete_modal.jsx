import React from 'react';
import Translate from 'react-translate-component';

import ModalForEach from '../../../widgets/admin/modal_foreach_widget.jsx';


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
    window.data.record("auth", "Editor", recordId)
      // .on("error", this.onDeleteError) // TODO
      .on("loaded", this.onDeleteSuccess)
      .destroy();
  },


  render: function() {
    return (
      <ModalForEach ref="modal" onPerform={this.onPerform} contentPrefix="apps.organization.editors.index.modals.delete" warning="irreversible" proceedType="danger" recordIds={this.props.selectedRecordIds} index={this.state.index}>
        <div>
          <Translate component="p" content="apps.organization.editors.index.modals.delete.message.confirmation" count={this.props.selectedRecordIds.count()} />
        </div>

        <div>
          <Translate component="p" content="apps.organization.editors.index.modals.delete.message.progress" />
        </div>

        <div>
          <Translate component="p" content="apps.organization.editors.index.modals.delete.message.acknowledgement" count={this.props.selectedRecordIds.count()} />
        </div>
      </ModalForEach>
    );
  }
});
