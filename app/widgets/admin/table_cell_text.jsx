import React from 'react';
import _ from 'lodash';

export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    value: React.PropTypes.string,
    attribute: React.PropTypes.string.isRequired,
    truncateLength: React.PropTypes.number.isRequired,
  },


  getDefaultProps: function() {
    return {
      truncateLength: 60,
    };
  },


  render: function() {
    const truncatedValue = _.truncate(this.props.value, {
      length: this.props.truncateLength,
      separator: /\.,? +/,
      omission: '…',
    });

    return (<span>{truncatedValue}</span>);
  }
});
