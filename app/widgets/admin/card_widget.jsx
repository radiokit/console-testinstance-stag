import React from 'react';
import Translate from 'react-translate-component';

export default React.createClass({  
  propTypes: {
    header: React.PropTypes.bool,
    headerTextKey: React.PropTypes.string
  },


  getDefaultProps: function() {
    return {
      header: false,
      headerTextKey: null
    }
  },


  renderHeader: function() {
    if(this.props.header) {
      return (
        <div className="card-head">
          <Translate content={this.props.headerTextKey} component="header" />
        </div>
      );
    } else {
      return null;
    }
  },


  render: function() {
    return (
      <div className={"card card-underline " + this.props.className}>
        {this.renderHeader()}
        {this.props.children}
      </div>);
  }
});