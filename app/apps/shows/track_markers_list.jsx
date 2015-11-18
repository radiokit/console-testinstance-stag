import React from 'react';
import Translate from 'react-translate-component';
import { Link } from 'react-router';
/*
var ButtonWidget              = require('../widgets/button_widget');
*/
export default React.createClass({
  getInitialState: function() {
    return {
      track_markers: []
    };
  },

  componentDidMount: function() {
    window.data
      .query("horn-gw", "TrackMarker")
      .select("duration_total")
      .where("track_id", "eq", this.props.params.trackId)
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

  deleteTrackMarker: function(track_marker) {
    this.props.dataInterface
      .record("horn-gw", "TrackMarker", track_marker.get("id"))
      .destroy();
  },

  updateTrackMarker: function(track_marker) {
    var row = {};
    row["offset"]= document.getElementById('Form_offset_' + track_marker.get("id")).value;
    row["kind"] = document.getElementById('Form_kind_' + track_marker.get("id")).value;
    row["title"] = document.getElementById('Form_title_' + track_marker.get("id")).value;
    row["performer"] = document.getElementById('Form_performer_' + track_marker.get("id")).value;
    this.props.dataInterface
      .addRecord('radiokit-horn-gw', "TrackMarker", track_marker.id)
      .update(row);
  },

  prepareTrackMarkerList: function() {
    var tracks = this.state.track_markers;
    if ( tracks == null) return;
    if ( tracks.length == 0 ) return;
    var that = this;
    var trackMarkers = {};
    tracks.forEach(function(trackMarker) {
      trackMarkers['TrackMarker.Row.' + trackMarker.get("id")] = (
        <div className="card">
          <div className="card-body">
            <ul className="list">
            <li className="tile">
              <form className="form-inline" id="track-marker-form" onSubmit={function(e) { e.preventDefault(); that.updateTrackMarker(trackMarker)}}>
                <div className="form-group">
                  <input id={"Form_offset_" + trackMarker.get("id")} className="form-control" type="text" ref="offset" value={trackMarker.get("offset")}/>
                  <label for="form1">
                    Offset
                  </label>
                </div>
                <div className="form-group">
                  <select id={"Form_kind_" + trackMarker.get("id")} name="kind" ref="kind" className="form-control" defaultValue={trackMarker.get("kind")}>
                    <option value="0">Music</option>
                    <option value="1">Speech</option>
                  </select>
                  <label for="form2">
                    Kind
                  </label>
                </div>
                <div className="form-group">
                  <input id={"Form_title_" + trackMarker.get("id")} className="form-control" type="text" ref="title" defaultValue={trackMarker.get("title")}/>
                  <label for="form3">
                    Title
                  </label>
                </div>
                <div className="form-group">
                  <input id={"Form_performer_" + trackMarker.get("id")} className="form-control" type="text" ref="performer" defaultValue={trackMarker.get("performer")}/>
                  <label for="form4">
                    Performer
                  </label>
                </div>
                <button className="btn btn-raised btn-default-light ink-reaction" type="submit">
                  SAVE
                </button>
                <div className="btn btn-flat ink-reaction" onClick={that.deleteTrackMarker.bind(that, trackMarker)}>
                  <div className="fa fa-trash">
                  </div>
                </div>
              </form>
            </li>
            </ul>
          </div>
        </div>
      )
    });
    return trackMarkers;
  },

  render: function() {
    return (
      <div id="TrackMarkersList">
        {this.prepareTrackMarkerList()}
      </div>
    );
  }
});