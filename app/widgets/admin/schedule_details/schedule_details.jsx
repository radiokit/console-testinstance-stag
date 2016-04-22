import React from 'react';

const ScheduleDetails = props => (
  <div>
    <h1>Schedule Details</h1>
    <pre>
      {JSON.stringify(props, null, '  ')}
    </pre>
  </div>
);

export default ScheduleDetails;
