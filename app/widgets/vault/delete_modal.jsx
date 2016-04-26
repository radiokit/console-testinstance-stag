import React from 'react';
import Translate from 'react-translate-component';

import ModalForEach from '../../widgets/admin/modal_foreach_widget.jsx';


export default React.createClass({
  propTypes: {
    selectedRecordIds: React.PropTypes.object.isRequired,
    afterFormAccept: React.PropTypes.func,
  },

  getInitialState() {
    return {
      index: 0,
    };
  },

  onDeleteSuccess(record) {
    this.setState({
      index: this.state.index + 1,
    });
    this.props.afterFormAccept();
  },

  onPerform(index, recordId) {
    window.data.record('vault', 'Data.Record.File', recordId)
      // .on('error', this.onDeleteError) // TODO
      .on('loaded', this.onDeleteSuccess)
      .destroy();
  },

  show() {
    this.refs.modal.show();
  },

  render() {
    return (
      <ModalForEach
        ref="modal"
        onPerform={this.onPerform}
        contentPrefix="widgets.vault.file_browser.modals.delete"
        warning="irreversible"
        proceedType="danger"
        recordIds={this.props.selectedRecordIds}
        index={this.state.index}
      >
        <div>
          <Translate
            component="p"
            content="widgets.vault.file_browser.modals.delete.message.confirmation"
            count={this.props.selectedRecordIds.count()}
          />
        </div>

        <div>
          <Translate
            component="p"
            content="widgets.vault.file_browser.modals.delete.message.progress"
          />
        </div>

        <div>
          <Translate
            component="p"
            content="widgets.vault.file_browser.modals.delete.message.acknowledgement"
            count={this.props.selectedRecordIds.count()}
          />
        </div>
      </ModalForEach>
    );
  },
});
