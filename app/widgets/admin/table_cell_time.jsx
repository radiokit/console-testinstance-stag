import React from 'react';
import moment from 'moment';

export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    value: React.PropTypes.string,
    attribute: React.PropTypes.string.isRequired,
    format: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      format: 'HH:mm',
    };
  },

  render: function() {
    const time = moment(this.props.value).format(this.props.format);

    return (<span>{time}</span>);
  },
});
