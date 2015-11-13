import React from 'react';
import ReactDOM from 'react-dom';
import Translate from 'react-translate-component';


export default React.createClass({
  contextTypes: {
    cardTabs: React.PropTypes.arrayOf(React.PropTypes.string),
    contentPrefix: React.PropTypes.string,
    headerText: React.PropTypes.string
  },


  onTabClick: function(e) {
    e.preventDefault();
    $(e.target).tab('show');
  },


  renderHeader: function() {
    if(this.props.headerText) {
      return <header>{this.props.headerText}</header>
    } else {
      return <Translate content={this.context.contentPrefix + ".header"} component="header" />
    }
  },


  componentDidMount: function() {
    if(this.context.cardTabs && this.context.cardTabs.length !== 0) {
      $(ReactDOM.findDOMNode(this.refs.tabLink0)).tab('show');
    }
  },


  render: function() {
    if(this.context.cardTabs && this.context.cardTabs.length !== 0) {
      return (
        <div className="card-head">
          {this.renderHeader()}

          {this.props.children}

          <ul className="nav nav-tabs pull-right" data-toggle="tabs">
            {this.context.cardTabs.map((tab, i) => {
              return <li key={tab}><Translate ref={"tabLink" + i} content={this.context.contentPrefix + ".tabs.headers." + tab} component="a" href={"#tab-" + tab} onClick={this.onTabClick} /></li>;
            })}
          </ul>
        </div>
      );

    } else {
      return (
        <div className="card-head">
          {this.renderHeader()}

          {this.props.children}
        </div>
      );
    }


  }
});
