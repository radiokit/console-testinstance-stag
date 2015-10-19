import React from 'react';


export default React.createClass({  
  render: function() {
    return (<div className="card-actionbar">
        <div className="card-actionbar-row">
          {this.props.children}
        </div>
      </div>);
  }
});