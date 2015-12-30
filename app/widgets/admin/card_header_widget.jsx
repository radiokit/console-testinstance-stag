import React from 'react';
import ReactDOM from 'react-dom';
import Translate from 'react-translate-component';


export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string,
    headerText: React.PropTypes.string,
    selectedTab: React.PropTypes.string,
    tabs: React.PropTypes.arrayOf(React.PropTypes.string),
    onTabClick: React.PropTypes.func,
  },


  renderHeader: function() {
    if(this.props.headerText) {
      return <header>{this.props.headerText}</header>
    } else {
      return <Translate content={this.props.contentPrefix + ".header"} component="header" />
    }
  },


  onTabClick: function(tab) {
    if(this.props.onTabClick) {
      this.props.onTabClick(tab);
    }
  },


  renderTabs: function() {
    if(this.props.tabs) {
      return (
        <ul className="nav nav-tabs pull-right" data-toggle="tabs">
          {this.props.tabs.map((tab) => {
            return <li key={tab} className={tab === this.props.selectedTab ? "active" : null}><Translate content={this.props.contentPrefix + ".tabs.headers." + tab} component="a" onClick={this.onTabClick.bind(this, tab)} /></li>;
          })}
        </ul>
      );
    }
  },


  render: function() {
    return (
      <div className="card-head">
        {this.renderHeader()}
        {this.renderTabs()}
        {this.props.children}
      </div>
    );
  }
});
