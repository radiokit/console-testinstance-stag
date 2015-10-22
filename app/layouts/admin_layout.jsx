import React from 'react';
import { Router, Link } from 'react-router';
import Gravatar from 'gravatar-api';

import '../assets/stylesheets/layouts/admin_layout.scss';
import '../../vendor/assets/stylesheets/materialadmin/materialadmin.css';
import '../../vendor/assets/stylesheets/materialadmin/material-design-iconic-font.css';

export default React.createClass({
  renderLogo: function() {
    return (
      <li className="header-nav-brand">
        <div className="brand-holder">
          <Link to="/">
            <img src={require('../assets/images/logo-horizontal.svg')} />
          </Link>
        </div>
      </li>
    );
  },


  renderAccountDropdown: function() {
    if(this.props.availableAccounts.size > 1) {
      return (
        <li className="header-nav-brand">
          <div className="brand-holder">
            <span className="header-nav-breadcrumb-separator mdi mdi-chevron-right"/>
            <span className="header-nav-breadcrumb-label">{this.props.currentAccount.get("name_custom")}</span>
          </div>
        </li>);
    }
  },


  renderChannelDropdown: function() {
    return (
      <li className="header-nav-brand">
        <div className="brand-holder">
          <span className="header-nav-breadcrumb-separator mdi mdi-chevron-right"/>
          <span className="header-nav-breadcrumb-label">{this.props.currentChannel.get("name")}</span>
        </div>
      </li>);
  },


  renderEditorDropdown: function() {
    return (
      <ul className="header-nav header-nav-profile">
        <li className="dropdown">
          <a aria-expanded="false" className="dropdown-toggle ink-reaction" data-toggle="dropdown">
            <img src={Gravatar.imageUrl({ email: this.props.currentEditor.get("email"), parameters: { s: "40", d: "mm" }, secure: true })} alt="" />
            <span className="profile-info">
              {this.props.currentEditor.get("email")}
            </span>
          </a>
        </li>
      </ul>);
  },


  renderHeader: function() {
    return (<header id="header">
      <div className="headerbar">
        <div className="headerbar-left">
          <ul className="header-nav header-nav-options">
            {this.renderLogo()}
            {this.renderAccountDropdown()}
            {this.renderChannelDropdown()}
          </ul>
        </div>


        <div className="headerbar-right">
          {this.renderEditorDropdown()}
        </div>
      </div>
    </header>);
  },


  renderMenuBar: function() {
    return (<div id="menubar" className="menubar-inverse animate">
      <div className="menubar-scroll-panel">
        <ul id="main-menu" className="gui-controls gui-controls-tree">
          <li>
            <Link to="/">
              <div className="gui-icon"><i className="md md-home" /></div>
              <span className="title">Dashboard</span>
            </Link>
          </li>

          <li>
            <Link to={"/apps/joint/" + this.props.currentAccount.get("id") + "/control_room"}>
              <div className="gui-icon"><i className="mdi mdi-remote" /></div>
              <span className="title">Joint</span>
            </Link>
          </li>

          <li>
            <Link to={"/apps/joint/" + this.props.currentAccount.get("id") + "/client_nodes/index"}>
              <div className="gui-icon"><i className="mdi mdi-remote" /></div>
              <span className="title">Joint</span>
            </Link>
          </li>

          <li>
            <Link to={"/apps/joint/" + this.props.currentAccount.get("id") + "/client_nodes/create"}>
              <div className="gui-icon"><i className="mdi mdi-remote" /></div>
              <span className="title">Joint</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>);
  },


  renderContent: function() {
    return (
      <div id="content">
        {this.props.children}
      </div>
    );
  },


  render: function() {
    return (
      <div>
        <div id="background"/>

        {this.renderHeader()}

        <div id="base">
          {this.renderContent()}
          {this.renderMenuBar()}
        </div>
      </div>
    );
  }
});
