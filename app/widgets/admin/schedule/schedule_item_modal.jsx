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
      step: 'form',
      record: null,
    };
  },

  onFormSubmit(fieldValues) {
    this.recordCall = window.data
      .record(this.props.app, this.props.model)
      .on('loading', () => {
        this.setState({
          step: 'progress',
        });
      })
      .on('loaded', (_event, _record, data) => {
        this.setState({
          step: 'acknowledgement',
          record: data,
        });
        if (this.props.afterFormAccept) {
          this.props.afterFormAccept();
        }
      })
      .on('warning', () => {
        this.setState({
          step: 'error',
        });
      })
      .on('error', () => {
        this.setState({
          step: 'error',
        });
      })
      .create(fieldValues);
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

  render() {
    return (
      <Modal
        ref="modal"
        size="normal"
        contentPrefix={this.props.contentPrefix}
        onShow={this.onShow}
        onHide={this.onHide}
      >
        <FileAutosuggestInput
          data = {this.props.data}
          placeholder = "Search files"
          searchKey = "name"
          limit = {15}
        />
      </Modal>
    );
  },
});

export default ScheduleItemModal;
