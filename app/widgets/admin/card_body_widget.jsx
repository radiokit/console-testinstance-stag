import React from 'react';


export default React.createClass({
  contextTypes: {
    cardTabs: React.PropTypes.arrayOf(React.PropTypes.string),
    cardPadding: React.PropTypes.bool.isRequired,
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

    if(this.context.cardTabs) {
      return (
        <div className={klass + " tab-content"}>
          {this.context.cardTabs.map((tab, i) => {
            return (
              <div key={tab} className="tab-pane" id={"tab-" + tab}>
                {React.Children.toArray(this.props.children)[i]}
              </div>
            );
          })}
        </div>
      );

    } else {
      return (
        <div className={klass}>
          {this.props.children}
        </div>
      );
    }
  }
});
