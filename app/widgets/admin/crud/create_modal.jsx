import React from 'react';
import ModalForm from '../../../widgets/admin/modal_form_widget.jsx';

const CreateModal = React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    form: React.PropTypes.object.isRequired,
    app: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
    onSuccess: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    acknowledgementElement: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.instanceOf(React.Component)]),
    afterFormSubmit: React.PropTypes.func,
    afterFormAccept: React.PropTypes.func,
  },

  getInitialState() {
    return {
      step: 'form',
      record: null,
    };
  },

  show() {
    this.refs.modal.show();
  },

  handleFormSubmit(fieldValues) {
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
        if(this.props.afterFormAccept) {
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

  handleSuccess() {
    this.props.onSuccess && this.props.onSuccess();
  },

  handleCancel() {
    if (this.recordCall) {
      this.recordCall.teardown();
    }
  },

  handleShow() {
    this.setState(this.getInitialState());
  },

  handleDismiss() {
    this.props.onDismiss && this.props.onDismiss();
  },

  show() {
    this.refs.modal.show();
  },

  render() {
    return (
      <ModalForm
        ref="modal"
        acknowledgementElement={ this.props.acknowledgementElement }
        contentPrefix={ this.props.contentPrefix }
        onShow={ this.handleShow }
        step={ this.state.step }
        record={ this.state.record }
        form={ this.props.form }
        onFormSubmit={ this.handleFormSubmit }
        onCancel={ this.handleCancel }
        onHide={ this.handleDismiss }
        onSuccess={ this.handleSuccess }
      />
    );
  },
});

export default CreateModal;
