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

  triggerChange(newValue) {
    const { onChange = () => null } = this.props;
    onChange(newValue);
  },

  render() {
    const { value = Map() } = this.props;
    return (
      <div className="HourRangePicker">
        <div>
          <Translate component="label" content="HourRangePicker.from" />
          <HourPicker
            value={value.get('start')}
            onChange={start => this.triggerChange(value.set('start', start))}
          />
        </div>
        <div>
          <Translate component="label" content="HourRangePicker.to" />
          <HourPicker
            value={value.get('end')}
            onChange={end => this.triggerChange(value.set('end', end))}
          />
        </div>

      </div>
    );
  },
});

export default HourRangePicker;
