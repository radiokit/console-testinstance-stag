import React from 'react';


export default React.createClass({  
  propTypes: {
    size: React.PropTypes.oneOf(['xsmall', 'small', 'medium', 'large']),
    center: React.PropTypes.bool
  },


  getDefaultProps: function() {
    return { 
      size: "large",
      center: false
    };
  },


  render: function() {
    switch(this.props.size) {      
      case "xsmall":  
        if(this.props.center) {
          var klass = "col-md-2 col-md-offset-5"; 
        } else {
          var klass = "col-md-2"; 
        }
        break;
      
      case "small":  
        if(this.props.center) {
          var klass = "col-md-4 col-md-offset-4"; 
        } else {
          var klass = "col-md-4"; 
        }
        break;
      
      case "medium": 
        if(this.props.center) {
          var klass = "col-md-8 col-md-offset-2"; 
        } else {
          var klass = "col-md-8"; 
        }
        break;

      case "large":  
        var klass = "col-md-12"; 
        break;
    }

    return (<div className={klass}>{this.props.children}</div>);
  }
});