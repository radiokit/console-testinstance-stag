import React from 'react';
import {
  Map,
} from 'immutable';
import {
  range,
} from 'lodash';
import moment from 'moment';

import './weekday_picker.scss';

const WeekDayPicker = React.createClass({
  propTypes: {
    value: React.PropTypes.object,
    onChange: React.PropTypes.func,
  },

  triggerChange(value) {
    const { onChange = () => null } = this.props;
    onChange(value);
  },

  render() {
    const { value = Map() } = this.props;
    return (
      <div className="WeekdayPicker">
        {
          range(0, 7).map(day => (
            <label className="WeekdayPicker__label">
              <input
                className="WeekdayPicker__input"
                type="checkbox"
                checked={value.get(`day${day}`, false)}
                onChange={() => this.triggerChange(value.set(`day${day}`, !value.get(`day${day}`)))}
              />
              {moment().startOf('week').add(day, 'days').format('dddd')}
            </label>
          ))
        }
      </div>
    );
  },
});

export default WeekDayPicker;
