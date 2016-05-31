import React from 'react';
import {
  Map,
} from 'immutable';
import {
  range,
} from 'lodash';
import moment from 'moment';

const WeekDayPicker = React.createClass({
  propTypes: {
    value: React.PropTypes.object,
    onChange: React.PropTypes.func,
    weekdayNames: React.PropTypes.array,
  },

  getDefaultProps() {
    return {
      weekdayNames: range(0, 7).map(day => moment().day(1).add(day, 'days').format('dddd')),
    };
  },

  triggerChange(value) {
    const { onChange = () => null } = this.props;
    onChange(value);
  },

  render() {
    const { value = Map() } = this.props;
    return (
      <div>
        {
          range(0, 7).map(day => (
            <label>
              <input
                type="checkbox"
                checked={value.get(day, false)}
                onChange={e => {
                  this.triggerChange(value.set(day, !!e.target.checked));
                }}
              />
              {this.props.weekdayNames[day]}
            </label>
          ))
        }
      </div>
    );
  },
});

export default WeekDayPicker;
