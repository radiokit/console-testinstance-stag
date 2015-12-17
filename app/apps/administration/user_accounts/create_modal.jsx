import React from 'react';
import ReactDOM from 'react-dom';
import Translate from 'react-translate-component';

import ModalForm from '../../../widgets/admin/modal_form_widget.jsx';
import Form from '../../../widgets/admin/form_widget.jsx';
import TextInput from '../../../widgets/admin/text_input_widget.jsx';


export default React.createClass({
  getInitialState: function() {
    return {
      step: "form",
      inputNameCustomBlankError: false,
    }
  },


  show: function() {
    this.refs.modal.show();
  },


  onConfirm: function() {
    if(this.refs.inputNameCustom.getValue().trim() === "") {
      this.setState({
        inputNameCustomBlankError: true,
      });
      return;
    }


    this.createQuery = window.data
      .record("auth", "User.Account")
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
        "name_custom" : this.refs.inputNameCustom.getValue().trim(),
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
      <ModalForm ref="modal" contentPrefix="apps.administration.user_accounts.index.modals.create" onConfirm={this.onConfirm} onCancel={this.onCancel} onShow={this.onShow} step={this.state.step}>
        <div>
          <TextInput error={this.state.inputNameCustomBlankError} ref="inputNameCustom" size="large" autofocus={true} label={true} labelTextKey="apps.administration.user_accounts.index.modals.create.form.name_custom.label" hint={true} hintTextKey="apps.administration.user_accounts.index.modals.create.form.name_custom.hint" />
        </div>

        <div>
          <div>
            <Translate component="p" className="text-center" content="apps.administration.user_accounts.index.modals.create.acknowledgement.info" />
          </div>
        </div>
      </ModalForm>
    );
  }
});
