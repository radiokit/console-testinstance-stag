import React from 'react';
import Translate from 'react-translate-component';


export default React.createClass({  
  propTypes: {
    headerTextKey: React.PropTypes.string.isRequired
  },


  render: function() {
    return (
      <div className="card-head">
        <Translate content={this.props.headerTextKey} component="header" />
        {this.props.children}
      </div>
    );
  }
});