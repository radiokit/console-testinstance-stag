import React from 'react';
import ReactDOM from 'react-dom';
import Translate from 'react-translate-component';

import ModalForm from '../../../widgets/admin/modal_form_widget.jsx';
import Form from '../../../widgets/admin/form_widget.jsx';
import TextInput from '../../../widgets/admin/text_input_widget.jsx';


export default React.createClass({

  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    form: React.PropTypes.object.isRequired,
    app: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
    onSuccess: React.PropTypes.func,
    acknowledgementElement: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.instanceOf(React.Component)]),
  },

  getInitialState() {
    return {
      step: "form",
      record: null,
    }
  },

  show() {
    this.refs.modal.show();
  },

  onFormSubmit(fieldValues) {
    this.recordCall = window.data
      .record(this.props.app, this.props.model)
      .on("loading", () => {
        if (this.isMounted()) {
          this.setState({
            step: "progress"
          });
        }
      })
      .on("loaded", (_event, _record, data) => {
        if (this.isMounted()) {
          this.setState({
            step: "acknowledgement",
            record: data
          });
        }
      })
      .on("warning", () => {
        if (this.isMounted()) {
          this.setState({
            step: "error"
          });
        }
      })
      .on("error", () => {
        if (this.isMounted()) {
          this.setState({
            step: "error"
          });
        }
      })
      .create(fieldValues);
  },

  onSuccess(){
    this.props.onSuccess && this.props.onSuccess();
  },

  onCancel() {
    if (this.recordCall) {
      this.recordCall.teardown();
    }
  },

  onShow() {
    this.setState(this.getInitialState());
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
        onSuccess={ this.props.onSuccess } />
    );
  }
});
