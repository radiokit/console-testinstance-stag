import React from 'react';
import { DatePicker, TimePicker, TextField } from 'material-ui';
import {
  assign,
} from 'lodash';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import {
  appendTimezoneToDateParts,
  getDatePartsInDifferentTimezone,
  datePartsToDate,
  datePartsToISOString,
  formatHM,
  formatDisplayDate,
} from './input_local_date_time_utils';

import './input_local_date_time.scss';

const InputLocalDateTime = React.createClass({
  propTypes: {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    tz: React.PropTypes.string.isRequired,
    disabled: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      disabled: false,
    };
  },

  /**
   * @returns {{year, month, day, hour, minute, second, tz}|DatePartWithTimezone}
   */
  getDateParts() {
    return getDatePartsInDifferentTimezone(
      new Date(this.props.value),
      this.props.tz
    );
  },

  /**
   * @returns {Date}
   */
  getDate() {
    if (!this.props.value) {
      return null;
    }

    return datePartsToDate(this.getDateParts());
  },

  /**
   * @returns {number}
     */
  getSeconds() {
    return this.getDateParts().second;
  },

  /**
   * @param {string} newValue
     */
  triggerChange(newValue) {
    const { onChange = () => null } = this.props;
    onChange(newValue);
  },

  /**
   * @param {DateParts} newDateParts
     */
  handleChange(newDateParts) {
    this.triggerChange(
      datePartsToISOString(
        appendTimezoneToDateParts(
          newDateParts,
          this.props.tz
        )
      )
    );
  },

  /**
   * @param {Event} _
   * @param {Date} newTimeValue
     */
  handleTimeChange(_, newTimeValue) {
    const newDateParts = {
      ...this.getDateParts(),
      hour: newTimeValue.getHours(),
      minute: newTimeValue.getMinutes(),
    };
    this.handleChange(newDateParts);
  },

  /**
   * @param {Event} _
   * @param {Date} newDateValue
     */
  handleDateChange(_, newDateValue) {
    const newDateParts = {
      ...this.getDateParts(),
      year: newDateValue.getFullYear(),
      month: newDateValue.getMonth() + 1,
      day: newDateValue.getDate(),
    };
    this.handleChange(newDateParts);
  },

  /**
   * @param {SyntheticEvent}
     */
  handleSecondsChange(e) {
    const newDateParts = {
      ...this.getDateParts(),
      second: parseInt(e.target.value, 10),
    };
    this.handleChange(newDateParts);
  },

  render() {
    return (
      <div className="InputLocalDateTime row">
        <div className="InputLocalDateTime__date col-xs-5">
          {
            this.props.disabled
              ? (
              <TextFieldReadonly value={formatDisplayDate(this.getDate())} />
            )
              : (
              <div
                style={{ width: '500px' }}
              >
                <DatePicker
                  disabled={this.props.disabled}
                  hintText=""
                  container="inline"
                  formatDate={formatDisplayDate}
                  mode="landscape"
                  value={this.getDate()}
                  onChange={this.handleDateChange}
                  textFieldStyle={{ width: '100%' }}
                />
              </div>
            )
          }
        </div>
        <div className="InputLocalDateTime__time col-xs-4">
          {
            this.props.disabled
              ? (
              <TextFieldReadonly value={formatHM(this.getDateParts())} />
            )
              : (
              <TimePicker
                disabled={this.props.disabled}
                format="24hr"
                hintText=""
                key={this.getDate().valueOf()}
                defaultTime={this.getDate()}
                onChange={this.handleTimeChange}
                style={{ width: '100%' }}
                textFieldStyle={{ width: '100%' }}
              />
            )
          }
        </div>
        <div className="InputLocalDateTime__separator col-xs-1">
          :
        </div>
        <div className="InputLocalDateTime__seconds col-xs-2">
          <TextField
            fullWidth
            disabled={this.props.disabled}
            type="number"
            min="0"
            max="59"
            value={this.getSeconds()}
            onChange={this.handleSecondsChange}
          />
        </div>
      </div>
    );
  },
});

export default InputLocalDateTime;

function TextFieldReadonly({ value }) {
  return (
    <TextField
      fullWidth
      defaultValue={value}
      value={value}
      key={value}
      disabled
    />
  );
}

TextFieldReadonly.propTypes = {
  value: React.PropTypes.string,
};
