import React from 'react';


export default React.createClass({  
  render: function() {
    return (<form className="form" role="form">
      {this.props.children}
    </form>);
  }
});