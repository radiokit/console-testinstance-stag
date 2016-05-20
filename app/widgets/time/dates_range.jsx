import React from 'react';
import {
  Map,
} from 'immutable';

import Translate from 'react-translate-component';
import Counterpart from 'counterpart';
import localePL from './dates_range_pl';
import localeEN from './dates_range_en';

Counterpart.registerTranslations('en', localeEN);
Counterpart.registerTranslations('pl', localePL);

const START = 'start';
const END = 'end';

const DatesRange = React.createClass({
  propTypes: {
    value: React.PropTypes.object,
    onChange: React.PropTypes.func,
  },

  getValue() {
    return this.props.value || Map();
  },

  getStart() {
    return this.getValue().get(START);
  },

  getEnd() {
    return this.getValue().get(END);
  },

  triggerChange(value) {
    const { onChange = () => null } = this.props;
    onChange(value, this.props.value);
  },

  handleStartDateChange(e) {
    this.triggerChange(
      this.getValue().set(START, e.target.value)
    );
  },

  handleEndDateChange(e) {
    this.triggerChange(
      this.getValue().set(END, e.target.value)
    );
  },

  isStartValid() {
    return (
      this.getStart() &&
      (
        !this.getEnd() ||
        new Date(this.getStart()) < new Date(this.getEnd())
      )
    );
  },

  isEndValid() {
    return (
      this.getEnd() &&
      (
        !this.getStart() ||
        new Date(this.getStart()) < new Date(this.getEnd())
      )
    );
  },

  render() {
    return (
      <fieldset>
        <div>
          <Translate
            content="DatesRange.from"
            component="label"
          />
          <input
            type="datetime-local"
            value={this.getStart()}
            max={this.getEnd()}
            onChange={this.handleStartDateChange}
          />
          { this.isStartValid() && '✓' || '✗' }
        </div>
        <div>
          <Translate
            content="DatesRange.to"
            component="label"
          />
          <input
            type="datetime-local"
            value={this.getEnd()}
            min={this.getStart()}
            onChange={this.handleEndDateChange}
          />
          { this.isEndValid() && '✓' || '✗' }
        </div>
      </fieldset>
    );
  },
});

export default DatesRange;
