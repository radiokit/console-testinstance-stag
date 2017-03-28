import React from 'react';
import moment from 'moment';

export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    value: React.PropTypes.string,
    attribute: React.PropTypes.string.isRequired,
  },


  render: function() {
    const datetime = moment(this.props.value).format('lll z');

    return (<span>{datetime}</span>);
  }
});
