import React from 'react';
import Datetime from 'react-datetime'
import Moment from 'moment';

import './date_time_picker.scss';

var DateTimePicker = React.createClass({
  propTypes: {
    required: React.PropTypes.bool,
    value: React.PropTypes.string
  },
  getInput: function() {
    return this.refs.datetime.refs.input;
  },
  render: function() {
    let value;
    if (this.props.value) {
      value = Moment.utc(this.props.value);
    } else {
      value = Moment.utc();
    }
    return <Datetime
      ref="datetime"
      defaultValue={value}
      dateFormat="Y-MM-DD"
      timeFormat="HH:mm:ss.SSS[Z]"
      inputProps={{ref: "input", className: "form-control", required: this.props.required }} />
  }
});

module.exports = DateTimePicker;
