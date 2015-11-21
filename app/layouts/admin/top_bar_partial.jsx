import React from 'react';
import { Link } from 'react-router';
import Gravatar from 'gravatar-api';


export default React.createClass({
  contextTypes: {
    currentUserAccount: React.PropTypes.object.isRequired,
    currentEditor: React.PropTypes.object.isRequired,
    currentBroadcastChannel: React.PropTypes.object.isRequired,
  },


  renderLogo: function() {
    return (
      <li className="header-nav-brand">
        <div className="brand-holder">
          <Link to="/">
            <img src={require('../../assets/images/logo-horizontal.svg')} />
          </Link>
        </div>
      </li>
    );
  },


  renderUserAccountDropdown: function() {
    if(this.context.currentUserAccount) {
      return (
        <li className="header-nav-brand">
          <div className="brand-holder">
            <span className="header-nav-breadcrumb-separator mdi mdi-chevron-right"/>
            <span className="header-nav-breadcrumb-label">{this.context.currentUserAccount.get("name_custom")}</span>
          </div>
        </li>);
    }
  },


  renderBroadcastChannelDropdown: function() {
    if(this.context.currentBroadcastChannel) {
      return (
        <li className="header-nav-brand">
          <div className="brand-holder">
            <span className="header-nav-breadcrumb-separator mdi mdi-chevron-right"/>
            <span className="header-nav-breadcrumb-label">{this.context.currentBroadcastChannel.get("name")}</span>
          </div>
        </li>);
    }
  },


  renderEditorDropdown: function() {
    return (
      <ul className="header-nav header-nav-profile">
        <li className="dropdown">
          <a aria-expanded="false" className="dropdown-toggle ink-reaction" data-toggle="dropdown">
            <img src={Gravatar.imageUrl({ email: this.context.currentEditor.get("email"), parameters: { s: "40", d: "mm" }, secure: true })} alt="" />
            <span className="profile-info">
              {this.context.currentEditor.get("email")}
            </span>
          </a>
        </li>
      </ul>);
  },


  render: function() {
    return (<header id="header">
      <div className="headerbar">
        <div className="headerbar-left">
          <ul className="header-nav header-nav-options">
            {this.renderLogo()}
            {this.renderUserAccountDropdown()}
            {this.renderBroadcastChannelDropdown()}
          </ul>
        </div>


        <div className="headerbar-right">
          {this.renderEditorDropdown()}
        </div>
      </div>
    </header>);
  }
});
