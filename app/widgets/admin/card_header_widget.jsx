import React from 'react';
import ReactDOM from 'react-dom';
import Translate from 'react-translate-component';


export default React.createClass({
  contextTypes: {
    contentPrefix: React.PropTypes.string,
    headerText: React.PropTypes.string
  },


  renderHeader: function() {
    if(this.props.headerText) {
      return <header>{this.props.headerText}</header>
    } else {
      return <Translate content={this.context.contentPrefix + ".header"} component="header" />
    }
  },


  render: function() {
    return (
      <div className="card-head">
        {this.renderHeader()}

        {this.props.children}
      </div>
    );
  }
});
