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
    weekdayNames: React.PropTypes.array,
  },

  triggerChange(value) {
    const { onChange = () => null } = this.props;
    onChange(value);
  },

  render() {
    this.weekdayNames = this.weekdayNames || range(0, 7).map(day => moment().day(1).add(day, 'days').format('dddd'));

    const { value = Map() } = this.props;

    return (
      <div className="WeekdayPicker">
        {
          range(0, 7).map(day => (
            <span className="checkbox-inline checkbox-styled">
              <label className="WeekdayPicker__label" key={day}>
                <input
                  className="WeekdayPicker__input"
                  type="checkbox"
                  checked={value.get(day, false)}
                  onChange={e => {
                    this.triggerChange(value.set(day, !!e.target.checked));
                  }}
                />
                <span>{this.weekdayNames[day]}</span>
              </label>
            </span>
          ))
        }
      </div>
    );
  },
});
/*
 <label>
 <input type="checkbox" value="">
 <span>Default checkbox</span>
 </label>
 */
export default WeekDayPicker;
