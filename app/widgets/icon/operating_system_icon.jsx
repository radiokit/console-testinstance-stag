import React from 'react';


export default React.createClass({  
  propTypes: {
    type: React.PropTypes.oneOf(["android", "ios", "macosx", "windows", "linux"]).isRequired
  },


  render: function() {
    return (<i className={"mdi mdi-" + this.props.type} />);
  }
});