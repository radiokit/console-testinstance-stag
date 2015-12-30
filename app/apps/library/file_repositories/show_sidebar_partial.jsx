import React from 'react';

export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    app: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
  },


  render: function() {
    return (
      <div>
        <ul className="nav nav-pills nav-stacked">
          <li><small>LOCATION</small></li>
          <li><a>INCOMING</a></li>
          <li><a>READY</a></li>
          <li><a>ARCHIVE</a></li>
          <li><a>TRASH</a></li>
        </ul>
      </div>
    );
  }
});
