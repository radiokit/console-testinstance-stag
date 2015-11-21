import React from 'react';

import Alert from '../../../widgets/admin/alert_widget.jsx';
import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Loading from '../../../widgets/general/loading_widget.jsx';

export default React.createClass({
  contextTypes: {
    currentBroadcastChannel: React.PropTypes.object.isRequired,
  },


  getInitialState: function() {
    return {
      janusLoaded: false,
      janusSupported: false,
    }
  },


  componentDidMount: function() {
    Janus.init({debug: "all", callback: this.onJanusReady});
  },


  componentWillUnmount: function() {
    if(this.janusGateway) {
      this.janusGateway.destroy();
    }
  },


  onJanusReady: function() {
    if(Janus.isWebrtcSupported()) {
      this.setState({
        janusLoaded: true,
        janusSupported: true,
      });

    } else {
      this.setState({
        janusLoaded: true,
        janusSupported: false,
      });
    }
  },


  onTestClick: function() {
    window.data.record("plumber", "Media.Server.Janus")
      .on("error", this.onJanusCreateError)
      .on("loaded", this.onJanusCreateSuccess)
      .create({
        audio_input_enabled: true
      });
  },


  onJanusPluginSuccess: function(pluginHandle) {
    console.log("Plugin attached");
    this.janusPlugin = pluginHandle;

    let message = { audio: true, video: true };
    this.janusPlugin.send({"message": message});

    this.janusPlugin.createOffer({
      media: { data: true },
      success: (jsep) => {
        console.log("Got SDP");
        console.log(jsep);
        this.janusPlugin.send({"message": message, "jsep": jsep});
      },

      error: function(error) {
        console.error("WebRTC error:", error);
      }
    });
  },


  onJanusPluginMessage: function(msg, jsep) {
    console.log("Plugin got a message: " + JSON.stringify(msg));

    if(jsep !== undefined && jsep !== null) {
      console.log("Handling SDP as well...");
      console.log(jsep);
      this.janusPlugin.handleRemoteJsep({jsep: jsep});
    }

    var result = msg["result"];
    if(result !== null && result !== undefined) {
      if(result === "done") {
        // The plugin has finished
        // TODO
      }
    }
  },


  onJanusPluginCleanup: function() {
    console.log("Plugin cleanup");
  },


  onJanusPluginLocalStream: function(stream) {
    console.log("Plugin got a local stream: " + JSON.stringify(stream));
  },


  onJanusPluginRemoteStream: function(stream) {
    console.log("Plugin got a local stream: " + JSON.stringify(stream));
    attachMediaStream(this.refs.video, stream);
  },


  onJanusCreateSuccess: function(_eventName, _record, data) {
    this.janusGateway = new Janus({
      server: ["https://vps-1138406-8984.cp.homecloud.pl:50000/janus"],//data.get("janus_endpoints").toJS(),
      success: this.onJanusGatewaySuccess,
      error: this.onJanusGatewayError,
      destroyed: this.onJanusGatewayDestroy,
    });
  },


  onJanusGatewaySuccess: function() {
    console.log("Connected to the gateway");
    this.janusGateway.attach({
      plugin: "janus.plugin.echotest",
      success: this.onJanusPluginSuccess,
      error: this.onJanusPluginError,
      onmessage: this.onJanusPluginMessage,
      onlocalstream: this.onJanusPluginLocalStream,
      onremotestream: this.onJanusPluginRemoteStream,
      oncleanup: this.onJanusPluginCleanup,
    });
  },


  onJanusGatewayError: function(error) {
    console.log("Gateway error");
    console.log(error);

    // TODO
  },


  onJanusGatewayDestroy: function() {
    console.log("Gateway destroyed");

    // TODO
  },


  onJanusCreateError: function() {
    console.log("JANUS ERROR");

    // TODO
  },


  render: function() {
    if(this.state.janusLoaded === false) {
      return (<Loading />);

    } else {
      if(!this.state.janusSupported) {
        return (<Alert type="error" fullscreen={true} infoTextKey="general.errors.communication.general" />); // FIXME locales

      } else {
        return (
          <Section>
            <GridRow>
              <GridCell size="large" center={true}>
                <button className="btn btn-lg btn-primary" onClick={this.onTestClick}>TEST CONNECTION</button>
                <video ref="video" width="320" height="240" autoPlay />
              </GridCell>
            </GridRow>
          </Section>
        );
      }
    }
  }
});
