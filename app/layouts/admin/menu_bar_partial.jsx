import React from 'react';
import Immutable from 'immutable';
import Translate from 'react-translate-component';
import { Link } from 'react-router';

import AdminHelper from '../../helpers/admin_helper.js';
import RoutingHelper from '../../helpers/routing_helper.js';


export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object.isRequired,
  },


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
            {() => {
              return this.context.currentUser.get("apps_available").map((appName) => {
                return (

                  <li className="gui-folder">
                    <a onClick={this.onMenuRootItemClick}>
                      <div className="gui-icon"><i className={`mdi mdi-${RoutingHelper.apps[appName].icon}`} /></div>
                      <Translate content={`apps.${appName}.navigation.title`} className="title" />
                    </a>
                    <ul>
                      {() => {
                        return Immutable.fromJS(Object.keys(RoutingHelper.apps[appName]))
                          .filterNot((subAppName) => { return subAppName === "icon"; })
                          .map((subAppName) => {
                            return (
                              <li>
                                <Link to={RoutingHelper.apps[appName][subAppName].index(this)}>
                                  <Translate content={`apps.${appName}.navigation.${subAppName}.title`} className="title" />
                                </Link>
                              </li>
                            );
                        });

                      }()}
                    </ul>
                  </li>
                );
              });
            }()}
          </ul>
        </div>
      </div>
    );
  }
});
