import React from 'react';
import Translate from 'react-translate-component';

import ModalProgress from '../../widgets/admin/modal_progress_widget.jsx';

/**
// # Use case
//
// This component is intented to be used if you need a modal window that has
// the following workflow:
//
// 1. Show request to confirm the operation to the user. Operation is inteded
//    to do the same thing on set of records (e.g. deletion of multiple records).
// 2. Do the operation, which does the same operation for each record.
// 3. Show acknowledgement when operation is done.
// 4. Allow user to cancel the operation, show message if operation was cancelled.
//
// # Usage
//
// This component is intended to be wrapped by other component that contains
// dialog-specific actions. This is the boilerplate code:
//
//     export default React.createClass({
//       propTypes: {
//         recordIds: React.PropTypes.object.isRequired,
//       },
//
//       getInitialState: function() {
//         return {
//           index: 0
//         }
//       },
//
//       show: function() {
//         this.refs.modal.show();
//       },
//
//       onActionSucess: function(record) {
//         this.setState({
//           index: this.state.index + 1
//         });
//       },
//
//       onPerform: function(index, recordId) {
//         // replace this with your code, this.onSuccess is a callback that
//         // should be called when operation is done, feel free to rename it
//         // or add more callbacks
//         doSomethingMeaningFull(this.onSuccess);
//       },
//
//       render: function() {
//         return (
//           <ModalForEach ref="modal" onPerform={this.onPerform} contentPrefix="my.content.modal" recordIds={this.props.recordIds} index={this.state.index}>
//             <div>Content for confirmation step</div>
//             <div>Content for progress step</div>
//             <div>Content for acknowledgement step</div>
//             <div>Content for cancelled step</div>
//           </ModalForEach>
//         );
//       }
//     });
//
// Than you have to implement onPerform and callback handler for successful operation.
//
// onPerform will get called back for each of the elements of Iterable sequence passed
// as recordIds, where first parameter will be index of current element, second will
// be the element itself.
//
// In success callback you have to increment the index by 1, when it gets passed
// via props to ModalForEach the code will automatically launch procedure for the next
// element.
//
// # Props
//
// * index - index of currently processed element from recordIds sequence
// * recordIds - Immutable.js sequence to be processed
// * contentPrefix - string applied as  prefix for locale keys
// * onPerform - callback called for each of processed elements
// * warning - if set to "irreversible", will show a warning in the dialog that
//     undertaken operations are irreversible
// * proceedType - sets color of elements, should be set to "danger" for dangerous
//     operation such as deletion
// * size - modal size
*/
export default React.createClass({
  propTypes: {
    index: React.PropTypes.number.isRequired,
    recordIds: React.PropTypes.object.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
    onPerform: React.PropTypes.func.isRequired,
    warning: React.PropTypes.oneOf(['irreversible']),
    proceedType: React.PropTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger']),
    size: React.PropTypes.oneOf(['normal', 'large']),
    onSuccess: React.PropTypes.func,
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
      <ModalProgress ref="modal" size={this.props.size} onConfirm={this.onConfirm} onCancel={this.onCancel} contentPrefix={this.props.contentPrefix} warning={this.props.warning} proceedType={this.props.proceedType} step={this.state.step} progressCurrent={this.props.index} progressMax={this.props.recordIds.count()} onSuccess={this.props.onSuccess}>
        {this.props.children}
      </ModalProgress>
    );
  }
});
