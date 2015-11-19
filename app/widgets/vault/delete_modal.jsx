import React from 'react';
import Translate from 'react-translate-component';

import ModalProgress from '../../widgets/admin/modal_progress_widget.jsx';


export default React.createClass({
  propTypes: {
    selectedRecordIds: React.PropTypes.object.isRequired,
  },


  getInitialState: function() {
    return {
      step: "confirmation",
      currentRecordIndex: undefined,
    }
  },


  show: function() {
    this.refs.modal.show();
  },


  onConfirm: function() {
    this.setState({
      step: "progress",
      currentRecordIndex: 0,
    });
  },


  onCancel: function() {
    this.setState({
      currentRecordIndex: undefined,
    });
  },


  onDeleteSuccess: function(record) {
    this.setState({
      currentRecordIndex: this.state.currentRecordIndex + 1
    });
  },


  componentDidUpdate: function(prevProps, prevState) {
    if(typeof(this.state.currentRecordIndex) !== "undefined" && this.state.currentRecordIndex !== prevState.currentRecordIndex) {
      if(this.state.currentRecordIndex < this.props.selectedRecordIds.count()) {
        this.deleteRecord();

      } else {
        this.setState({
          step: "acknowledgement"
        });
      }
    }
  },


  deleteRecord: function() {
    let currentRecordId = this.props.selectedRecordIds.get(this.state.currentRecordIndex);

    window.data.record("vault", "Data.Record.File", currentRecordId)
      // .on("error", this.onDeleteError) // TODO
      .on("loaded", this.onDeleteSuccess)
      .destroy();
  },


  isInProgress: function() {
    return typeof(this.state.currentRecordIndex) !== "undefined";;
  },


  render: function() {
    return (
      <ModalProgress ref="modal" onConfirm={this.onConfirm} onCancel={this.onCancel} contentPrefix="widgets.vault.file_browser.modals.delete" warning="irreversible" proceedType="danger" step={this.state.step} progressCurrent={this.state.currentRecordIndex} progressMax={this.props.selectedRecordIds.count()}>
        <div>
          <Translate component="p" content="widgets.vault.file_browser.modals.delete.confirmation" count={this.props.selectedRecordIds.count()} />
        </div>

        <div>
          <Translate component="p" content="widgets.vault.file_browser.modals.delete.progress" className="text-center" />
        </div>

        <div>
          <Translate component="p" content="widgets.vault.file_browser.modals.delete.acknowledgement" count={this.props.selectedRecordIds.count()} />
        </div>
      </ModalProgress>
    );
  }
});
