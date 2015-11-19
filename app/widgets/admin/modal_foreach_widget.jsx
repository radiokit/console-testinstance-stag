import React from 'react';
import Translate from 'react-translate-component';

import ModalProgress from '../../widgets/admin/modal_progress_widget.jsx';


export default React.createClass({
  propTypes: {
    index: React.PropTypes.number.isRequired,
    recordIds: React.PropTypes.object.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
    onPerform: React.PropTypes.func.isRequired,
    warning: React.PropTypes.oneOf(['irreversible']),
    proceedType: React.PropTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger']),
  },


  getInitialState: function() {
    return {
      step: "confirmation"
    }
  },


  show: function() {
    this.setState({
      step: "confirmation"
    }, () => {
      this.refs.modal.show();
    });
  },


  onConfirm: function() {
    this.setState({
      step: "progress",
    });
  },


  onCancel: function() {
    this.setState({
      step: "cancelled"
    })
  },


  componentWillReceiveProps: function(nextProps) {
    if(nextProps.index > this.props.index) {
      if(nextProps.index < nextProps.recordIds.count()) {
        if(this.state.step === "progress") { // it may have been cancelled in the meantime
          let currentRecordId = this.props.recordIds.get(nextProps.index);
          nextProps.onPerform(nextProps.index, currentRecordId);
        } 

      } else {
        this.setState({
          step: "acknowledgement"
        });
      }
    }
  },


  componentDidUpdate: function(prevProps, prevState) {
    if(prevState.step === "confirmation" && this.state.step === "progress") {
      let currentRecordId = this.props.recordIds.get(this.props.index);
      this.props.onPerform(this.props.index, currentRecordId);
    }
  },


  render: function() {
    return (
      <ModalProgress ref="modal" onConfirm={this.onConfirm} onCancel={this.onCancel} contentPrefix="widgets.vault.file_browser.modals.delete" warning="irreversible" proceedType="danger" step={this.state.step} progressCurrent={this.props.index} progressMax={this.props.recordIds.count()}>
        {this.props.children}
      </ModalProgress>
    );
  }
});
