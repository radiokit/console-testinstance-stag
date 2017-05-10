import React from 'react';


export default React.createClass({
  getDefaultProps() {
    return {
      sidebarColumnClasses: "col-sm-4 col-md-3 col-lg-2",
      contentColumnClasses: "col-sm-8 col-md-9 col-lg-10",
    };
  },

  render: function() {
    return (
      <div className="row">
        <div className={this.props.sidebarColumnClasses} style={{paddingRight: 0}}>
          {React.Children.toArray(this.props.children)[0]}
        </div>
        <div className={this.props.contentColumnClasses} style={{paddingLeft: 0}}>
          {React.Children.toArray(this.props.children)[1]}
        </div>
      </div>
    );
  }
});



