import React from 'react';


export default React.createClass({  
  render: function() {
    return (
      <div className="card-body style-default-bright">
        {this.props.children}
      </div>
    );
  }
});