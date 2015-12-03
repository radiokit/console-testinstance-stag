import React from 'react';

export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    value: React.PropTypes.object,
    attribute: React.PropTypes.string.isRequired,
  },


  render: function() {
    if(this.props.value) {
      return (<span>{this.props.value.count()}</span>);
    } else {
      return (<span/>);
    }
  }
});
