import React from 'react';
import Translate from 'react-translate-component';

import ProgressBar from '../../widgets/admin/progress_bar_widget.jsx';
import Modal from '../../widgets/admin/modal_widget.jsx';


export default React.createClass({
  propTypes: {
    selectedRecordIds: React.PropTypes.object.isRequired,
  },


  getInitialState: function() {
    return {
      currentRecordIndex: undefined,
    }
  },


  show: function() {
    this.refs.modal.show();
  },


  onProceed: function() {
    this.setState({
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
      <Modal inProgress={this.isInProgress()} onProceed={this.onProceed} onCancel={this.onCancel} ref="modal" contentPrefix="widgets.vault.file_browser.modals.delete" warning="irreversible" proceedType="danger">
        {() => {
          if(this.isInProgress()) {
            return (
              <div>
                <Translate component="p" content="widgets.vault.file_browser.modals.delete.progress" className="text-center" />
                <ProgressBar position={this.state.currentRecordIndex} max={this.props.selectedRecordIds.count()} type="danger" />
              </div>
            );
          } else {
            return (
              <Translate component="p" content="widgets.vault.file_browser.modals.delete.confirmation" count={this.props.selectedRecordIds.count()} />
            );
          }
        }()}
      </Modal>
    );
  }
});
