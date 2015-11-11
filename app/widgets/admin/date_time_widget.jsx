import React from 'react';
import moment from 'moment';
import momentTz from 'moment-timezone';


export default React.createClass({
  propTypes: {
    datetime: React.PropTypes.string.isRequired,
    timezone: React.PropTypes.string.isRequired,
    format:   React.PropTypes.string.isRequired
  },

  getDefaultProps: function() {
    return {
      format: "LTS"
    }
  },

  renderDateTime: function() {
    return moment
      .parseZone(this.props.datetime)
      .tz(this.props.timezone)
      .format(this.props.format);
  },

  render: function() {
    return (
      <span className="date-time-widget widget">
        {this.renderDateTime()}
      </span>
    );
  }
});