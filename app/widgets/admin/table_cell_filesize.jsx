import React from 'react';
import filesize from 'filesize';

export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    value: React.PropTypes.number.isRequired,
    attribute: React.PropTypes.string.isRequired,
  },


  render: function() {
    return (<span>{filesize(this.props.value)}</span>);
  }
});
