import React from 'react';

import '../assets/stylesheets/layouts/admin_layout.scss';
import '../../vendor/assets/stylesheets/materialadmin/materialadmin.css';
import '../../vendor/assets/stylesheets/materialadmin/material-design-iconic-font.css';
import MenuBar from './menu_bar/menu_bar_partial.jsx';
import TopBar from './top_bar/top_bar.jsx';
import Background from './background/background_partial.jsx';


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
