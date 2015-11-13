import React from 'react';


export default React.createClass({
  propTypes: {
    tabs: React.PropTypes.arrayOf(React.PropTypes.string),
    contentPrefix: React.PropTypes.string.isRequired
  },


  childContextTypes: {
    tabs: React.PropTypes.arrayOf(React.PropTypes.string),
    contentPrefix: React.PropTypes.string
  },


  getChildContext: function() {
    return {
      tabs: this.props.tabs,
      contentPrefix: this.props.contentPrefix
    };
  },


  render: function() {
    return (
      <div className={"card card-underline style-gray-dark2"}>
        {this.props.children}
      </div>);
  }
});
