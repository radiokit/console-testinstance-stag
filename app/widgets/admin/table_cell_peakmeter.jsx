import React from 'react';

export default React.createClass({
  propTypes: {
    model: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired,
    attribute: React.PropTypes.string.isRequired,
  },


  getInitialState: function() {
    return {
      peakValues: [],
      rmsValues: [],
    }
  },


  componentDidMount: function() {
    let channelName = this.props.model.replace(/\./g, "/").toLowerCase() + "/" + this.props.record.get("id");

    // FIXME merge with official JS API
    this.streamChannel = window.plumberStream.channel(channelName);
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


  render: function() {
    return (<span>{this.state.peakValues}</span>);
  }
});
