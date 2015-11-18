import React from 'react';

export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    value: React.PropTypes.number,
    attribute: React.PropTypes.string.isRequired,
  },


  render: function() {
    if(this.props.value) {
      return (<span>{Math.round(this.props.value*100) / 100}&nbsp;dB</span>);
      
    } else {
      return <span />
    }
  }
});
