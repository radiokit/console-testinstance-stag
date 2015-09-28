import React from 'react';


export default React.createClass({  
  render: function() {
    return (<li className="tile">
      <div className="tile-content">
        <div className="tile-text">{this.props.children}</div>
      </div>
    </li>);
  }
});