import React from 'react';


export default React.createClass({

    getInitialState: function () {
      return {live: false}
    },
    goLive: function () {
      this.setState({live: true})
      console.log(this.state)
    },
    stopBroadcast: function (){
      this.setState({live: false})
      console.log(this.state)
    },
    record: function () {
      this.setState({recording: true})
      console.log(this.state)
    },
    stopRecording: function (){
      this.setState({recording: false})
      console.log(this.state)
    },


  render() {
      return (<div>
        <div>
        <button onClick={this.goLive}>Go Live</button>
        <button onClick={this.stopBroadcast}>Stop Broadcast</button>
        </div>
        <div>
        <button onClick={this.record}>Record Set</button>
        <button onClick={this.stopRecording}>Stop Recording</button>
        </div>
      </div>);

    }
});
