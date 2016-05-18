import React from 'react';
import Modal from '../../../widgets/admin/modal_widget.jsx';
import FileAutosuggestInput from '../../../widgets/admin/schedule/file_autosuggest_input.jsx';

const ScheduleItemModal = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
    form: React.PropTypes.object.isRequired,
    app: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
    onSuccess: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    acknowledgementElement: React.PropTypes.oneOfType(
      [React.PropTypes.func, React.PropTypes.instanceOf(React.Component)]
    ),
    afterFormAccept: React.PropTypes.func,
  },

  getInitialState() {
    return {
      file: null,
      startDate: '',
      stopDate: '',
    };
  },

  handleSelectedFile(file) {
    this.setState({ file });
  },

  renderFileInput() {
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
      <Modal
        ref="modal"
        size="normal"
        contentPrefix={this.props.contentPrefix}
        onShow={this.onShow}
        onHide={this.onHide}
      >
        <div className="modal-body form">
         {this.renderFileInput()}
         {this.renderDateInputs()}
        </div>

      </Modal>
    );
  },
  onSuccess() {
    this.props.onSuccess && this.props.onSuccess();
  },

  onDismiss() {
    this.props.onDismiss && this.props.onDismiss();
  },

  onCancel() {
    if (this.recordCall) {
      this.recordCall.teardown();
    }
  },

  onShow() {
    this.setState(this.getInitialState());
  },

  show() {
    this.refs.modal.show();
  },
});

export default ScheduleItemModal;
