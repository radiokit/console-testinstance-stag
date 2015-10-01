import React from 'react';
import Translate from 'react-translate-component';

import { Socket } from '../../../../vendor/assets/javascripts/phoenixframework/socket.js';

import '../../../assets/stylesheets/apps/joint/partials/medium.scss';


export default React.createClass({
  propTypes: {
    input: React.PropTypes.object.isRequired, 
    kind: React.PropTypes.string.isRequired, 
    role: React.PropTypes.string.isRequired, 
    subrole: React.PropTypes.string.isRequired, 
    totalCount: React.PropTypes.number.isRequired, 
  },


  componentDidMount: function() {
    // FIXME merge with official JS API
    this.streamEndpoint = new Socket(ENV.apps.plumber.baseUrl.replace(/^http/, "ws") + "/api/stream/v1.0", {})
    this.streamEndpoint.connect();

    this.streamChannel = this.streamEndpoint.channel("media/input/stream/" + this.props.kind + "/" + this.props.input.get("id"));
    this.streamChannel.on("new_msg", (msg) => console.log("Got message", msg) );
    this.streamChannel.join();
  },


  renderSubRole: function() {
    return (<div className="subrole">
      <Translate content={"apps.joint.partials.medium." + this.props.role + "." + this.props.subrole + ".header"}/>
    </div>);
  },


  renderName: function() {
    return (<div className="name">
      {this.props.input.get("extra", {}).get("joint.name")}
    </div>);
  },


  renderPeakmeter: function() {
    return (<div className="peakmeter">
      PIKMETER
    </div>);
  },


  renderControls: function() {
    return (<div className="controls">
      <button>CONTROL</button>
    </div>);
  },


  render: function() {
    return <div className="apps-joint-partial-medium--container" style={{ width: (100 / this.props.totalCount) + "%" }}>
      {this.renderSubRole()}
      {this.renderName()}
      {this.renderPeakmeter()}
      {this.renderControls()}
    </div>;
  }
});