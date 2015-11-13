import React from 'react';
import Translate from 'react-translate-component';
import { Link } from 'react-router';

import AdminHelper from '../../helpers/admin_helper.js';
import RoutingHelper from '../../helpers/routing_helper.js';


export default React.createClass({
  propTypes: {
    currentUserAccount: React.PropTypes.object.isRequired
  },

  render: function() {
    return (<div id="menubar" className="menubar-inverse animate" onMouseOver={AdminHelper.showMenuBar}>
      <div className="menubar-scroll-panel">
        <ul id="main-menu" className="gui-controls gui-controls-tree">
          <li>
            <Link to={"/apps/joint/" + this.props.currentUserAccount.get("id") + "/control_room"}>
              <div className="gui-icon"><i className="mdi mdi-remote" /></div>
              <Translate component="span" className="title" content="apps.joint.navigation.title"/>
            </Link>
          </li>
          <li>
            <Link to={RoutingHelper.apps.shows.files.index(this)}>
              <div className="gui-icon"><i className="mdi mdi-microphone" /></div>
              <Translate component="span" className="title" content="apps.shows.navigation.title"/>
            </Link>
          </li>
          <li>
            <Link to={"/apps/music_scheduler/" + this.props.currentUserAccount.get("id") + "/automation"}>
              <div className="gui-icon"><i className="mdi mdi-calendar" /></div>
              <Translate component="span" className="title" content="apps.music_scheduler.navigation.title"/>
            </Link>
          </li>
        </ul>
      </div>
    </div>);
  }
});