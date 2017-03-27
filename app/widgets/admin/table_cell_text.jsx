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

    let titleValue = null;
    if(this.props.value !== truncatedValue) {
      titleValue = this.props.value;
    }

    if(this.props.selectable) {
      return (<span className="selectable" title={titleValue}>{truncatedValue}</span>);

    } else {
      return (<span title={titleValue}>{truncatedValue}</span>);
    }
  }
});
