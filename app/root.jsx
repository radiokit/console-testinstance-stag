import React from 'react';
import Counterpart from 'counterpart';
import Moment from 'moment';
import Immutable from 'immutable';
import RadioKitAPI from 'radiokit-api';

import LoadingLayout from './layouts/LoadingLayout.jsx';
import LoginLayout from './layouts/LoginLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import Alert from './widgets/admin/alert_widget.jsx';

import '../node_modules/mdi/css/materialdesignicons.css';
import '../node_modules/roboto-fontface/css/roboto-fontface-regular.scss';
import '../node_modules/roboto-fontface/css/roboto-fontface-bold.scss';


export default React.createClass({
  propTypes: {
    children: React.PropTypes.any,
    history: React.PropTypes.object,
    routes: React.PropTypes.arrayOf(React.PropTypes.object),
    params: React.PropTypes.object,
  },

  childContextTypes: {
    data: React.PropTypes.object,
    loadedUser: React.PropTypes.bool,
    currentUser: React.PropTypes.object,
    loadedAccounts: React.PropTypes.bool,
    availableAccounts: React.PropTypes.object,
    currentAccount: React.PropTypes.object,
    loadedBroadcastChannels: React.PropTypes.bool,
    availableBroadcastChannels: React.PropTypes.object,
    currentBroadcastChannel: React.PropTypes.object,
    onCurrentAccountChange: React.PropTypes.func,
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
      availableAccounts: null,
      currentAccount: null,
      loadedBroadcastChannels: false,
      availableBroadcastChannels: null,
      currentBroadcastChannel: null,
      loadingError: false,
      data: null,
    };
  },

  getChildContext() {
    return {
      data: this.state.data,
      loadedUser: this.state.loadedUser,
      currentUser: this.state.currentUser,
      loadedAccounts: this.state.loadedAccounts,
      availableAccounts: this.state.availableAccounts,
      currentAccount: this.state.currentAccount,
      loadedBroadcastChannels: this.state.loadedBroadcastChannels,
      availableBroadcastChannels: this.state.availableBroadcastChannels,
      currentBroadcastChannel: this.state.currentBroadcastChannel,
      onCurrentAccountChange: this.onCurrentAccountChange,
      onCurrentBroadcastChannelChange: this.onCurrentBroadcastChannelChange,
      routes: this.props.routes,
      params: this.props.params,
    };
  },


  onCurrentAccountChange(userAccount) {
    this.setState({
      currentAccount: userAccount,
    });
  },


  onCurrentBroadcastChannelChange(broadcastChannel) {
    this.setState({
      currentAccount: this.state.availableAccounts.find(
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
    const availableAccountsIds = this.state.availableAccounts.map((account) => {
      return account.get('id');
    }).toJS();
    const accountsCondition = ['references', 'din', 'user_account_id']
      .concat(availableAccountsIds)

    this.state.data
      .query('agenda', 'Broadcast.Channel')
      .select('id', 'name', 'references', 'timezone', 'media_routing_group_id')
      .where.apply(this, accountsCondition)
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


  loadAccounts() {
    this.state.data
      .query('jungle', 'Assoc.ClientUserOrganizationAccount')
      .select('organization_account.id', 'organization_account.name')
      .where('client_user_id', 'eq', this.state.currentUser.get('id'))
      .joins('organization_account')
      // .order('organization_account.name', 'asc') // TODO
      .on('error', () => {
        this.setState({
          loadingError: true,
        });
      })
      .on('fetch', (_event, _query, data) => {
        this.setState({
          loadedAccounts: true,
          availableAccounts: data.map((record) => record.get("organization_account")).sortBy((record) => record.get('name')),
        }, () => {
          this.loadBroadcastChannels();
        });
      })
      .fetch();
  },


  getEnv() {
    if (typeof(window.ENV) === 'object') {
      return window.ENV;
    }
    return {
      auth: {
        clientId: '123',
        baseUrl: 'https://auth.radiokitapp-stag.org',
      },
      apps: {
        jungle: { baseUrl: 'https://jungle.radiokitapp-stag.org' },
        medium: { baseUrl: 'https://medium.radiokitapp-stag.org' },
        auth: { baseUrl: 'https://auth.radiokitapp-stag.org' },
        agenda: { baseUrl: 'https://agenda.radiokitapp-stag.org' },
        plumber: { baseUrl: 'https://plumber.radiokitapp-stag.org' },
        vault: { baseUrl: 'https://vault.radiokitapp-stag.org' },
        journal: { baseUrl: 'https://journal.radiokitapp-stag.org' },
        // circumstances: { baseUrl: 'https://circumstances.radiokitapp-stag.org' },
        circumstances: { baseUrl: 'http://localhost:4010' },
      },
      external: {
      },
      verbose: false,
      env: "dev"
    };
  },


  onAuthenticated(session) {
    let env = this.getEnv();
    env['auth'] = { accessToken: session.getAccessToken() };

    const data = new RadioKitAPI.Data.Interface(env);
    window.data = data; // FIXME legacy

    const locale = session.getUser().locale;
    Counterpart.setLocale(locale);
    Moment.locale(locale);

    this.setState({
      data: data,
      currentUser: Immutable.fromJS(session.getUser()),
    }, () => {
      this.loadAccounts();
    });
  },


  render() {
    if (!this.state.currentUser) {
      return <LoginLayout
        onAuthenticated={this.onAuthenticated}
        env={this.getEnv()} />;
    }


    if (
      this.state.loadedAccounts === false ||
      this.state.loadedBroadcastChannels === false
    ) {
      return <LoadingLayout />;
    }

    if (this.state.availableAccounts.size === 0) {
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

    return null;
  },
});
