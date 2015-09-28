import React from 'react';

export default React.createClass({
  propTypes: {
    parent: React.PropTypes.object.isRequired
  },


  render: function() {
    if(this.props.parent.props.children) {
      return React.cloneElement(this.props.parent.props.children, this.props.parent.props);

    } else {
      return <div/>;
    }
  }
});
