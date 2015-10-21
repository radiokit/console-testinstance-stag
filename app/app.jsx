import React from 'react';
import { Router, Link } from 'react-router';
import Gravatar from 'gravatar-api';

import LoadingLayout from './layouts/loading_layout.jsx';
import Alert from './widgets/admin/alert_widget.jsx';

import './assets/stylesheets/general.scss';
import '../vendor/assets/stylesheets/materialadmin/materialadmin.css';
import '../vendor/assets/stylesheets/materialadmin/material-design-iconic-font.css';


export default React.createClass({
  getInitialState: function() {
    return { 
      currentEditor:     null,
      availableAccounts: null,
      currentAccount:    null,
      availableChannels: null,
      currentChannel:    null,
    };
  },


  initializeGoogleAnalytics: function(currentEditor) {
    if(typeof(ga) !== "undefined") {
      ga('create', ENV.external.googleAnalyticsID, { 'userId' : "Editor#" + currentEditor.get("id") });
    }
  },


  componentDidMount: function() {
    window.data
      .query("auth", "User.Account")
      .select("name_custom")
      .on("update", (_, query) => {
        if(this.isMounted()) { 
          this.setState({ 
            availableAccounts: query.getData(),
            currentAccount: query.getData().first()
          });

          if(query.getData().size != 0) {
            window.data
              .query("auth", "Broadcast.Channel")
              .select("name")
              .where("user_account_id", "eq", query.getData().first().get("id"))
              .on("update", (_, query) => {
                if(this.isMounted()) { 
                  this.setState({ 
                    availableChannels: query.getData(),
                    currentChannel: query.getData().first()
                  });
                }
              })
              .fetch();
          }
        }
      })
      .fetch();

    window.data
      .query("auth", "Editor")
      .method("me") // FIXME methods should be deprecated in favour of tokens
      .on("update", (_, query) => {
        if(this.isMounted()) { 
          this.initializeGoogleAnalytics(query.getData().first());
          this.setState({ currentEditor: query.getData().first() });
        }
      })
      .fetch();
  },


  renderLogo: function() {
    return (
      <li className="header-nav-brand">
        <div className="brand-holder">
          <Link to="/">
            <img src={require('./assets/images/logo-horizontal.svg')} />
          </Link>
        </div>
      </li>
    );
  },


  renderAccountDropdown: function() {
    if(this.state.availableAccounts.size > 1) {
      return (
        <li className="header-nav-brand">
          <div className="brand-holder">
            <span className="header-nav-breadcrumb-separator mdi mdi-chevron-right"/>
            <span className="header-nav-breadcrumb-label">{this.state.currentAccount.get("name_custom")}</span>
          </div>
        </li>);
    }
  },


  renderChannelDropdown: function() {
    return (
      <li className="header-nav-brand">
        <div className="brand-holder">
          <span className="header-nav-breadcrumb-separator mdi mdi-chevron-right"/>
          <span className="header-nav-breadcrumb-label">{this.state.currentChannel.get("name")}</span>
        </div>
      </li>);
  },


  renderEditorDropdown: function() {
    return (
      <ul className="header-nav header-nav-profile">
        <li className="dropdown">
          <a aria-expanded="false" className="dropdown-toggle ink-reaction" data-toggle="dropdown">
            <img src={Gravatar.imageUrl({ email: this.state.currentEditor.get("email"), parameters: { s: "40", d: "mm" }, secure: true })} alt="" />
            <span className="profile-info">
              {this.state.currentEditor.get("email")}
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
            <Link to="/app/joint/control_room">
              <div className="gui-icon"><i className="mdi mdi-remote" /></div>
              <span className="title">Joint</span>
            </Link>
          </li>

          <li>
            <Link to="/app/joint/client_nodes/index">
              <div className="gui-icon"><i className="mdi mdi-remote" /></div>
              <span className="title">Joint</span>
            </Link>
          </li>

          <li>
            <Link to="/app/joint/client_nodes/create">
              <div className="gui-icon"><i className="mdi mdi-remote" /></div>
              <span className="title">Joint</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>);
  },


  renderContent: function() {
    <div id="content">
      {this.props.children && React.cloneElement(this.props.children, {currentAccount: this.state.currentAccount, currentEditor: this.state.currentEditor})}
    </div>
  },


  renderAdmin: function() {
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
  },


  render: function() {
   if(this.state.currentEditor == null || this.state.availableAccounts == null || this.state.availableChannels == null) {
     return (<LoadingLayout />);
  
    } else {
      if(this.state.currentAccount == null) {
        return (<Alert type="error" fullscreen={true} infoTextKey="general.no_accounts"/>);

      } else if(this.state.currentChannel == null) {
        return (<Alert type="error" fullscreen={true} infoTextKey="general.no_channels"/>);

      } else {
        return this.renderAdmin();
      }
    }
  }
});