import React from 'react';

export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    value: React.PropTypes.string,
    attribute: React.PropTypes.string.isRequired,
    selectable: React.PropTypes.bool.isRequired,
  },


  getDefaultProps: function() {
    return {
      selectable: false
    };
  },


  render: function() {
    if(this.props.selectable) {
      return (<span className="selectable">{this.props.value}</span>);

    } else {
      return (<span>{this.props.value}</span>);
    }
  }
});
