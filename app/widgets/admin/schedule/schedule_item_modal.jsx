import React from 'react';
import ProgressModal from '../../../widgets/admin/modal_progress_widget.jsx';
import FileAutosuggestInput from '../../../widgets/admin/schedule/file_autosuggest_input.jsx';

import './schedule_item_modal.scss';
const ScheduleItemModal = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
    form: React.PropTypes.object.isRequired,
    app: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
    onSuccess: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    record: React.PropTypes.object,
    acknowledgementElement: React.PropTypes.oneOfType(
      [React.PropTypes.func, React.PropTypes.instanceOf(React.Component)]
    ),
    afterFormAccept: React.PropTypes.func,
  },

  getInitialState() {
    return {
      proceedType: 'primary',
      step: 'confirmation',
      file: null,
      startDate: '',
      stopDate: '',
    };
  },

  handleCancel() {
    this.changeStep('cancelled');
  },

  handleConfirm() {
    // TODO do stuff
    this.changeStep('progress');
  },

  changeStep(step) {
    this.setState({ step });
  },

  handleSelectedFile(file) {
    this.setState({ file });
  },

  onSuccess() {
    this.props.onSuccess && this.props.onSuccess();
  },

  show() {
    this.refs.modal.show();
    this.setState(this.getInitialState());
  },

  renderFileInput() {
    if (!this.props.record) {
      return (
        <div className="form-group">
          <label htmlFor="fileNameInput"> File name </label>
          <FileAutosuggestInput
            data={this.props.data}
            placeholder="Search file name"
            searchKey="name"
            limit={15}
            className="input-group-content"
            id="fileNameInput"
            onFileSelected= {this.handleSelectedFile}
          />
        </div>
      );
    }
    else {
      return (
        <div className="form-group">
          <label htmlFor="fileNameInput"> File name </label>
          <input
            id="fileNameInput"
            value={this.props.record.get('name')}
            readOnly
            disabled
            type="text"
            className="form-control ScheduleItemModal__input--readOnly"
          />
        </div>
      );
    }
  },

  renderDateInputs() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="startDate"> Start at </label>
          <input id="startDate" type="datetime-local" className="form-control" />
        </div>
         <div className="form-group">
          <label htmlFor="stopDate"> Stop at </label>
          <input id="stopDate" type="datetime-local" className="form-control" />
        </div>
      </div>
    );
  },

  render() {
    return (
      <ProgressModal
        ref="modal"
        size="normal"
        step={this.state.step}
        proceedType={this.state.proceedType}
        contentPrefix={this.props.contentPrefix}
        onShow={this.onShow}
        onHide={this.onHide}
        onCancel={this.handleCancel}
        onConfirm={this.handleConfirm}
      >
        <div className="ScheduleItemModal modal-body">
         {this.renderFileInput()}
         {this.renderDateInputs()}
        </div>
        <div>
          progress
        </div>
        <div>
          acknowledgementElement
        </div>

      </ProgressModal>
    );
  },

  onDismiss() {
    this.props.onDismiss && this.props.onDismiss();
  },

  onCancel() {
    if (this.recordCall) {
      this.recordCall.teardown();
    }
  },
});

export default ScheduleItemModal;
