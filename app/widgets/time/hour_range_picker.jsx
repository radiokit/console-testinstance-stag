import React from 'react';

import HourPicker from './hour_picker.jsx';

import Translate from 'react-translate-component';
import Counterpart from 'counterpart';
import localePL from './hour_range_picker_pl';
import localeEN from './hour_range_picker_en';

Counterpart.registerTranslations('en', localeEN);
Counterpart.registerTranslations('pl', localePL);

const HourRangePicker = React.createClass({
  propTypes: {
    value: React.PropTypes.object,
    onChange: React.PropTypes.func,
  },

  getValue() {
    const { value = Map() } = this.props;
    return value;
  },

  getStart() {
    return this.getValue().get('start');
  },

  getEnd() {
    return this.getValue().get('end');
  },

  triggerChange(newValue) {
    const { onChange = () => null } = this.props;
    onChange(newValue, this.getValue());
  },

  triggerStartChange(start) {
    this.triggerChange(this.getValue().set('start', start));
  },

  triggerEndChange(start) {
    this.triggerChange(this.getValue().set('end', start));
  },

  render() {
    return (
      <div className="HourRangePicker">
        <div className="form-group">
          <label className="text-bold">
            <Translate content="HourRangePicker.from" />
          </label>
          <HourPicker
            value={this.getStart()}
            onChange={this.triggerStartChange}
          />
        </div>
        <div className="form-group">
          <label className="text-bold">
            <Translate content="HourRangePicker.to" />
          </label>
          <HourPicker
            value={this.getEnd()}
            onChange={this.triggerEndChange}
          />
        </div>

      </div>
    );
  },
});

export default HourRangePicker;
