import React from 'react';
import Translate from 'react-translate-component';
import { Link } from 'react-router';

import DurationWidget from '../../widgets/admin/duration_widget.jsx';
import ButtonLinkWidget from '../../widgets/admin/button_link_widget.jsx';
import RoutingHelper from '../../helpers/routing_helper.js';


/*
var DurationWidget   = require('../widgets/duration_widget');
var DateTimeWidget   = require('../widgets/date_time_widget');
var moment           = require('moment');
*/

export default React.createClass({
  getInitialState: function() {
    return {
      track: null
    };
  },

  componentDidMount: function() {
    window.data
      .query("horn-gw", "Track")
      .select("duration_total")
      .where("id", "eq", this.props.params.trackId)
      .joins('track_markers')
      .joins('track_broadcasts')
     // .where("channel_id", "eq", AccountHelper.getCurrentAccountIdFromContext(this))
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({
            loadingError: true
          })
        }
      }).on("update", (_, query) => {
        if(this.isMounted()) {
          this.setState({
            track: query.getData()
          })
        }
      }).fetch();
  },

  renderTrackMarkersList: function(episode) {
    if (episode == null) return [];
    if (episode.track_broadcasts == null) return [];
    if (episode.track_markers.length == 0) return [];

    var renderedTrackMarkers = {};

    episode.track_markers.map(function(item){
      renderedTrackMarkers['TrackMarkersShowRow' + item.id] = (<tr>
          <td>{item.get("offset")}</td>
          <td>{ (item.get("kind") == 0) ? 'Music' : 'Speech' }</td>
          <td>{item.get("title")}</td>
          <td>{item.get("performer")}</td>
      </tr>)
    });
    return renderedTrackMarkers;
  },

  sortTrackBroadcasts:function(episode) {
    if (episode == null) return [];
    if (episode.track_broadcasts.length == 0) return [];

    return episode.track_broadcasts.sort(function(a,b){
      if ( moment(a.mix_point_cue_in_at) < moment(b.mix_point_cue_in_at) ) return 1;
      if ( moment(a.mix_point_cue_in_at) > moment(b.mix_point_cue_in_at) ) return -1;
      return 0;
    });
  },

  renderLastBroadcast: function(episode) {
    if (episode == null) return [];
    if (episode.track_broadcasts == null) return [];
    if (episode.track_broadcasts.length == 0) return [];
    var sortedBroadcasts = this.sortTrackBroadcasts(episode);
    if (sortedBroadcasts.length == 0) return [];
    var timezone = "Europe/Berlin";
    return (<DateTimeWidget datetime={sortedBroadcasts[0].mix_point_cue_in_at} timezone={timezone} format={"LLLL"}/>);
  },

  renderTrackBroadcasts: function(episode) {
    if (episode == null) return [];
    if (episode.track_broadcasts == null) return [];
    if (episode.track_broadcasts.length == 0) return [];

    var timezone = "Europe/Berlin";
    var renderedBroadcasts = {};

    this.sortTrackBroadcasts(episode).map(function(item){
      renderedBroadcasts['BroadcastShowRow' + item.id] = (
        <li className="tile">
          <div className="tile-content">
            <div className="tile-text">
              <span className="opacity-50"><DateTimeWidget datetime={item.mix_point_cue_in_at} timezone={timezone} format={"LLLL"}/></span>
            </div>
          </div>
        </li>
      )
    });
    return renderedBroadcasts;
  },

	renderEpisode: function() {
    var episode = {}
    var collection = this.state.track;
	  if (collection != null) {
      var item = collection.first();
	  	episode['EpisodeShowRow' + item.get("id")] = (
	  	  <div className="section-body">
	  	    <div className="row">
	  	      <div className="col-lg-6 col-md-3 col-sm-6">
	  	        <div className="card">
	  	          <div className="card-body no-padding">
	  	            <div className="alert alert-callout alert-info no-margin">
	  	              <strong className="text-xl">
	  	                <DurationWidget duration={item.get("duration_total")}/>
	  	               </strong>
	  	              <br />
	  	              <span className="opacity-50">Duration</span>
	  	            </div>
	  	          </div>
	  	        </div>
	  	      </div>

	  	      <div className="col-lg-6 col-md-3 col-sm-6">
	  	        <div className="card">
	  	          <div className="card-body no-padding">
	  	            <div className="alert alert-callout alert-info no-margin">
	  	              <strong className="text-xl">
	  	                {this.renderLastBroadcast(item)}
	  	              </strong>
	  	              <br />
	  	              <span className="opacity-50">Last broadcast</span>
	  	            </div>
	  	          </div>
	  	        </div>
	  	      </div>
	  	    </div>

	  	    <div className="row">
	  	      <div className="col-lg-12 col-md-12">
	  	        <div className="card">
	  	          <div className="card-body style-default-bright no-padding" style={{overflow: "hidden"}}>
	  	            <img src="http://www.freddythunder.com/blog_images/wav2png2.png"/>
	  	          </div>
	  	        </div>
	  	      </div>
	  	    </div>

	  	    <div className="row">
	  	      <div className="col-lg-6 col-md-6">
	  	        <div className="card card-underline">
	  	          <div className="card-head">
	  	            <header>Broadcast history</header>
	  	          </div>

	  	          <div className="card-body no-padding">
	  	            <ul className="list divider-full-bleed">
	  	              {this.renderTrackBroadcasts(item)}
	  	            </ul>
	  	          </div>
	  	        </div>
	  	      </div>

	  	      <div className="col-lg-6 col-md-6">
	  	        <ButtonLinkWidget linkDest={RoutingHelper.apps.shows.showTrackMarkers(this, item.get("id"))}
	  	                          label="apps.shows.show.edit_track_markers"/>
	  	        <div className="card card-underline">
	  	          <div className="card-head">
	  	            <header>Track Markers</header>
	  	            <table className="table table-hover no-margin">
	  	              <thead>
	  	                <tr>
	  	                  <th>Offset</th>
	  	                  <th>Kind</th>
	  	                  <th>Title</th>
	  	                  <th>Performer</th>
	  	                </tr>
	  	              </thead>
	  	              <tbody>
	  	                {this.renderTrackMarkersList(item)}
	  	              </tbody>
	  	            </table>
	  	          </div>
	  	        </div>
	  	      </div>
	  	    </div>
	  	  </div>
	  	)
	  }
	  return episode;
	},

  render: function() {
    return <div>TEST</div>;
    // return (
    //   <section>
    //     {this.renderEpisode()}
    //   </section>
    // );
  }
});
