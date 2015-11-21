import React from 'react';

import MenuBar from './admin/menu_bar_partial.jsx';
import TopBar from './admin/top_bar_partial.jsx';
import Background from './admin/background_partial.jsx';

import '../assets/stylesheets/layouts/admin_layout.scss';
import '../../vendor/assets/stylesheets/materialadmin/materialadmin.css';
import '../../vendor/assets/stylesheets/materialadmin/material-design-iconic-font.css';

export default React.createClass({
  render: function() {
    return (
      <div>
        <Background />
        <TopBar />

        <div id="base">
          <div id="content">
            {this.props.children}
          </div>
          <MenuBar />
        </div>
      </div>
    );
  }
});
