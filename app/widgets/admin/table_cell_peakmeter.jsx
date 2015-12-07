import React from 'react';
import sprintf from 'tiny-sprintf';

import '../../assets/stylesheets/widgets/admin/table_cell_peakmeter.scss';

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
    if(this.isMounted()) {
      this.setState({ peakValues: payload.params.peak });
    }
  },


  renderBar: function(channel, channels) {
    let peakmeterRange = -60;

    return (
      <div className="channel">
        <div className="bar" style={{top: (100 / channels * channel) + "%", height: (100 / channels) + "%"}}>
          <div className="low"/>
          <div className="medium"/>
          <div className="high"/>
          <div className="overlay" style={{left: (this.state.peakValues[channel] <= peakmeterRange ? "0" : 100 - (this.state.peakValues[channel] / peakmeterRange * 100) + "%")}} />
        </div>
        <div className="value" style={{top: (100 / channels * channel) + "%", height: (100 / channels) + "%"}}>{sprintf("%-02.5s", this.state.peakValues[channel])}&nbsp;dB</div>
      </div>
    )
  },


  render: function() {
    return (
      <div className="widgets-admin-table-cell-peakmeter--container">
        {() => {
          switch(this.state.peakValues.length) {
            case 1:
              return this.renderBar(0, this.state.peakValues.length);

            case 2:
              return (
                <div>
                  {this.renderBar(0, this.state.peakValues.length)}
                  {this.renderBar(1, this.state.peakValues.length)}
                </div>
              );
          }
        }()}
      </div>
    );
  }
});
