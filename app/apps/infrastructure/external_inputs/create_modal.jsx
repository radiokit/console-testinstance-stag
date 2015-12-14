import React from 'react';
import ReactDOM from 'react-dom';
import Translate from 'react-translate-component';

import ModalForm from '../../../widgets/admin/modal_form_widget.jsx';
import Form from '../../../widgets/admin/form_widget.jsx';
import TextInput from '../../../widgets/admin/text_input_widget.jsx';


export default React.createClass({
  contextTypes: {
    currentUserAccount: React.PropTypes.object.isRequired,
  },


  getInitialState: function() {
    return {
      step: "form",
      inputNameBlankError: false,
      inputLocationBlankError: false,
    }
  },


  show: function() {
    this.refs.modal.show();
  },


  onConfirm: function() {
    if(this.refs.inputName.getValue().trim() === "") {
      this.setState({
        inputNameBlankError: true,
      });
      return;
    }

    if(this.refs.inputLocation.getValue().trim() === "") {
      this.setState({
        inputLocationBlankError: true,
      });
      return;
    }

    this.createQuery = window.data
      .record("plumber", "Media.Input.Stream.HTTP")
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
      .create({
        "references" : {
          "user_account_id" : this.context.currentUserAccount.get("id"),
          "role" : "infrastructure",
        },
        "location" : this.refs.inputLocation.getValue().trim(),
        "name" : this.refs.inputName.getValue().trim(),
      });
  },


  onCancel: function() {
    if(this.createQuery) {
      this.createQuery.teardown();
    }
  },


  onShow: function() {
    this.setState(this.getInitialState());
  },


  render: function() {
    return (
      <ModalForm ref="modal" contentPrefix="apps.infrastructure.external_inputs.index.modals.create" onConfirm={this.onConfirm} onCancel={this.onCancel} onShow={this.onShow} step={this.state.step}>
        <div>
          <TextInput error={this.state.inputNameBlankError} ref="inputName" size="large" autofocus={true} label={true} labelTextKey="apps.infrastructure.external_inputs.index.modals.create.form.name.label" hint={true} hintTextKey="apps.infrastructure.external_inputs.index.modals.create.form.name.hint" />
          <TextInput error={this.state.inputLocationBlankError} ref="inputLocation" size="large" autofocus={true} label={true} labelTextKey="apps.infrastructure.external_inputs.index.modals.create.form.location.label" hint={true} hintTextKey="apps.infrastructure.external_inputs.index.modals.create.form.location.hint" />
        </div>

        <div>
          <div>
            <Translate component="p" className="text-center" content="apps.infrastructure.external_inputs.index.modals.create.acknowledgement.info" />
          </div>
        </div>
      </ModalForm>
    );
  }
});
