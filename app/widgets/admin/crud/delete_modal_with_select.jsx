import React from 'react';
import ReactDOM from 'react-dom';
import Translate from 'react-translate-component';

import ModalForm from '../../../widgets/admin/modal_form_widget.jsx';
import Form from '../../../widgets/admin/form_widget.jsx';
import TextInput from '../../../widgets/admin/text_input_widget.jsx';

const DeleteModalWithSelect = React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    form: React.PropTypes.object.isRequired,
    app: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
    acknowledgementElement: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.instanceOf(React.Component)]),
    afterFormSubmit: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      step: "form",
      record: null
    }
  },

  show: function() {
    this.refs.modal.show();
  },

  onFormSubmit: function(record) {
    this.recordCall = window.data
      .record(this.props.app, this.props.model, record.recordId)
      .on("loading", () => {
        if (this.isMounted()) {
          this.setState({step: "progress"});
        }
      })
      .on("loaded", (_event, _record, data) => {
        if (this.isMounted()) {
          this.setState({step: "acknowledgement", record: data});
          this.props.afterFormSubmit();
        }
      })
      .on("warning", () => {
        if(this.isMounted()) {
          this.setState({step: "error"});
        }
      })
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({step: "error"});
        }
      })
      .destroy();
  },

  onCancel: function() {
    if(this.recordCall) {
      this.recordCall.teardown();
    }
  },

  onShow: function() {
    this.setState(this.getInitialState());
  },

  render: function() {
    return (
      <ModalForm
        ref="modal"
        acknowledgementElement={this.props.acknowledgementElement}
        contentPrefix={this.props.contentPrefix}
        onShow={this.onShow}
        step={this.state.step}
        record={this.state.record}
        form={this.props.form}
        onFormSubmit={this.onFormSubmit}
        onCancel={this.onCancel} />
    );
  }
});

module.exports = DeleteModalWithSelect;
