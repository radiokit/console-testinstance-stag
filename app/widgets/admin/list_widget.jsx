import React from 'react';


export default React.createClass({  
  render: function() {
    return (<ul className="list divider-full-bleed">
      {this.props.children}
    </ul>);
  }
});