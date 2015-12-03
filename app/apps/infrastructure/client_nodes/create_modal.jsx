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
        .record("plumber", "Resource.Architecture.ClientNode")
        .on("loading", () => {
          if(this.isMounted()) {
            this.setState({ step: "progress" });
          }
        })
        .on("loaded", (_event, _record, data) => {
          if(this.isMounted()) {
            this.setState({ step: "acknowledgement", pairingKey: data.get("pairing_key") });
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
          "name" : this.refs.inputName.getValue().trim(),
          "destroy_in" : 900000 // 15 minutes
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
      <ModalForm ref="modal" contentPrefix="apps.infrastructure.client_nodes.index.modals.create" onConfirm={this.onConfirm} onCancel={this.onCancel} onShow={this.onShow} step={this.state.step}>
        <div>
          <TextInput error={this.state.inputNameBlankError} ref="inputName" size="large" autofocus={true} label={true} labelTextKey="apps.infrastructure.client_nodes.index.modals.create.form.name.label" hint={true} hintTextKey="apps.infrastructure.client_nodes.index.modals.create.form.name.hint" />
        </div>

        <div>
          <div>
            <Translate component="p" className="text-center" content="apps.infrastructure.client_nodes.index.modals.create.acknowledgement.instructions.header" />
          </div>

          <div>
            <Translate component="p" className="text-center" content="apps.infrastructure.client_nodes.index.modals.create.acknowledgement.instructions.code" />

            <p className="text-xxxl text-center">{this.state.pairingKey}</p>
          </div>

          <div>
            <Translate component="p" className="text-center" content="apps.infrastructure.client_nodes.index.modals.create.acknowledgement.instructions.os" />

            <div className="row style-accent">
              <div className="col-md-6 text-center">
                <Translate component="h2" content="apps.infrastructure.client_nodes.index.modals.create.acknowledgement.instructions.android.header" />
                <i className="mdi mdi-android text-xxxxl small-padding"/>
                <Translate component="p" content="apps.infrastructure.client_nodes.index.modals.create.acknowledgement.instructions.android.instructions" />
                <div className="btn-group btn-group-justified small-padding" role="group">
                  <a className="btn btn-default-bright">
                    <Translate component="span" content="apps.infrastructure.client_nodes.index.modals.create.acknowledgement.instructions.android.action_open" />
                  </a>
                </div>
              </div>

              <div className="col-md-6 text-center">
                <Translate component="h2" content="apps.infrastructure.client_nodes.index.modals.create.acknowledgement.instructions.windows.header" />
                <i className="mdi mdi-windows text-xxxxl small-padding"/>
                <Translate component="p" content="apps.infrastructure.client_nodes.index.modals.create.acknowledgement.instructions.windows.instructions" />
                <div className="btn-group btn-group-justified small-padding" role="group">
                  <a className="btn btn-default-bright">
                    <Translate component="span" content="apps.infrastructure.client_nodes.index.modals.create.acknowledgement.instructions.windows.action_open" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalForm>
    );
  }
});
