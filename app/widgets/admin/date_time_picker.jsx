import React from 'react';
import Datetime from 'react-datetime'
import Moment from 'moment';

import './date_time_picker.scss';

var DateTimePicker = React.createClass({
  propTypes: {
    required: React.PropTypes.bool
  },
  getInput: function() {
    return this.refs.datetime.refs.input;
  },
  render: function() {
    return <Datetime
      ref="datetime"
      defaultValue={Moment.utc()}
      isValidDate={this.valid}
      timeFormat="HH:mm:ss.SSS"
      inputProps={{ref: "input", className: "form-control", required: this.props.required }} />
  }
});

module.exports = DateTimePicker;
