import React from 'react';
import moment from 'moment';

const ScheduleWeekly = React.createClass({
  propTypes: {
    currentBroadcastChannel: React.PropTypes.object,
    offsetStart: React.PropTypes.number,
    onOffsetStartChange: React.PropTypes.func,
    activeItem: React.PropTypes.object,
    onActiveItemChange: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      offsetStart: Date.now(),
      onOffsetStartChange: () => null,
      activeItem: null,
      onActiveItemChange: () => null,
    };
  },

  render() {
    return (
      <div>
        <h1>Schedule Weekly</h1>
        <button onClick={
          () => {
            this.props.onOffsetStartChange(
              this.props.offsetStart
              + 1000 * 3600 * 24
            );
          }
        }
        >
          +1 day
        </button>
        <pre>
          {moment(this.props.offsetStart).format('LLL')}
        </pre>
      </div>
    );
  },
});

export default ScheduleWeekly;
