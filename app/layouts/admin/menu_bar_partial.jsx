import React from 'react';
import Translate from 'react-translate-component';
import { Link } from 'react-router';

import AdminHelper from '../../helpers/admin_helper.js';
import RoutingHelper from '../../helpers/routing_helper.js';


export default React.createClass({
  propTypes: {
    currentUserAccount: React.PropTypes.object.isRequired
  },

  onMenuRootItemClick: function(event) {
    this.toggleMenuItemWithSubItems(event.target.closest("li"));
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

  render: function() {
    return (<div id="menubar" className="menubar-inverse animate" onMouseOver={AdminHelper.showMenuBar}>
      <div className="menubar-scroll-panel">
        <ul id="main-menu" className="gui-controls gui-controls-tree">
          {/*<li>
            <Link to={"/apps/joint/" + this.props.currentUserAccount.get("id") + "/control_room"}>
              <div className="gui-icon"><i className="mdi mdi-remote" /></div>
              <Translate component="span" className="title" content="apps.joint.navigation.title"/>
            </Link>
          </li>*/}

          <li className="gui-folder">
            <a onClick={this.onMenuRootItemClick}>
              <div className="gui-icon"><i className="mdi mdi-microphone"/></div>
              <Translate content="apps.shows.navigation.title" className="title" />
            </a>
            <ul>
              <li>
                <Link to={RoutingHelper.apps.shows.files.index(this)}>
                  <Translate content="apps.shows.navigation.subheader1" className="title" />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <Translate content="apps.shows.navigation.subheader2" className="title" />
                </Link>
              </li>
            </ul>
          </li>
          <li className="gui-folder">
            <a onClick={this.onMenuRootItemClick}>
              <div className="gui-icon"><i className="mdi mdi-guitar"/></div>
              <Translate content="apps.music_scheduler.navigation.title" className="title" />
            </a>
            <ul>
              <li>
                <Link to="/">
                  <Translate content="apps.music_scheduler.navigation.subheader1" className="title" />
                </Link>
              </li>
              <li>
                <Link to={"/apps/music_scheduler/" + this.props.currentUserAccount.get("id") + "/automation"}>
                  <Translate content="apps.music_scheduler.navigation.subheader2" className="title" />
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>);
  }
});