import React from 'react';

import CardSidebar from './card_sidebar_widget.jsx';


export default React.createClass({
  contextTypes: {
    cardPadding: React.PropTypes.bool.isRequired,
    contentPrefix: React.PropTypes.string,
  },


  getDefaultProps: function() {
    return {
      cardPadding: true,
    }
  },


  render: function() {
    let klass;
    if(this.props.cardPadding === true) {
      klass = "card-body style-default-bright";
    } else {
      klass = "card-body style-default-bright no-padding";
    }

    return (
      <div className={klass}>
        {this.props.children}
      </div>
    );
  }
});
