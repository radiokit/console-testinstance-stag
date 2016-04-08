import React from 'react';

import VolumeTrackerCanvas from '../canvas/VolumeTrackerCanvas.js';

export default React.createClass({
  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    model: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired,
  },


  getDefaultProps: function() {
    return {
      width: 600,
      height: 200,
    };
  },


  componentDidMount: function() {
    this.volumeTracker = new VolumeTrackerCanvas(this.refs.canvas);

    let channelName = this.props.model.replace(/\./g, "/").toLowerCase() + "/" + this.props.record.get("id");

    // FIXME merge with official JS API
    this.streamChannel = window.plumberStream.channel(channelName);
    this.streamChannel.on("level", this.onLevel);
    this.streamChannel.join();

    this.volumeTracker.start();
  },


  componentWillUnmount: function() {
    // FIXME merge with official JS API
    this.streamChannel.leave();

    this.volumeTracker.stop();
    delete this.volumeTracker;
  },


  onLevel: function(payload) {
    if(this.isMounted()) {
      this.volumeTracker.push(new Date(payload.timestamp), 40, payload.params.peak); // TODO read change sample duration
    }
  },


  render: function() {
    return (
      <canvas ref="canvas" width={this.props.width} height={this.props.height} />
    );
  }
});
