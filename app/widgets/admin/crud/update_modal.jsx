import React from 'react';
import ReactDOM from 'react-dom';
import Translate from 'react-translate-component';

import ModalForm from '../../../widgets/admin/modal_form_widget.jsx';
import Form from '../../../widgets/admin/form_widget.jsx';
import TextInput from '../../../widgets/admin/text_input_widget.jsx';


const UpdateModal = React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    form: React.PropTypes.object.isRequired,
    app: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
    recordId: React.PropTypes.string,
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
      .record(this.props.app, this.props.model, this.props.recordId)
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
        this.props.afterFormAccept && this.props.afterFormAccept();
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
      .update(fieldValues);
  },

  onSuccess() {
    this.props.onSuccess && this.props.onSuccess();
  },

  onCancel() {
    if (this.recordCall) {
      this.recordCall.teardown();
    }
  },

  onDismiss() {
    this.props.onDismiss && this.props.onDismiss();
  },

  onShow() {
    this.setState(this.getInitialState());
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
        onShow={ this.onShow }
        step={ this.state.step }
        record={ this.state.record }
        form={ this.props.form }
        onFormSubmit={ this.onFormSubmit }
        onCancel={ this.onCancel }
        onHide={ this.onDismiss }
        onSuccess={ this.props.onSuccess }
      />
    );
  },
});

export default UpdateModal;
