import React from 'react';


export default React.createClass({
  propTypes: {
    cardTabs: React.PropTypes.arrayOf(React.PropTypes.string),
    contentPrefix: React.PropTypes.string.isRequired,
    cardPadding: React.PropTypes.bool
  },


  childContextTypes: {
    cardTabs: React.PropTypes.arrayOf(React.PropTypes.string),
    contentPrefix: React.PropTypes.string,
    cardPadding: React.PropTypes.bool,
  },


  getChildContext: function() {
    return {
      cardTabs: this.props.cardTabs,
      contentPrefix: this.props.contentPrefix,
      cardPadding: this.props.cardPadding
    };
  },


  getDefaultProps: function() {
    return {
      cardPadding: true
    }
  },


  render: function() {
    return (
      <div className={"card card-underline style-gray-dark2"}>
        {this.props.children}
      </div>);
  }
});
