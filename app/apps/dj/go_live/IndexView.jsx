import React from 'react';
import '../../../../vendor/assets/stylesheets/materialadmin/materialadmin.css';

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
      return (<div className="card">
        <div className="card-body height-4">

        <div className="col-lg-4">

        <button className="btn ink-reaction btn-raised btn-primary" onClick={this.goLive}>Go Live</button>
        </div>

        <div className="col-lg-4">
        <button className="btn ink-reaction btn-danger" onClick={this.stopBroadcast}>Stop Broadcast</button>
        </div>

        <div className="col-lg-4">
         To stream straight to your channel - configure Icecast with this data
          </div>
        </div>

        <div className="card-body height-4">

        <div className="col-lg-4">

        <button className="btn ink-reaction btn-raised btn-info" onClick={this.record}>Record Set</button>
        </div>

        <div className="col-lg-4">
        <button className="btn ink-reaction btn-danger" onClick={this.stopRecording}>Stop Recording</button>
        </div>

        <div className="col-lg-4">
         You can record your here without going live - the file will show up in Your Library
          </div>




        </div>
      </div>);

    }
});
