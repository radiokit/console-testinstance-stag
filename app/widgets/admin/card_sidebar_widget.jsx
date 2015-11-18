import React from 'react';


export default React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-sm-4 col-md-3 col-lg-2" style={{paddingRight: 0}}>
          {React.Children.toArray(this.props.children)[0]}
        </div>
        <div className="col-sm-8 col-md-9 col-lg-10" style={{paddingLeft: 0}}>
          {React.Children.toArray(this.props.children)[1]}
        </div>
      </div>
    );
  }
});
