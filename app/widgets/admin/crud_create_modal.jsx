import React from 'react';
import ReactDOM from 'react-dom';
import Translate from 'react-translate-component';

import ModalForm from '../../widgets/admin/modal_form_widget.jsx';
import Form from '../../widgets/admin/form_widget.jsx';
import TextInput from '../../widgets/admin/text_input_widget.jsx';


export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    form: React.PropTypes.object.isRequired,
    app: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
  },


  getInitialState: function() {
    return {
      step: "form",
    }
  },


  show: function() {
    this.refs.modal.show();
  },


  onFormSubmit: function(fieldValues) {
    this.recordCall = window.data
      .record(this.props.app, this.props.model)
      .on("loading", () => {
        if(this.isMounted()) {
          this.setState({ step: "progress" });
        }
      })
      .on("loaded", (_event, _record, data) => {
        if(this.isMounted()) {
          this.setState({ step: "acknowledgement" });
        }
      })
      .on("warning", () => {
        if(this.isMounted()) {
          this.setState({ step: "error" });
        }
      })
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({ step: "error" });
        }
      })
      .create(fieldValues);
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
      <ModalForm ref="modal" contentPrefix={this.props.contentPrefix} onShow={this.onShow} step={this.state.step} form={this.props.form} onFormSubmit={this.onFormSubmit} onCancel={this.onCancel}>
        <div>
          <div>
            <Translate component="p" className="text-center" content={this.props.contentPrefix + ".acknowledgement.info"} />
          </div>
        </div>
      </ModalForm>
    );
  }
});
