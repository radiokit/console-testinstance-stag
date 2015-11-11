import React from 'react';
import Immutable from 'immutable';
import { Link } from 'react-router';

import ButtonLinkWidget from '../../widgets/admin/button_link_widget.jsx';
import RoutingHelper from '../../helpers/routing_helper.js';
import AccountHelper from '../../helpers/account_helper.js';

export default React.createClass({
  getInitialState: function() {
    return {
      recordRepository: null,
      recordFiles: new Immutable.Seq().toIndexedSeq()
    };
  },

  componentDidMount: function() {
    window.data
      .query("vault", "Record.Repository")
      .select("id")
      .where("references", "deq", "user_account_id", AccountHelper.getCurrentAccountIdFromContext(this))
      .where("references", "deq", "role", "shows")
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({
            loadingError: true
          })
        }
      }).on("update", (_, query) => {
        if(this.isMounted()) {

          if(query.getData().count() != 0) {
            this.setState({
              recordRepository: query.getData().first()
            });

            window.data
              .query("vault", "Record.File")
              .select("name", "duration_total", "audio_rate")
              .where("record_repository_id", "eq", query.getData().first().get("id"))
              .on("error", () => {
                if(this.isMounted()) {
                  this.setState({
                    loadingError: true
                  })
                }
              }).on("update", (_, query) => {
                if(this.isMounted()) {
                  this.setState({
                    recordFiles: query.getData()
                  })
                }
              }).fetch();

          } else {
            this.setState({
              loadingError: true
            })
          }
        }
      }).fetch();

  },

  renderEpisodes: function() {
    var items = {};

    this.state.recordFiles.forEach(item => {
      if(item.waveform_image_url != null) {
        var waveformImageUrl           = item.waveform_image_url.fit1024x72;
      }
      var waveformImageStyle           = {};
      var waveformLowerBackgroundStyle = {};
      var waveformUpperBackgroundStyle = {};
      var waveformWrapperStyle         = {};

      var itemIconForegroundClassName = "md md-mic";
      var itemIconBackgroundClassName = "timeline-circ circ-xl style-default";
      var waveformBackgroundColor     = "#CAF0EE";

      if(waveformImageUrl != null) {
        waveformWrapperStyle = {
          position:         "absolute",
          top:              "3px",
          left:             "3px",
          bottom:           "3px",
          right:            "3px",
        };

        waveformImageStyle = {
          position:         "absolute",
          top:              "0",
          left:             "0",
          bottom:           "0",
          right:            "0",
          backgroundImage:  "url('" + waveformImageUrl + "')",
          backgroundSize:   "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundOrigin: "content-box"
        };

        waveformLowerBackgroundStyle = {
          position:         "absolute",
          width:            item.percentage_played + "%",
          backgroundColor:  waveformBackgroundColor,
          top:              "0",
          left:             "0",
          bottom:           "0",
        };

        waveformUpperBackgroundStyle = {
          position:         "absolute",
          width:            100 - item.percentage_played + "%",
          backgroundColor:  "#f4f4f4",
          top:              "0",
          bottom:           "0",
          right:            "0"
        };
      }

      items['EpisodesLayout.TrackList.Row' + item.get("id")] = (<tr>
          <td><span className="md md-mic"></span></td>
          <td>
            <Link to={RoutingHelper.apps.shows.show(this, item.get("id"))}>
              {item.get("title")}
            </Link>
          </td>
          <td>{item.get("duration_total")/1000.0} s</td>
          <td>{item.get("rate")} Hz</td>
        </tr>);
    });
    return items;
  },

  render: function() {
    return (
      <section>
        <div className="section-body">
          <div className="container">
            <div className="col-lg-offset-1 col-lg-10 col-md-8">
              <ButtonLinkWidget linkDest={RoutingHelper.apps.shows.new(this)} label="apps.shows.index.add_track.header"/>
              <div className="card">
                <div className="card-body">
                  <table className="table table-hover no-margin">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Track name</th>
                        <th>Duration</th>
                        <th>Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.renderEpisodes()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>);
  }
});
