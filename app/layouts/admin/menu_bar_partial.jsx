import React from 'react';
import { Link } from 'react-router';

import AdminHelper from '../../helpers/admin_helper.js';
import RoutingHelper from '../../helpers/routing_helper.js';


export default React.createClass({
  propTypes: {
    currentAccount: React.PropTypes.object.isRequired
  },


  render: function() {
    return (<div id="menubar" className="menubar-inverse animate" onMouseOver={AdminHelper.showMenuBar}>
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
            <Link to={RoutingHelper.apps.joint.devices.index({ userAccountId: this.props.currentAccount.get("id") })}>
              <div className="gui-icon"><i className="mdi mdi-remote" /></div>
              <span className="title">Joint</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>);
  }
});
