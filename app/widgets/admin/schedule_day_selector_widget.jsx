import React from 'react';
import Moment from 'moment';

export default React.createClass({
  propTypes: {
    now: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func,
  },


  getDefaultProps: function() {
    return {
      now: Moment.utc(),
    }
  },


  getInitialState: function() {
    return {
      now: this.props.now,
    }
  },



  onDayPreviousClick: function(e) {
    console.log("!");
    e.preventDefault();
    this.setState({
      now: this.state.now.clone().subtract(1, "day"),
    });
  },


  onDayNextClick: function(e) {
    console.log("!");
    e.preventDefault();
    this.setState({
      now: this.state.now.clone().add(1, "day"),
    });
  },


  onWeekPreviousClick: function(e) {
    console.log("!");
    e.preventDefault();
    this.setState({
      now: this.state.now.clone().subtract(1, "week"),
    });
  },


  onWeekNextClick: function(e) {
    console.log("!");
    e.preventDefault();
    this.setState({
      now: this.state.now.clone().add(1, "week"),
    });
  },


  onMonthPreviousClick: function(e) {
    console.log("!");
    e.preventDefault();
    this.setState({
      now: this.state.now.clone().subtract(1, "month"),
    });
  },


  onMonthNextClick: function(e) {
    console.log("!");
    e.preventDefault();
    this.setState({
      now: this.state.now.clone().add(1, "month"),
    });
  },


  onYearPreviousClick: function(e) {
    console.log("!");
    e.preventDefault();
    this.setState({
      now: this.state.now.clone().subtract(1, "year"),
    });
  },


  onYearNextClick: function(e) {
    console.log("!");
    e.preventDefault();
    this.setState({
      now: this.state.now.clone().add(1, "year"),
    });
  },


  // TODO add translation in week
  render: function() {
    return (
      <div className="text-center">
        <div className="btn-group margin-bottom-lg" role="group">
          <button type="button" className="btn btn-default-light"><i className="mdi mdi-chevron-left" onClick={this.onDayPreviousClick} /></button>
          <div className="btn btn-default-light">{this.state.now.clone().startOf("day").format("Mo (ddd)")}</div>
          <button type="button" className="btn btn-default-light"><i className="mdi mdi-chevron-right" onClick={this.onDayNextClick} /></button>
        </div>

        <div className="btn-group margin-bottom-lg">
          <button type="button" className="btn btn-default-light"><i className="mdi mdi-chevron-left" onClick={this.onWeekPreviousClick} /></button>
          <div className="btn btn-default-light">{this.state.now.clone().startOf("day").format("w")}</div>
          <button type="button" className="btn btn-default-light"><i className="mdi mdi-chevron-right" onClick={this.onWeekNextClick} /></button>
        </div>

        <div className="btn-group margin-bottom-lg">
          <button type="button" className="btn btn-default-light"><i className="mdi mdi-chevron-left" onClick={this.onMonthPreviousClick} /></button>
          <div className="btn btn-default-light">{this.state.now.clone().startOf("day").format("MMMM")}</div>
          <button type="button" className="btn btn-default-light"><i className="mdi mdi-chevron-right" onClick={this.onMonthNextClick} /></button>
        </div>

        <div className="btn-group margin-bottom-lg">
          <button type="button" className="btn btn-default-light"><i className="mdi mdi-chevron-left" onClick={this.onYearPreviousClick} /></button>
          <div className="btn btn-default-light">{this.state.now.clone().startOf("day").format("YYYY")}</div>
          <button type="button" className="btn btn-default-light"><i className="mdi mdi-chevron-right" onClick={this.onYearNextClick} /></button>
        </div>
      </div>
    );
  }
});
