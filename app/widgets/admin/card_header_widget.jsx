import React from 'react';
import Translate from 'react-translate-component';
import Counterpart from 'counterpart';

export default React.createClass({
  propTypes: {
    children: React.PropTypes.any,
    contentPrefix: React.PropTypes.string,
    headerText: React.PropTypes.string,
    selectedTab: React.PropTypes.string,
    tabs: React.PropTypes.arrayOf(React.PropTypes.string),
    onTabClick: React.PropTypes.func,
  },

  onTabClick(tab) {
    if (this.props.onTabClick) {
      this.props.onTabClick(tab);
    }
  },

  renderHeader() {
    if (this.props.headerText) {
      return <header>{this.props.headerText}</header>;
    }
    return <Translate content={`${this.props.contentPrefix}.header`} component="header" />;
  },

  renderTabs() {
    if (this.props.tabs) {
      return (
        <ul className="nav nav-tabs pull-right" data-toggle="tabs">
          {this.props.tabs.map((tab) => {
            let hint;
            const translationKey = `${this.props.contentPrefix}.tabs.hints.${tab}`;
            if (Counterpart.translate(translationKey, { fallback: '_notfound_' }) !== '_notfound_') {
              hint = Counterpart.translate(translationKey);
            } else {
              hint = null;
            }
            return (
              <li key={tab} className={tab === this.props.selectedTab ? 'active' : null}>
                <Translate
                  content={`${this.props.contentPrefix}.tabs.headers.${tab}`}
                  component="a"
                  title={hint}
                  onClick={() => this.onTabClick(tab)}
                />
              </li>
            );
          })}
        </ul>
      );
    }
    return null;
  },

  render() {
    return (
      <div className="card-head">
        {this.renderHeader()}
        {this.renderTabs()}
        {this.props.children}
      </div>
    );
  },
});
