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
                checked={value.get(`day${day}`, false)}
                onChange={e => this.triggerChange(value.set(`day${day}`, !!e.target.value))}
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
