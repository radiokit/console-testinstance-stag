import React from 'react';
import {
  Map,
} from 'immutable';

import Translate from 'react-translate-component';
import Counterpart from 'counterpart';
import localePL from './hour_picker_pl';
import localeEN from './hour_picker_en';

Counterpart.registerTranslations('en', localeEN);
Counterpart.registerTranslations('pl', localePL);

import './hour_picker.scss';

const HourPicker = React.createClass({
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
      <div className="HourPicker row form">
        <div className="col-xs-4">
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              value={value.get('hour', 0)}
              min="0"
              max="23"
              onChange={
                e => this.triggerChange(
                  value.set('hour', parseInt(e.target.value, 10))
                )
              }
            />
            <Translate component="label" content="HourPicker.hour" />
          </div>
        </div>
        <div className="col-xs-4">
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              value={value.get('minutes', 0)}
              min="0"
              max="59"
              onChange={
                e => this.triggerChange(
                  value.set('minutes', parseInt(e.target.value, 10))
                )
              }
            />
            <Translate component="label" content="HourPicker.minute" />
          </div>
        </div>
        <div className="col-xs-4">
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              value={value.get('seconds', 0)}
              min="0"
              max="59"
              onChange={
                e => this.triggerChange(
                  value.set('seconds', parseInt(e.target.value, 10))
                )
              }
            />
            <Translate component="label" content="HourPicker.second" />
          </div>
        </div>
      </div>
    );
  },
});

export default HourPicker;
