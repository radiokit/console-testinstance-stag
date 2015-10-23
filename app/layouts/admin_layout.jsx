import React from 'react';

import MenuBar from './admin/menu_bar_partial.jsx';
import TopBar from './admin/top_bar_partial.jsx';
import Background from './admin/background_partial.jsx';

import '../assets/stylesheets/layouts/admin_layout.scss';
import '../../vendor/assets/stylesheets/materialadmin/materialadmin.css';
import '../../vendor/assets/stylesheets/materialadmin/material-design-iconic-font.css';

export default React.createClass({
  propTypes: {
    currentAccount: React.PropTypes.object.isRequired,
    availableAccounts: React.PropTypes.object.isRequired,
    currentEditor: React.PropTypes.object.isRequired,
    currentChannel: React.PropTypes.object.isRequired,
    availableChannels: React.PropTypes.object.isRequired,
  },


  render: function() {
    return (
      <div>
        <Background />
        <TopBar availableAccounts={this.props.availableAccounts} currentAccount={this.props.currentAccount} availableChannels={this.props.availableChannels} currentChannel={this.props.currentChannel} currentEditor={this.props.currentEditor} />

        <div id="base">
          <div id="content">
            {this.props.children}
          </div>
          <MenuBar currentAccount={this.props.currentAccount} />
        </div>
      </div>
    );
  }
});
