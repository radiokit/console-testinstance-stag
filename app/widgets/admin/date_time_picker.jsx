import React from 'react';
import Datetime from 'react-datetime'
import Moment from 'moment';

import './date_time_picker.scss';

const DateTimePicker = React.createClass({
  propTypes: {
    required: React.PropTypes.bool,
    defaultValue: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      defaultValue: Moment.utc()
    };
  },

  getInput: function() {
    return Moment(this.refs.datetime.refs.input.value).toISOString();
  },

  render: function() {
    let value;
    if (this.props.defaultValue) {
      value = Moment.utc(this.props.defaultValue);
    } else {
      value = this.state.defaultValue;
    }
    return (
      <Datetime
        ref="datetime"
        defaultValue={value}
        dateFormat="Y-MM-DD"
        timeFormat="HH:mm:ss.SSS[Z]"
        inputProps={{
          ref: "input",
          className: "form-control",
          required: this.props.required
        }} />
    );
  }
});

module.exports = DateTimePicker;
