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
    }
  },


  show: function() {
    this.refs.modal.show();
  },


  onConfirm: function() {
    if(this.refs.inputName.getValue().trim() !== "") {
      this.createQuery = window.data
        .record("plumber", "Media.Routing.MixGroup")
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
            "role" : "broadcast",
            "subrole" : "main",
          },
          "name" : this.refs.inputName.getValue().trim(),
        });

    } else {
      this.setState({
        inputNameBlankError: true,
      }, () => {
        ReactDOM.findDOMNode(this.refs.inputName).focus();
      });
    }
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
      <ModalForm ref="modal" contentPrefix="apps.broadcast.channels.index.modals.create" onConfirm={this.onConfirm} onCancel={this.onCancel} onShow={this.onShow} step={this.state.step}>
        <div>
          <TextInput error={this.state.inputNameBlankError} ref="inputName" size="large" autofocus={true} label={true} labelTextKey="apps.broadcast.channels.index.modals.create.form.name.label" hint={true} hintTextKey="apps.broadcast.channels.index.modals.create.form.name.hint" />
        </div>

        <div>
          <div>
            <Translate component="p" className="text-center" content="apps.broadcast.channels.index.modals.create.acknowledgement.info" />
          </div>
        </div>
      </ModalForm>
    );
  }
});
