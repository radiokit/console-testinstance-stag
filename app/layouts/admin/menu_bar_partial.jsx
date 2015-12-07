import React from 'react';
import Translate from 'react-translate-component';
import { Link } from 'react-router';

import AdminHelper from '../../helpers/admin_helper.js';
import RoutingHelper from '../../helpers/routing_helper.js';


export default React.createClass({
  onMenuRootItemClick: function(e) {
    e.preventDefault();
    this.toggleMenuItemWithSubItems(e.target.closest("li"));
  },


  toggleMenuItemWithSubItems: function(rootMenuNode) {
    var subMenu = rootMenuNode.getElementsByTagName("ul")[0];

    if(subMenu.style.display != "block") {
      subMenu.style.display = "block";
      rootMenuNode.classList.add("expanded");

    } else {
      subMenu.style.display = "none";
      rootMenuNode.classList.remove("expanded");
    }
  },


  onPinToggleOnClick: function(e) {
    e.preventDefault();
    AdminHelper.toggleMenuBarPin();
  },


  onPinToggleOffClick: function(e) {
    e.preventDefault();
    AdminHelper.toggleMenuBarPin();
  },


  // FIXME don't use inline styles for pin
  render: function() {
    return (
      <div id="menubar" className="menubar-inverse animate" onMouseOver={AdminHelper.showMenuBar}>
        <div className="pin-toggle pin-toggle-on">
          <a className="btn btn-icon-toggle" onClick={this.onPinToggleOnClick}>
            <i className="mdi mdi-pin" />
          </a>
        </div>
        <div className="pin-toggle pin-toggle-off">
          <a className="btn btn-icon-toggle" onClick={this.onPinToggleOffClick}>
            <i className="mdi mdi-pin" />
          </a>
        </div>
        <div className="menubar-scroll-panel">
          <ul id="main-menu" className="gui-controls gui-controls-tree">
            {/*<li>
              <Link to={"/apps/joint/control_room"}>
                <div className="gui-icon"><i className="mdi mdi-remote" /></div>
                <Translate component="span" className="title" content="apps.joint.navigation.title"/>
              </Link>
            </li>*/}

            <li className="gui-folder">
              <a onClick={this.onMenuRootItemClick}>
                <div className="gui-icon"><i className="mdi mdi-radio-tower"/></div>
                <Translate content="apps.broadcast.navigation.title" className="title" />
              </a>
              <ul>
                <li>
                  <Link to={RoutingHelper.apps.broadcast.playlist.index(this)}>
                    <Translate content="apps.broadcast.navigation.playlist.title" className="title" />
                  </Link>
                </li>
                <li>
                  <Link to={RoutingHelper.apps.broadcast.live.index(this)}>
                    <Translate content="apps.broadcast.navigation.live.title" className="title" />
                  </Link>
                </li>
                <li>
                  <Link to={RoutingHelper.apps.broadcast.channels.index(this)}>
                    <Translate content="apps.broadcast.navigation.channels.title" className="title" />
                  </Link>
                </li>
              </ul>
            </li>
            <li className="gui-folder">
              <a onClick={this.onMenuRootItemClick}>
                <div className="gui-icon"><i className="mdi mdi-microphone"/></div>
                <Translate content="apps.shows.navigation.title" className="title" />
              </a>
              <ul>
                <li>
                  <Link to={RoutingHelper.apps.shows.files.index(this)}>
                    <Translate content="apps.shows.navigation.files.title" className="title" />
                  </Link>
                </li>
                <li>
                  <Link to={RoutingHelper.apps.shows.schedule.index(this)}>
                    <Translate content="apps.shows.navigation.schedule.title" className="title" />
                  </Link>
                </li>
              </ul>
            </li>
            <li className="gui-folder">
              <a onClick={this.onMenuRootItemClick}>
                <div className="gui-icon"><i className="mdi mdi-guitar"/></div>
                <Translate content="apps.music.navigation.title" className="title" />
              </a>
              <ul>
                <li>
                  <Link to={RoutingHelper.apps.music.files.index(this)}>
                    <Translate content="apps.music.navigation.files.title" className="title" />
                  </Link>
                </li>
                <li>
                  <Link to={RoutingHelper.apps.music.schedule.index(this)}>
                    <Translate content="apps.music.navigation.schedule.title" className="title" />
                  </Link>
                </li>
              </ul>
            </li>
            <li className="gui-folder">
              <a onClick={this.onMenuRootItemClick}>
                <div className="gui-icon"><i className="mdi mdi-server-network"/></div>
                <Translate content="apps.infrastructure.navigation.title" className="title" />
              </a>
              <ul>
                <li>
                  <Link to={RoutingHelper.apps.infrastructure.clientNodes.index(this)}>
                    <Translate content="apps.infrastructure.navigation.client_nodes.title" className="title" />
                  </Link>
                </li>
                <li>
                  <Link to={RoutingHelper.apps.infrastructure.computingNodes.index(this)}>
                    <Translate content="apps.infrastructure.navigation.computing_nodes.title" className="title" />
                  </Link>
                </li>
                <li>
                  <Link to={RoutingHelper.apps.infrastructure.externalInputs.index(this)}>
                    <Translate content="apps.infrastructure.navigation.external_inputs.title" className="title" />
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});
