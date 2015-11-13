import React from 'react';

export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    value: React.PropTypes.number,
    attribute: React.PropTypes.string.isRequired,
  },


  render: function() {
    return (<span>{value}&nbsp;dB</span>);
  }
});
