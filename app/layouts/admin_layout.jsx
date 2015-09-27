import React from 'react';

import '../../vendor/assets/stylesheets/materialadmin/bootstrap.css';
import '../../vendor/assets/stylesheets/materialadmin/materialadmin.css';

export default React.createClass({
  render: function() {
    return (
      <div>
        <div id="background"/>

        <header id="header">
          <div className="headerbar">
            <div className="headerbar-left">
              <ul className="header-nav header-nav-options hidden-sm hidden-md hidden-lg">
                <li>
                  <a className="btn btn-icon-toggle menubar-toggle" data-toggle="menubar">
                    <i className="md md-menu" />
                  </a>
                </li>
              </ul>

              <ul className="header-nav header-nav-menu header-nav-no-margin">
                <li className="dropdown">
                  <a aria-expanded="false" className="dropdown-toggle ink-reaction" data-toggle="dropdown">
                    <span className="text-lg text-bold text-primary text-uppercase">
                    </span>
                  </a>
                  <ul className="dropdown-menu animation-dock">
                    <li>
                      CHANNEL
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="headerbar-right">
              <ul className="header-nav header-nav-options">
                <li>
                  <a className="btn btn-icon-toggle btn-default">
                    <i className="md md-play-circle-fill"/>
                  </a>
                </li>
              </ul>

              <ul className="header-nav header-nav-profile">
                <li className="dropdown">
                  <a aria-expanded="false" className="dropdown-toggle ink-reaction" data-toggle="dropdown">
                    <img src="" alt="" />
                    <span className="profile-info">
                      <small>X</small>
                    </span>
                  </a>
                  <ul className="dropdown-menu animation-dock">
                    <li>
                      Header
                    </li>
                    <li>
                    </li>
                    <li><a href=""><i className="fa fa-fw fa-power-off text-danger"></i> Logout</a></li>
                  </ul>
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
