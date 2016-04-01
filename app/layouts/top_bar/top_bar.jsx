import React from 'react';
import {Link} from 'react-router';
import Gravatar from 'gravatar-api';

import AdminHelper from '../../helpers/admin_helper.js';
import UploadIndicatorWidget from '../../widgets/admin/upload_indicator/upload_indicator_widget.jsx';

//lang
import Translate from 'react-translate-component';
import Counterpart from 'counterpart';
import localePL from './top_bar_pl';
import localeEN from './top_bar_en';

Counterpart.registerTranslations("en", {topBarPartial: localeEN});
Counterpart.registerTranslations("pl", {topBarPartial: localePL});

export default React.createClass({
  contextTypes: {
    currentUserAccount: React.PropTypes.object,
    currentBroadcastChannel: React.PropTypes.object,
    routes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    currentUser: React.PropTypes.object.isRequired,
  },

  renderLogo() {
    return (
      <li className="header-nav-brand">
        <div className="brand-holder">
          <Link to="/">
            <img src={require('../../assets/images/logo-horizontal.svg')}/>
          </Link>
        </div>
      </li>
    );
  },

  onToggleVisibilityClick: function (e) {
    e.preventDefault();
    AdminHelper.toggleMenuBarVisibility();
  },

  renderToggle() {
    return (
      <li className="hidden-md hidden-lg visibility-toggle">
        <a className="btn btn-icon-toggle" onClick={this.onToggleVisibilityClick}>
          <i className="mdi mdi-menu"/>
        </a>
      </li>
    );
  },

  isScopePresentInCurrentRoute: function (scope) {
    for (let i = 0; i < this.context.routes.length; i++) {
      if (this.context.routes[i].hasOwnProperty("scope") && this.context.routes[i].scope === scope) {
        return true;
      }
    }

    return false;
  },

  renderUserAccountDropdown() {
    if ((this.isScopePresentInCurrentRoute("userAccount") || this.isScopePresentInCurrentRoute("broadcastChannel")) && this.context.currentUserAccount) {
      return (
        <li className="header-nav-brand">
          <div className="brand-holder">
            <span className="header-nav-breadcrumb-separator mdi mdi-chevron-right"/>
            <span className="header-nav-breadcrumb-label">{this.context.currentUserAccount.get("name")}</span>
          </div>
        </li>);
    }
  },

  renderBroadcastChannelDropdown() {
    if (this.isScopePresentInCurrentRoute("broadcastChannel") && this.context.currentBroadcastChannel) {
      return (
        <li className="header-nav-brand">
          <div className="brand-holder">
            <span className="header-nav-breadcrumb-separator mdi mdi-chevron-right"/>
            <span className="header-nav-breadcrumb-label">{this.context.currentBroadcastChannel.get("name")}</span>
          </div>
        </li>);
    }
  },

  renderUserDropdown() {
    return (
      <ul className="header-nav header-nav-profile">
        <li className="dropdown">
          <a aria-expanded="false" className="dropdown-toggle ink-reaction" data-toggle="dropdown">
            <img
              src={Gravatar.imageUrl({ email: this.context.currentUser.get("email"), parameters: { s: "40", d: "mm" }, secure: true })}
              alt=""/>
            <span className="profile-info">
              {this.context.currentUser.get("email")}
            </span>
          </a>
        </li>
      </ul>
    );
  },

  renderUploadDropdown() {
    return (
      <ul className="header-nav header-nav-options">
        <li className="dropdown">
          <a className="btn btn-icon-toggle btn-default" data-toggle="dropdown" aria-expanded="false">
            <span className="md mdi mdi-upload"></span>
          </a>
          <ul className="dropdown-menu animation-expand">
            <li className="dropdown-header">
              <Translate content="topBarPartial.uploadWidgetHeader"/>
            </li>
            <UploadIndicatorWidget />
          </ul>
        </li>
      </ul>
    )
  },

  render() {
    return (
      <header id="header">
        <div className="headerbar">
          <div className="headerbar-left">
            <ul className="header-nav header-nav-options">
              {this.renderToggle()}
              {this.renderLogo()}
              {this.renderUserAccountDropdown()}
              {this.renderBroadcastChannelDropdown()}
            </ul>
          </div>

          <div className="headerbar-right">
            {this.renderUploadDropdown()}
            {this.renderUserDropdown()}
          </div>
        </div>
      </header>
    );
  }
});
