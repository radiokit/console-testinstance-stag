import React from 'react';


export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    cardPadding: React.PropTypes.bool
  },


  childContextTypes: {
    contentPrefix: React.PropTypes.string,
    cardPadding: React.PropTypes.bool,
  },


  getChildContext: function() {
    return {
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
      <div className="card card-underline style-gray-dark2">
        {this.props.children}
      </div>);
  }
});
