import React from 'react';

export default React.createClass({

  componentDidMount: function() {
    $(this.refs.calendarContainer.getDOMNode()).fullCalendar();
  },

  render: function() {
    return (
      <section>
        <div className="section-body">
          <div className="row">
            <div className="card style-default-light">
              <div className="card-body style-default-bright">
                <div ref="calendarContainer" className="calendar-container"/>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
});