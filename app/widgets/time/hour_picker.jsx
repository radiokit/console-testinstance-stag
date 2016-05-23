import React from 'react';
import {
  Map,
} from 'immutable';

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
      <div className="HourPicker">
        <input
          type="number"
          value={value.get('hour', 0)}
          min="0"
          max="23"
          onChange={
            e => this.triggerChange(
              value.set('hour', parseInt(e.target.value, 10))
            )
          }
        />
        :
        <input
          type="number"
          value={value.get('minutes', 0)}
          min="0"
          max="59"
          onChange={
            e => this.triggerChange(
              value.set('minutes', parseInt(e.target.value, 10))
            )
          }
        />
        :
        <input
          type="number"
          value={value.get('seconds', 0)}
          min="0"
          max="999"
          onChange={
            e => this.triggerChange(
              value.set('seconds', parseInt(e.target.value, 10))
            )
          }
        />
      </div>
    );
  },
});

export default HourPicker;
