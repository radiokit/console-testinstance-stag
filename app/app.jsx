import React from 'react';
import { Router, Link } from 'react-router';
import Gravatar from 'gravatar-api';

import LoadingLayout from './layouts/loading_layout.jsx';

import '../vendor/assets/stylesheets/materialadmin/materialadmin.css';
import '../vendor/assets/stylesheets/materialadmin/material-design-iconic-font.css';


export default React.createClass({
  getInitialState: function() {
    return { currentEditor: null };
  },


  initializeGoogleAnalytics: function(currentEditor) {
    if(typeof(ga) !== "undefined") {
      ga('create', ENV.external.googleAnalyticsID, { 'userId' : "Editor#" + currentEditor.get("id") });
    }
  },


  componentDidMount: function() {
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


  renderHeader: function() {
    return (<header id="header">
      <div className="headerbar">
        <div className="headerbar-left">
          <ul className="header-nav header-nav-options">
            <li className="header-nav-brand">
              <div className="brand-holder">
                <Link to="/">
                  <img src={require('./assets/images/logo-horizontal.svg')} />
                </Link>
              </div>
            </li>
          </ul>
        </div>


        <div className="headerbar-right">
          <ul className="header-nav header-nav-options">
          </ul>

          <ul className="header-nav header-nav-profile">
            <li className="dropdown">
              <a aria-expanded="false" className="dropdown-toggle ink-reaction" data-toggle="dropdown">
                <img src={Gravatar.imageUrl({ email: this.state.currentEditor.get("email"), parameters: { s: "40", d: "mm" }, secure: true })} alt="" />
                <span className="profile-info">
                  {this.state.currentEditor.get("email")}
                </span>
              </a>
            </li>
          </ul>
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
            <Link to="/app/joint">
              <div className="gui-icon"><i className="mdi mdi-remote" /></div>
              <span className="title">Joint</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>);
  },


  renderAdmin: function() {
    return (
      <div>
        <div id="background"/>

        {this.renderHeader()}

        <div id="base">
          <div className="offcanvas"/>

          <div id="content">
            {this.props.children && React.cloneElement(this.props.children, {data: window.data})}
          </div>

          {this.renderMenuBar()}

          <div className="offcanvas"/>
        </div>
      </div>
    );
  },


  render: function() {
   if(this.state.currentEditor == null) {
     return (<LoadingLayout />);
  
    } else {
      return this.renderAdmin();
    }
  }
});