import React from 'react';


export default React.createClass({  
  render: function() {
    return (
      <div className="card-body">
        {this.props.children}
      </div>
    );
  }
});