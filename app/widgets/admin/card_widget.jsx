import React from 'react';
import Translate from 'react-translate-component';

export default React.createClass({  
  propTypes: {
    padding: React.PropTypes.bool,
    header: React.PropTypes.bool,
    headerTextKey: React.PropTypes.string
  },


  getDefaultProps: function() {
    return {
      padding: true,
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


  renderBody: function() {
    let bodyClassName = ["card-body"]

    if(!this.props.padding) bodyClassName.push("no-padding")

    return (
      <div className={bodyClassName.join(" ")}>
        {this.props.children}
      </div>
    );
  },


  render: function() {
    return (
      <div className={"card card-underline " + this.props.className}>
        {this.renderHeader()}
        {this.renderBody()}
      </div>);
  }
});