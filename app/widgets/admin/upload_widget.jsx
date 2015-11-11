import React from 'react';
import Translate from 'react-translate-component';
import { Link } from 'react-router';
import Resumable from 'resumablejs';
import Immutable from 'immutable';

import Button from './button_widget.jsx';
import Loading from './../general/loading_widget.jsx';
import FileSize from './../general/file_size_widget.jsx';

export default React.createClass({
  getInitialState: function() {
    return {
      resumableState: "null",
      queue: new Immutable.Seq().toIndexedSeq()
    }
  },


  componentDidMount: function() {
    this.resumable = new Resumable({
      testChunks: false,
      forceChunkSize: true,
      chunkSize: 524288, // 512 kb should be enough even for Africa
      target: window.ENV.apps.vault.baseUrl + '/api/upload/v1.0/resumablejs',
      headers: window.data.options.auth.getHeaders(),
      minFileSize: 1
    });


    if(!this.resumable.support) {
      this.setState({ resumableState: "not-supported" });

    } else {
      this.resumable.assignBrowse(React.findDOMNode(this.refs.uploadDropzone));
      this.resumable.assignDrop(React.findDOMNode(this.refs.uploadDropzone));
      this.resumable.on("fileAdded", this.updateQueue);
      this.resumable.on("fileAdded", this.startUpload);
      this.resumable.on("fileProgress", this.updateQueue);
      this.resumable.on("fileRetry", this.updateQueue);
      this.resumable.on("fileError", this.updateQueue);

      this.setState({ resumableState: "ready" });
    }
  },


  componentWillUnmount: function() {
    this.resumable.cancel();
    delete this.resumable;
  },


  updateQueue: function() {
    this.setState({ queue: Immutable.fromJS(this.resumable.files) });
  },


  startUpload: function() {
    this.resumable.upload();
  },


  renderDropzone: function() {
    return (
      <div className="card style-primary upload-dropzone" ref="uploadDropzone">
        <div className="card-body">
          <form className="upload-dropzone" ref="uploadButton" className="upload-button">
            <Translate content="apps.shows.widgets.upload_widget.upload_instructions" component="h3"/>
          </form>
        </div>
      </div>);
  },


  renderQueue: function() {
    if(this.state.queue.size != 0) {
      if(this.state.queue.size <= 7) {
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
                  <th/>
                  <Translate content="apps.shows.widgets.upload_widget.table.header.file_name" component="th"/>
                  <Translate content="apps.shows.widgets.upload_widget.table.header.file_size" component="th" className="text-right"/>
                  <Translate content="apps.shows.widgets.upload_widget.table.header.status" component="th" style={{width: "20ex"}}/>
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
    return this.state.queue.map((file, i) => {
      let badge = null;
      if(file.isUploading()) {
        badge = <span className="badge style-accent-light">{parseInt(file.progress(false) * 100)}%</span>;
      } else if (file.isComplete()) {
        badge = <span className="badge style-accent">100%</span>;
      }

      return (
        <tr key={file.uniqueIdentifier}>
          <td className="text-right">{i+1}.</td>
          <td>{file.fileName}</td>
          <td className="text-right"><FileSize size={file.size}/></td>
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
    if(this.state.resumableState === "ready") {
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

    } else {
      return (
      	<section>
      	  <div className="section-body">
      	    <div className="row">
      	      <div className="col-lg-8 col-lg-offset-2">
      	        {this.renderDropzone()}
                {this.renderTags()}
              </div>
      	    </div>
      	  </div>
      	</section>
      );
    }
  }
});
