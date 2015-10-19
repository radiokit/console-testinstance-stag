import React from 'react';


export default React.createClass({  
  propTypes: {
    size: React.PropTypes.oneOf(['small', 'medium', 'large'])
  },


  getDefaultProps: function() {
    return { size: "large" };
  },


  render: function() {
    switch(this.props.size) {
      case "small":  var klass = "col-md-4 col-md-offset-4"; break;
      case "medium": var klass = "col-md-8 col-md-offset-2"; break;
      case "large":  var klass = "col-md-12"; break;
    }

    return (<div className="row"><div className={klass}>{this.props.children}</div></div>);
  }
});