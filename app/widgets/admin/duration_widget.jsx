import React from 'react';

export default React.createClass({
  propTypes: {
    duration: React.PropTypes.number.isRequired
  },

  millisecondsToHuman: function(v) {
    seconds = parseInt(v / 1000);
    minutes = seconds / 60;
    seconds = seconds % 60;

    hours = minutes / 60;
    minutes = minutes % 60;

    return this.padTwo(hours) + ":" + this.padTwo(minutes) + ":" + this.padTwo(seconds);
  },

  millisecondsToHumanWithFraction: function(v) {
    return [ this.millisecondsToHuman(v), Math.floor(v % 1000 / 100) ];
  },

  padTwo: function(d) {
    if(d < 10) {
      return '0' + parseInt(d);
    } else {
      return '' + parseInt(d);
    }
  },

  render: function() {
    if(this.props.duration == null) {
      return (
        <span className="duration-widget widget"></span>
      );
    } else {
      return (
        <span className="duration-widget widget">
          <span className="duration-full">{this.millisecondsToHumanWithFraction(this.props.duration)[0]}</span>
          <span className="duration-fraction">.{this.millisecondsToHumanWithFraction(this.props.duration)[1]}</span>
        </span>
      );
    }
  }
});