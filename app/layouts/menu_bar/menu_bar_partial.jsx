import React from 'react';
import Translate from 'react-translate-component';
import { Link } from 'react-router';

import AdminHelper from '../../helpers/admin_helper.js';
import RoutingHelper from '../../helpers/routing_helper.js';

import './menu_bar_partial.scss';
export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object.isRequired,
  },

  onMenuRootItemClick(e) {
    e.preventDefault();
    this.toggleMenuItemWithSubItems(e.target.closest('li'));
  },

  onPinToggleOnClick(e) {
    e.preventDefault();
    AdminHelper.toggleMenuBarPin();
  },

  onPinToggleOffClick(e) {
    e.preventDefault();
    AdminHelper.toggleMenuBarPin();
  },

  toggleMenuItemWithSubItems(rootMenuNode) {
    const subMenu = rootMenuNode.getElementsByTagName('ul')[0];

    if (subMenu.style.display !== 'block') {
      subMenu.style.display = 'block';
      rootMenuNode.classList.add('expanded');
    } else {
      subMenu.style.display = 'none';
      rootMenuNode.classList.remove('expanded');
    }
  },

  // FIXME don't use inline styles for pin
  render() {
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
            { this.context.currentUser.get('apps_available').map((appName) => (
              RoutingHelper.apps[appName] &&
              (
                <li key={appName} className="gui-folder">
                  <a onClick={this.onMenuRootItemClick}>
                    <div className="gui-icon">
                      <i className={`mdi mdi-${RoutingHelper.apps[appName].icon}`} />
                    </div>
                    <Translate content={`apps.${appName}.navigation.title`} className="title" />
                  </a>
                  <ul>
                    {
                      (Object.keys(RoutingHelper.apps[appName]))
                        .filter((subAppName) => subAppName !== 'icon')
                        .map((subAppName) => (
                          <li key={subAppName}>
                            <Link to={RoutingHelper.apps[appName][subAppName].index(this)}>
                              <Translate
                                content={`apps.${appName}.navigation.${subAppName}.title`}
                                className="title"
                              />
                            </Link>
                          </li>
                        ))
                    }
                  </ul>
                </li>
              )
            )) }
          </ul>
        </div>
      </div>
    );
  },
});
