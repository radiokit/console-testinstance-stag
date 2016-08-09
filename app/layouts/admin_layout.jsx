import React from 'react';

import '../assets/stylesheets/layouts/admin_layout.scss';
import '../../vendor/assets/stylesheets/materialadmin/materialadmin.css';
import '../../vendor/assets/stylesheets/materialadmin/material-design-iconic-font.css';
import MenuBar from './menu_bar/menu_bar_partial.jsx';
import TopBar from './top_bar/top_bar.jsx';
import FilePlayer from '../widgets/admin/file_player/file_player.jsx';
import Background from './background/background_partial.jsx';

const AdminLayout = props => (
  <div>
    <Background />
    <TopBar />
    <FilePlayer />

    <div id="base">
      <div id="content">
        {props.children}
      </div>
      <MenuBar />
    </div>
  </div>
);

AdminLayout.propTypes = {
  children: React.PropTypes.any,
};

export default AdminLayout;
