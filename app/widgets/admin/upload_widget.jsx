import React from 'react';
import Translate from 'react-translate-component';
import { Link } from 'react-router';
import  ButtonWidget from './button_widget.jsx';

//var FileSizeWidget = require('../../channel/widgets/file_size_widget');

export default React.createClass({

  getInitialState: function() {
    return { batchToken: new Date().getTime().toString() + Math.random().toString(), queue: [] };
  },

  onUploadInit: function() {
    console.debug("[RootApp] Uploader interface was initialized");
  },

  onUploadError: function(uploader, error) {
    console.warn("[RootApp] Uploader interface error: " + JSON.stringify(error));
  },

  onUploadFilesAdded: function(uploader, files) {
    console.debug("[RootApp] Files added to uploader: " + JSON.stringify(files));
  },

  onUploadUploadProgress: function(uploader, file) {
    console.debug("[RootApp] Uploader file progress: " + JSON.stringify(file));
  },

  onUploadFileUploaded: function(uploader, file) {
    console.debug("[RootApp] Uploader file uploaded: " + JSON.stringify(file));
  },

  onUploadBeforeUpload: function(uploader, file) {
    console.debug("[RootApp] Before upload: " + JSON.stringify(file));
    this.uploadInterface.setOption("multipart_params", {
      "track_upload[channel_id]"    : file.channelId,
      "track_upload[token]"         : file.trackUploadToken,
      "track_upload[kind]"          : file.trackKind
    });
  },

  onUploadFileFiltered: function(uploader, file) {
    console.debug("[RootApp] Uploader file filtered: " + JSON.stringify(file));
  },

  onUploadFilterExcludeNonAudio: function(options, file, callback) {
    callback(typeof file.type == "string" && file.type.substr(0, 6) == "audio/");
  },

  onUploadFilterExcludeZeroBytes: function(options, file, callback) {
    callback(typeof file.size == "number" && file.size != 0);
  },

  initializeUploadInterface: function() {
    var browseButton = document.createElement('div');
    browseButton.style.display = 'none';
    document.body.appendChild(browseButton);

    this.uploadInterface = new plupload.Uploader({
      browse_button    : browseButton,
      runtimes         : "html5",
      url              : "/api/v1/track_uploads",
      multipart        : true,
      file_data_name   : "chunk_data",
      chunk_size       : "512kb",
      max_retries      : 10,
      filters          : {
        exclude_zero_bytes : true,
        exclude_non_audio  : true
      },
      headers          : {
        "Authorization": "Basic " + btoa(unescape(encodeURIComponent([this.props.authUserName, this.props.authPassword].join(":")))),
        "Accept"       : "application/json"
      }});


    plupload.addFileFilter('exclude_zero_bytes', this.onUploadFilterExcludeZeroBytes);
    plupload.addFileFilter('exclude_non_audio',  this.onUploadFilterExcludeNonAudio);

    this.uploadInterface.bind("Init",           this.onUploadInit);
    this.uploadInterface.bind("FilesAdded",     this.onUploadFilesAdded);
    this.uploadInterface.bind("UploadProgress", this.onUploadUploadProgress);
    this.uploadInterface.bind("FileUploaded",   this.onUploadFileUploaded);
    this.uploadInterface.bind("FileFiltered",   this.onUploadFileFiltered);
    this.uploadInterface.bind("BeforeUpload",   this.onUploadBeforeUpload);
    this.uploadInterface.bind("Error",          this.onUploadError);

    this.uploadInterface.init();
  },

  onUploadFilesAdded: function(uploader, files) {
    console.debug("[MusicLibraryNewLayout] Files added to uploader: " + JSON.stringify(files));
    for(var i = 0; i < files.length; i++) {
      files[i].batchToken       = this.state.batchToken;
      files[i].trackUploadToken = new Date().getTime() + "_" + Math.random() + "_" + files[i].id + "_" + files[i].name;
      files[i].channelId        = this.props.currentChannel.id;
      files[i].trackKind        = this.props.kind;
    }

    this.setState({queue: this.state.queue.concat(files.map(function(item) {
      return { id: item.id, name: item.name, size: item.size, step: "queue", progress: null };
    }))});
  },

  onUploadUploadProgress: function(uploader, file) {
    console.debug("[MusicLibraryNewLayout] Uploader file progress: " + JSON.stringify(file));
    this.setFileState(file.id, "uploading", file.percent);
  },

  onUploadFileUploaded: function(uploader, file) {
    console.debug("[MusicLibraryNewLayout] Uploader file uploaded: " + JSON.stringify(file));
    this.setFileState(file.id, "uploaded", null);
  },

  setFileState: function(fileId, step, progress) {
    this.setState({ queue: this.state.queue.map(function(item) {
      if(item.id == fileId) {
        return { id: item.id, name: item.name, size: item.size, step: step, progress: progress };

      } else {
        return item;
      }
    })});
  },

  componentDidMount: function() {
    this.initializeUploadInterface();

    var trackTagsInput = React.findDOMNode(this.refs.trackTags);
    var uploadButton   = React.findDOMNode(this.refs.uploadButton);
    var uploadDropzone = React.findDOMNode(this.refs.uploadDropzone);

    $(trackTagsInput).select2({
      tags:                    true,
      multiple:                true,
      minimumResultsForSearch: -1,
      query:                   this.onTrackTagsQuery,
      placeholder:             "Click here to choose tags that are going to be associated with uploaded files"
    });

    this.uploadInterface.setOption("browse_button", uploadButton);
    this.uploadInterface.setOption("drop_element", uploadDropzone);

    this.uploadInterface.bind("FilesAdded", this.onUploadFilesAdded);
    this.uploadInterface.bind("UploadProgress", this.onUploadUploadProgress);
    this.uploadInterface.bind("FileUploaded", this.onUploadFileUploaded);
  },

  componentWillUnmount: function() {
    var browseButton = document.createElement('div');
    browseButton.style.display = 'none';
    document.body.appendChild(browseButton);

    this.uploadInterface.setOption("browse_button", browseButton);
    this.uploadInterface.setOption("drop_element", null);

    this.uploadInterface.unbind("UploadProgress", this.onUploadUploadProgress);
    this.uploadInterface.unbind("FilesAdded", this.onUploadFilesAdded);
    this.uploadInterface.unbind("FileUploaded", this.onUploadFileUploaded);
  },

  onSubmitClick: function(event) {
    this.uploadInterface.start();
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
    if(this.state.queue.length != 0) {
      if(this.state.queue.length <= 7) {
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
                  <Translate content="apps.shows.widgets.upload_widget.table.header.name" component="th"/>
                  <Translate content="apps.shows.widgets.upload_widget.header.size" component="th" className="text-right"/>
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
    var items = {};
    var n = 1;

    this.state.queue.map(function(item) {
      var stepTranslationKey = "apps.shows.widgets.upload_widget.table.steps." + item.step;

      switch(item.step) {
        case "uploading": var badgeClassName = "badge style-accent-light"; break;
        case "uploaded":  var badgeClassName = "badge style-accent";       break;
        default:          var badgeClassName = "";                         break;
      }

      items["MusicLibraryNewLayout.Queue.Row" + item.id] = (<tr>
          <td className="text-right">{n}.</td>
          <td>{item.name}</td>
          <td className="text-right"><FileSizeWidget size={item.size}/></td>
          <td>
            <span className={badgeClassName}>
              {counterpart.translate(stepTranslationKey)} {item.progress != null ? "(" + item.progress + "%)" : ""}
            </span>
          </td>
        </tr>);
      n++;
    });
    return items;
  },

  renderTags: function() {
    return (
      <div className="card">
        <div className="card-body">
          <form className="form">
            <div className="form-group">
              <input type="hidden" ref="trackTags" className="track-tags form-control" />
              <Translate content="apps.shows.widgets.upload_widget.tags.select.help" component="p" className="help-block" />
            </div>
          </form>
        </div>
      </div>);
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
              <ButtonWidget onClick={this.onSubmitClick} label="Upload"/>
            </div>
    	    </div>
    	  </div>
    	</section>
    );
  }
});