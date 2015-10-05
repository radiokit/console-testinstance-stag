import React from 'react';
import Translate from 'react-translate-component';


import Peakmeter from '../../../widgets/general/peakmeter_widget.jsx';

import '../../../assets/stylesheets/apps/joint/partials/medium.scss';


export default React.createClass({
  propTypes: {
    input: React.PropTypes.object.isRequired, 
    kind: React.PropTypes.string.isRequired, 
    role: React.PropTypes.string.isRequired, 
    totalCount: React.PropTypes.number.isRequired, 
  },


  getInitialState: function() {
    return { peakValues: [], rmsValues: [] };
  },


  componentDidMount: function() {

    // FIXME merge with official JS API
    this.streamChannel = window.plumberStream.channel("media/input/stream/" + this.props.kind + "/" + this.props.input.get("id"));
    this.streamChannel.on("level", this.onLevel);
    this.streamChannel.join();
  },


  componentWillUnmount: function() {
    // FIXME merge with official JS API
    this.streamChannel.leave();
  },


  onLevel: function(payload) {
    this.setState({ peakValues: payload.params.decay, rmsValues: payload.params.rms });
  },


  renderName: function() {
    return (<div className="name">
      {this.props.input.get("extra", {}).get("joint.name")}
    </div>);
  },


  renderPeakmeter: function() {
    return (<div className="peakmeter">
      <Peakmeter peakValues={this.state.peakValues} rmsValues={this.state.rmsValues} />
    </div>);
  },


  render: function() {
    return <div className="apps-joint-partial-medium--container" style={{ width: (100 / this.props.totalCount) + "%" }}>
      {this.renderName()}
      {this.renderPeakmeter()}
    </div>;
  }
});