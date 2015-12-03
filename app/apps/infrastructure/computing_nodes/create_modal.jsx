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
      inputHostnameBlankError: false,
    }
  },


  show: function() {
    this.refs.modal.show();
  },


  onConfirm: function() {
    if(this.refs.inputHostname.getValue().trim() !== "") {
      this.createQuery = window.data
        .record("plumber", "Resource.Architecture.ComputingNode")
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
            "role" : "infrastructure",
          },
          "hostname" : this.refs.inputHostname.getValue().trim(),
          "provider" : this.refs.inputProvider.getValue().trim(),
          "physical_location_country" : this.refs.inputPhysicalLocationCountry.getValue().trim(),
          "listen_port_tcp_min" : this.refs.inputListenPortTcpMin.getValue().trim(),
          "listen_port_tcp_max" : this.refs.inputListenPortTcpMax.getValue().trim(),
          "listen_port_udp_min" : this.refs.inputListenPortUdpMin.getValue().trim(),
          "listen_port_udp_max" : this.refs.inputListenPortUdpMax.getValue().trim(),
          "rtsp_port_min" : this.refs.inputRtspPortMin.getValue().trim(),
          "rtsp_port_max" : this.refs.inputRtspPortMax.getValue().trim(),
        });

    } else {
      this.setState({
        inputHostnameBlankError: true,
      }, () => {
        ReactDOM.findDOMNode(this.refs.inputHostname).focus();
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
      <ModalForm ref="modal" contentPrefix="apps.infrastructure.computing_nodes.index.modals.create" onConfirm={this.onConfirm} onCancel={this.onCancel} onShow={this.onShow} step={this.state.step}>
        <div>
          <TextInput ref="inputHostname" size="large" autofocus={true} label={true} labelTextKey="apps.infrastructure.computing_nodes.index.modals.create.form.hostname.label" error={this.state.inputHostnameBlankError} />
          <TextInput ref="inputProvider" size="large" autofocus={true} label={true} labelTextKey="apps.infrastructure.computing_nodes.index.modals.create.form.provider.label"/>
          <TextInput ref="inputPhysicalLocationCountry" size="large" autofocus={true} label={true} labelTextKey="apps.infrastructure.computing_nodes.index.modals.create.form.physical_location_country.label" maxLength="3" />
          <TextInput ref="inputListenPortTcpMin" size="large" autofocus={true} label={true} labelTextKey="apps.infrastructure.computing_nodes.index.modals.create.form.listen_port_tcp_min.label"/>
          <TextInput ref="inputListenPortTcpMax" size="large" autofocus={true} label={true} labelTextKey="apps.infrastructure.computing_nodes.index.modals.create.form.listen_port_tcp_max.label"/>
          <TextInput ref="inputListenPortUdpMin" size="large" autofocus={true} label={true} labelTextKey="apps.infrastructure.computing_nodes.index.modals.create.form.listen_port_udp_min.label"/>
          <TextInput ref="inputListenPortUdpMax" size="large" autofocus={true} label={true} labelTextKey="apps.infrastructure.computing_nodes.index.modals.create.form.listen_port_udp_max.label"/>
          <TextInput ref="inputRtspPortMin" size="large" autofocus={true} label={true} labelTextKey="apps.infrastructure.computing_nodes.index.modals.create.form.rtsp_port_min.label"/>
          <TextInput ref="inputRtspPortMax" size="large" autofocus={true} label={true} labelTextKey="apps.infrastructure.computing_nodes.index.modals.create.form.rtsp_port_max.label"/>
        </div>

        <div>
          <div>
            <Translate component="p" className="text-center" content="apps.infrastructure.computing_nodes.index.modals.create.acknowledgement.info" />
          </div>
        </div>
      </ModalForm>
    );
  }
});
