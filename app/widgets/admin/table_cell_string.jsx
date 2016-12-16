import React from 'react';
import _ from 'lodash';

export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    value: React.PropTypes.string,
    attribute: React.PropTypes.string.isRequired,
    selectable: React.PropTypes.bool.isRequired,
    truncateLength: React.PropTypes.number.isRequired,
  },


  getDefaultProps: function() {
    return {
      truncateLength: 60,
      selectable: false,
    };
  },


  render: function() {
    const truncatedValue = _.truncate(this.props.value, {
      length: this.props.truncateLength,
      separator: /\.,? +/,
      omission: '…',
    });

    if(this.props.selectable) {
      return (<span className="selectable">{truncatedValue}</span>);

    } else {
      return (<span>{truncatedValue}</span>);
    }
  }
});
