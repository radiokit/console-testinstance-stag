import React from 'react';
import Counterpart from 'counterpart';
import LoadingLayout from './layouts/loading_layout.jsx';
import AdminLayout from './layouts/admin_layout.jsx';
import Alert from './widgets/admin/alert_widget.jsx';
import Moment from 'moment';

import '../node_modules/mdi/css/materialdesignicons.css';
import '../node_modules/roboto-fontface/css/roboto-fontface-regular.scss';
import '../node_modules/roboto-fontface/css/roboto-fontface-bold.scss';

import ENV from './services/env';
import RadioKit from './services/RadioKit';

export default React.createClass({
  propTypes: {
    children: React.PropTypes.any,
    history: React.PropTypes.object,
    routes: React.PropTypes.object,
    params: React.PropTypes.object,
  },

  childContextTypes: {
    data: React.PropTypes.object,
    loadedUser: React.PropTypes.bool,
    currentUser: React.PropTypes.object,
    loadedAccounts: React.PropTypes.bool,
    availableUserAccounts: React.PropTypes.object,
    currentUserAccount: React.PropTypes.object,
    loadedBroadcastChannels: React.PropTypes.bool,
    availableBroadcastChannels: React.PropTypes.object,
    currentBroadcastChannel: React.PropTypes.object,
    onCurrentUserAccountChange: React.PropTypes.func,
    onCurrentBroadcastChannelChange: React.PropTypes.func,
    routes: React.PropTypes.arrayOf(React.PropTypes.object),
    params: React.PropTypes.object,
  },

  getInitialState() {
    return {
      authenticationState: null,
      loadedUser: false,
      currentUser: null,
      loadedAccounts: false,
      availableUserAccounts: null,
      currentUserAccount: null,
      loadedBroadcastChannels: false,
      availableBroadcastChannels: null,
      currentBroadcastChannel: null,
      loadingError: false,
    };
  },

  getChildContext() {
    return {
      data: RadioKit,
      loadedUser: this.state.loadedUser,
      currentUser: this.state.currentUser,
      loadedAccounts: this.state.loadedAccounts,
      availableUserAccounts: this.state.availableUserAccounts,
      currentUserAccount: this.state.currentUserAccount,
      loadedBroadcastChannels: this.state.loadedBroadcastChannels,
      availableBroadcastChannels: this.state.availableBroadcastChannels,
      currentBroadcastChannel: this.state.currentBroadcastChannel,
      onCurrentUserAccountChange: this.onCurrentUserAccountChange,
      onCurrentBroadcastChannelChange: this.onCurrentBroadcastChannelChange,
      routes: this.props.routes,
      params: this.props.params,
    };
  },

  componentDidMount() {
    RadioKit.on('auth::success', (_eventName, redirect) => {
      this.setState({ authenticationState: 'success' }, () => {
        this.props.history.replaceState(null, redirect);
      });
    });

    RadioKit.on('auth::failure', () => {
      this.setState({ authenticationState: 'failure' });
    });

    // TODO bind to error events globally

    RadioKit.signIn();
  },

  componentWillUpdate(nextProps, nextState) {
    const { authenticationState } = this.state;
    const nextAuthenticationState = nextState.authenticationState;
    if (authenticationState !== 'success' && nextAuthenticationState === 'success') {
      this.loadUser();
    }
  },

  onCurrentUserAccountChange(userAccount) {
    this.setState({
      currentUserAccount: userAccount,
    });
  },

  onCurrentBroadcastChannelChange(broadcastChannel) {
    this.setState({
      currentUserAccount: this.state.availableUserAccounts.find(
        userAccount =>
        userAccount.get('id') === broadcastChannel.getIn(['references', 'user_account_id'])
      ),
      currentBroadcastChannel: broadcastChannel,
    });
  },

  initializeGoogleAnalytics(currentUser) {
    if (window.ga && ENV.external.googleAnalyticsID) {
      const currentUserEmail = currentUser.get('email');

      // Exclude our own traffic
      // See https://developers.google.com/analytics/devguides/collection/analyticsjs/user-opt-out#opt-out_of_tracking_for_your_site
      if (currentUserEmail.indexOf('@radiokit.org') !== -1 ||
         currentUserEmail.indexOf('@xcomp.pl') !== -1 ||
         currentUserEmail.indexOf('@swmansion.com') !== -1) {
        window[`ga-disable-${ENV.external.googleAnalyticsID}`] = true;
      }

      /* global ga */
      ga('create', ENV.external.googleAnalyticsID, { userId: `User#${currentUser.get('id')}` });
    }
  },

  loadBroadcastChannels() {
    RadioKit
      .query('agenda', 'Broadcast.Channel')
      .select('id', 'name', 'references')
      .order('name', 'asc')
      .on('error', () => {
        this.setState({
          loadingError: true,
        });
      })
      .on('fetch', (_event, _query, data) => {
        this.setState({
          loadedBroadcastChannels: true,
          availableBroadcastChannels: data,
        });
      })
      .fetch();
  },

  loadUser() {
    RadioKit
      .query('auth', 'User')
      .joins('accounts')
      .method('me') // FIXME methods should be deprecated in favour of tokens
      .on('error', () => {
        this.setState({
          loadingError: true,
        });
      })
      .on('fetch', (_event, _query, data) => {
        this.initializeGoogleAnalytics(data.first());
        this.setState({
          loadedUser: true,
          currentUser: data.first(),
          loadedAccounts: true,
          availableUserAccounts: data.first().get('accounts'),
        }, () => {
          Counterpart.setLocale(this.state.currentUser.get('locale'));
          Moment.locale(this.state.currentUser.get('locale'));
          this.loadBroadcastChannels();
        });
      })
      .fetch();
  },

  render() {
    const loading = (
      <LoadingLayout />
    );
    
    if (!this.state.authenticationState) {
      return loading;
    }

    if (this.state.authenticationState === 'failure') {
      return (
        <Alert type="error" fullscreen infoTextKey="general.errors.authentication.general" />
      );
    }

    if (this.state.authenticationState === 'success') {
      if (this.state.loadingError) {
        return (
          <Alert type="error" fullscreen infoTextKey="general.errors.communication.general" />
        );
      }

      if (
        this.state.loadedUser === false ||
        this.state.loadedAccounts === false ||
        this.state.loadedBroadcastChannels === false
      ) {
        return loading;
      }

      if (this.state.availableUserAccounts.size === 0) {
        return (
          <Alert
            type="error"
            fullscreen
            infoTextKey="general.errors.authentication.no_accounts"
          />
        );
      }

      return (
        <AdminLayout>
          {this.props.children}
        </AdminLayout>
      );
    }
    return null;
  },
});
