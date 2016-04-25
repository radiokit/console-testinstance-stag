import React from 'react';
import moment from 'moment';

const ScheduleDetails = React.createClass({
  propTypes: {
    currentBroadcastChannel: React.PropTypes.object,
    offsetStart: React.PropTypes.number,
    onOffsetStartChange: React.PropTypes.func,
    activeItem: React.PropTypes.object,
    onActiveItemChange: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      offsetStart: moment().unix(),
      onOffsetStartChange: () => null,
      activeItem: null,
      onActiveItemChange: () => null,
    };
  },
  
  render() {
    return (
      <div>
        <h1>Schedule Details</h1>
        <pre>
          {JSON.stringify(this.props, null, '  ')}
        </pre>
      </div>
    );
  },
});

export default ScheduleDetails;
