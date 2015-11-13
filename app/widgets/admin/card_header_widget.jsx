import React from 'react';
import Translate from 'react-translate-component';


export default React.createClass({
  contextTypes: {
    tabs: React.PropTypes.arrayOf(React.PropTypes.string),
    contentPrefix: React.PropTypes.string
  },


  onTabClick: function(e) {
    e.preventDefault();
    $(e.target).tab('show');
  },


  render: function() {
    if(this.context.tabs) {
      return (
        <div className="card-head">
          <Translate content={this.context.contentPrefix + ".header"} component="header" />

          {this.props.children}

          <ul className="nav nav-tabs pull-right" data-toggle="tabs">
            {this.context.tabs.map((tab) => {
              return <li key={tab}><Translate content={this.context.contentPrefix + ".tabs.headers." + tab} component="a" href={"#tab-" + tab} onClick={this.onTabClick} /></li>;
            })}
          </ul>
        </div>
      );

    } else {
      return (
        <div className="card-head">
          <Translate content={this.props.headerTextKey} component="header" />
          {this.props.children}
        </div>
      );
    }


  }
});
