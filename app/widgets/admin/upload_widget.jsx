import React from 'react';
import ReactDOM from 'react-dom';
import Translate from 'react-translate-component';
import Immutable from 'immutable';
import filesize from 'filesize';

import Loading from './../general/loading_widget.jsx';

export default React.createClass({
  propTypes: {
    repository: React.PropTypes.object.isRequired,
  },


  getInitialState: function() {
    return {
      loadingState: null,
      loadingError: false,
      recordRepository: null,
      uploadQueue: new Immutable.List()
    }
  },


  componentDidMount: function() {
    this.initializeUpload();
  },


  initializeUpload: function() {
    this.upload = window.data.upload(this.props.repository.get("id"), { autoStart: true })

    this.upload.assignBrowse(ReactDOM.findDOMNode(this.refs.uploadDropzone));
    this.upload.assignDrop(ReactDOM.findDOMNode(this.refs.uploadDropzone));
    this.upload.on("added", this.updateQueue);
    this.upload.on("progress", this.updateQueue);
    this.upload.on("retry", this.updateQueue);
    this.upload.on("error", this.updateQueue);

    this.setState({ loadingState: "ready" });
  },


  componentWillUnmount: function() {
    this.upload.teardown();
  },


  updateQueue: function(_event, upload) {
    this.setState({ uploadQueue: upload.getQueue() });
  },


  renderDropzone: function() {
    return (
      <div className="card style-primary upload-dropzone" ref="uploadDropzone">
        <div className="card-body">
          <form className="upload-dropzone" ref="uploadButton" className="upload-button">
            <Translate content="widgets.vault.file_browser.modals.upload.instruction" component="h3"/>
          </form>
        </div>
      </div>);
  },


  renderQueue: function() {
    if(this.state.uploadQueue.size != 0) {
      if(this.state.uploadQueue.size <= 7) {
        var cardClassName = "card-body no-padding";

      } else {
        var cardClassName = "card-body no-padding height-10 nano";
      }

      return (
        <div className="card">
          <div className={cardClassName}>
            <div className="nano-content">
              <table className="table">
                <thead>
                  <tr>
                    <th/>
                    <Translate content="widgets.vault.file_browser.modals.upload.table.header.file_name" component="th"/>
                    <Translate content="widgets.vault.file_browser.modals.upload.table.header.file_size" component="th" className="text-right"/>
                    <Translate content="widgets.vault.file_browser.modals.upload.table.header.status" component="th" style={{width: "20ex"}}/>
                  </tr>
                </thead>
                <tbody>
                  {this.renderQueueRows()}
                </tbody>
              </table>
            </div>
          </div>
        </div>);
    }
  },

  renderQueueRows: function() {
    return this.state.uploadQueue.map((file, i) => {
      let badge = null;
      if(file.get("uploading")) {
        badge = <span className="badge style-accent-light">{file.get("progress")}%</span>;
      } else if (file.get("completed")) {
        badge = <span className="badge style-accent">100%</span>;
      }

      return (
        <tr key={file.get("id")}>
          <td className="text-right">{i+1}.</td>
          <td>{file.get("name")}</td>
          <td className="text-right">{filesize(file.get("size"))}</td>
          <td>{badge}</td>
        </tr>);
    });
  },

  renderTags: function() {
    // return (
    //   <div className="card">
    //     <div className="card-body">
    //       <form className="form">
    //         <div className="form-group">
    //           <input type="hidden" ref="trackTags" className="track-tags form-control" />
    //           <Translate content="apps.shows.widgets.upload_widget.tags.select.help" component="p" className="help-block" />
    //         </div>
    //       </form>
    //     </div>
    //   </div>);
  },

  render: function() {
    return (
    	<section>
    	  <div className="section-body">
    	    <div className="row">
    	      <div className="col-lg-8 col-lg-offset-2">
    	        {this.renderDropzone()}
    	        {this.renderQueue()}
              {this.renderTags()}
            </div>
    	    </div>
    	  </div>
    	</section>
    );
  }
});
