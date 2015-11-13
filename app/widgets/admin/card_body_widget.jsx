import React from 'react';


export default React.createClass({
  contextTypes: {
    tabs: React.PropTypes.arrayOf(React.PropTypes.string)
  },


  render: function() {
    if(this.context.tabs) {
      return (
        <div className="card-body style-default-bright tab-content">
          {this.context.tabs.map((tab, i) => {
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
        <div className="card-body style-default-bright">
          {this.props.children}
        </div>
      );
    }
  }
});
