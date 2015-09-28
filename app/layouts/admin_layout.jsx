import React from 'react';
import Gravatar from 'gravatar-api';
import { Link } from 'react-router';

import '../../vendor/assets/stylesheets/materialadmin/bootstrap.css';
import '../../vendor/assets/stylesheets/materialadmin/materialadmin.css';
import '../../vendor/assets/stylesheets/materialadmin/material-design-iconic-font.css';

export default React.createClass({
  render: function() {
    return (
      <div className="hrader-fixed">
        <div id="background"/>

        <header id="header">
          <div className="headerbar">
            <div className="headerbar-left">
              <ul className="header-nav header-nav-options">
                <li className="header-nav-brand">
                  <div className="brand-holder">
                    <Link to="/">
                      <img src={require('../assets/images/logo-horizontal.svg')} />
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
                    <img src={Gravatar.imageUrl({ email: this.props.currentEditor.get("email"), parameters: { s: "40", d: "mm" }, secure: true })} alt="" />
                    <span className="profile-info">
                      {this.props.currentEditor.get("email")}
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </header>

        <div id="base">
          <div className="offcanvas">

          </div>

          <div id="content">
            {this.props.children}
          </div>


          <div id="menubar" className="menubar-inverse animate">
            <div className="menubar-scroll-panel">
              <ul id="main-menu" className="gui-controls gui-controls-tree">
                <li>
                  <Link to="/">
                    <div className="gui-icon"><i className="md md-home" /></div>
                    <span className="title">Dashboard</span>
                  </Link>
                </li>

                <li>
                  <Link to="/joint">
                    <div className="gui-icon"><i className="mdi mdi-remote" /></div>
                    <span className="title">Joint</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="offcanvas">

          </div>
        </div>
      </div>
    );
  }

});
