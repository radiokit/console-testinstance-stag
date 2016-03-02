import React from 'react';
import Translate from 'react-translate-component';
import { Link } from 'react-router';

import ButtonWidget from './button_widget.jsx';

/*
var ButtonWidget              = require('../widgets/button_widget');
*/

export default React.createClass({
  getInitialState: function() {
    return { cursor: 'unsettled',
             position: 0,
             track: null,
             track_markers: [] };
  },

  componentDidMount: function() {
    console.log(this.props.params);

    window.data
      .query("horn-gw", "Track")
      .select("duration_total")
      .where("id", "eq", this.props.params.trackId)
      .joins("track_markers")
      // .where("channel_id", "eq", AccountHelper.getCurrentAccountIdFromContext(this))
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({
            loadingError: true
          })
        }
      }).on("fetch", (_event, _query, data) => {
        if(this.isMounted()) {
          this.setState({
            track: data
          })
        }
      }).fetch();

    window.data
      .query("horn-gw", "TrackMarker")
      .where("track_id", "eq", this.props.params.trackId)
      .select("offset","kind","title","performer")
      // .where("channel_id", "eq", AccountHelper.getCurrentAccountIdFromContext(this))
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({
            loadingError: true
          })
        }
      }).on("fetch", (_event, _query, data) => {
        if(this.isMounted()) {
          this.setState({
            track_markers: data
          })
        }
      }).fetch();
  },

  onTrackQueryFetch: function() {
    this.forceUpdate();
  },

  onTrackMarkersQueryFetch: function() {
    this.forceUpdate();
  },

  addTrackMarker: function() {
    this.props.dataInterface
      .addRecord('radiokit-horn-gw', "TrackMarker")
      .create({track_id: this.getParams().showEpisodeId, kind: 0, offset: this.state.position });
    this.setState({ cursor: 'unsettled'});
  },

  deleteTrackMarker: function(track_marker) {
    this.props.dataInterface
      .addRecord('radiokit-horn-gw', "TrackMarker", track_marker.id)
      .destroy();
  },

  updateTrackMarker: function(track_marker) {
    var row = {};
    row["offset"]= document.getElementById('Form_offset_' + track_marker.id).value;
    row["kind"] = document.getElementById('Form_kind_' + track_marker.id).value;
    row["title"] = document.getElementById('Form_title_' + track_marker.id).value;
    row["performer"] = document.getElementById('Form_performer_' + track_marker.id).value;
    this.props.onRowUpdate(track_marker, row);
  },

  getAbsoluteOffset: function(element) {
    var xPosition = 0;

    while(element) {
      xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
      element = element.offsetParent;
    }
    return xPosition;
  },

  offsetToPosition: function(arg_offset) {
    var offset = parseFloat(arg_offset);
    var width = parseFloat(document.getElementById('metadata-waveform-editor-overlay').offsetWidth);
    var duration = parseFloat(this.props.track.duration_total);
    var position = Math.round(offset/width*duration);
    return position;
  },

  handleOverlayMouseEnter: function(event) {
    if (this.state.cursor != 'settled') {
      this.setState({cursor: 'unsettled'});
    }
  },

  handleOverlayMouseLeave: function(event) {
    if (this.state.cursor != 'settled') {
      this.setState({cursor: 'not_visible' });
    }
  },

  handleOverlayMouseMove: function(event) {
    if (this.state.cursor != 'settled') {
      var absoluteOffset = this.getAbsoluteOffset(event.target)
      var newPosition = event.pageX - absoluteOffset;
      this.setState({position: Math.round(newPosition)})
    }
  },

  handleOverlayMouseClick: function(event) {
    if (this.state.cursor != 'settled') {
      this.setState({cursor: 'settled'});
    } else {
      this.setState({cursor: 'unsettled' });
    }
  },

  renderStoredUserMarkers: function() {
    var list = this.props.dataInterface.getSnapshot().MetadataWaveformUserWidget_TrackMarkers;
    if (list == null) return "";
    trackMarkers = {};
    list.map( function(trackMarker) {
      trackMarkers['TrackMarker' + trackMarker.id] = (
        <div style = {{ left: trackMarker.offset }} className="marker stored_marker" id={"metadata_cursor_" + trackMarker.id}>
          <div className="triangle top"/>
          <div className="line"/>
          <div className="triangle bottom"/>
        </div>);
    });
    return trackMarkers;
  },

  render: function() {
    if (this.state.track == null) {
      return(<div></div>);
    }

    var track = this.state.track
    var classes = "";
    var style = {};
    switch  (this.state.cursor) {
      case 'settled':
        classes = "marker settled_cursor";
        style = { display: 'block',
                  left: this.state.position + "px" };
        break;
      case 'unsettled':
        classes = "marker cursor";
        style = { dispaly: 'block',
                  left: this.state.position + "px" };
        break;
      default:
        classes = "marker cursor";
        style = { display: 'none' };
    }

    return (
      <div>
        <ButtonWidget onClick={this.addTrackMarker} label="panel.common.widgets.new_track_marker_form_row.submit"/>
        <div className="card">
          <div className="card-body style-default-bright no-padding" id="metadata-waveform-editor-overlay"
               style={{overflow: "hidden"}}
                                                     onMouseEnter = {this.handleOverlayMouseEnter}
                                                     onMouseLeave = {this.handleOverlayMouseLeave}
                                                     onMouseMove  = {this.handleOverlayMouseMove}
                                                     onClick={this.handleOverlayMouseClick}>
            <img src="http://www.freddythunder.com/blog_images/wav2png2.png"/>
            <div id="metadata-waveform-editor-markers">
              <div className={classes} style={style} id="metadata_cursor">
                <div className="triangle top"/>
                <div className="line"/>
                <div className="triangle bottom"/>
              </div>
              //{this.renderStoredUserMarkers()}
            </div>
          </div>
        </div>
      </div>);
  }
});