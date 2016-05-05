import React from 'react';

export default React.createClass({
  propTypes: {
    cardPadding: React.PropTypes.bool.isRequired,
    contentPrefix: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      cardPadding: true,
    };
  },

  render() {
    let className;
    if (this.props.cardPadding === true) {
      className = 'card-body style-default-bright';
    } else {
      className = 'card-body style-default-bright no-padding';
    }

    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  },
});
