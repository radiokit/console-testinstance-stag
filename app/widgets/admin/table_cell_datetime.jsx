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
      format: 'lll',
    }
  },


  render: function() {
    const datetime = moment(this.props.value).format(this.props.format);

    return (<span>{datetime} UTC</span>);
  }
});
