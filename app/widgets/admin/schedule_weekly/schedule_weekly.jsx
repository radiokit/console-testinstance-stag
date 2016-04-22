import React from 'react';

const ScheduleWeekly = props => (
  <div>
    <h1>Schedule Weekly</h1>
    <pre>
      {JSON.stringify(props, null, '  ')}
    </pre>
  </div>
);

export default ScheduleWeekly;
