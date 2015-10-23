import React from 'react';


export default React.createClass({  
  render: function() {
    return (
      <div className={"card card-underline style-gray-dark2"}>
        {this.props.children}
      </div>);
  }
});