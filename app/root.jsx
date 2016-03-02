import React from 'react';
import LoadingLayout from './layouts/loading_layout.jsx';
import AdminLayout from './layouts/admin_layout.jsx';
import Alert from './widgets/admin/alert_widget.jsx';

export default React.createClass({
  getInitialState: function() {
    return {
      loadedUser:                    false,
      currentUser:                   null,
      loadedAccounts:                  false,
      availableUserAccounts:           null,
      currentUserAccount:              null,
      loadedBroadcastChannels:         false,
      availableBroadcastChannels:      null,
      currentBroadcastChannel:         null,
      loadingError:                    false,
    };
  },


  childContextTypes: {
    data:                              React.PropTypes.object,
    loadedUser:                      React.PropTypes.bool,
    currentUser:                     React.PropTypes.object,
    loadedAccounts:                    React.PropTypes.bool,
    availableUserAccounts:             React.PropTypes.object,
    currentUserAccount:                React.PropTypes.object,
    loadedBroadcastChannels:           React.PropTypes.bool,
    availableBroadcastChannels:        React.PropTypes.object,
    currentBroadcastChannel:           React.PropTypes.object,
    onCurrentUserAccountChange:        React.PropTypes.func,
    onCurrentBroadcastChannelChange:   React.PropTypes.func,
    routes:                            React.PropTypes.arrayOf(React.PropTypes.object),
    params:                            React.PropTypes.object,
  },


  getChildContext: function() {
    return {
      data:                            window.data,
      loadedUser:                    this.state.loadedUser,
      currentUser:                   this.state.currentUser,
      loadedAccounts:                  this.state.loadedAccounts,
      availableUserAccounts:           this.state.availableUserAccounts,
      currentUserAccount:              this.state.currentUserAccount,
      loadedBroadcastChannels:         this.state.loadedBroadcastChannels,
      availableBroadcastChannels:      this.state.availableBroadcastChannels,
      currentBroadcastChannel:         this.state.currentBroadcastChannel,
      onCurrentUserAccountChange:      this.onCurrentUserAccountChange,
      onCurrentBroadcastChannelChange: this.onCurrentBroadcastChannelChange,
      routes: this.props.routes,
      params: this.props.params,
    }
  },


  onCurrentUserAccountChange: function(userAccount) {
    this.setState({
      currentUserAccount: userAccount
    });
  },


  onCurrentBroadcastChannelChange: function(broadcastChannel) {
    this.setState({
      currentUserAccount: this.state.availableUserAccounts.find((userAccount) => { return userAccount.get("id") === broadcastChannel.get("references").get("user_account_id") }),
      currentBroadcastChannel: broadcastChannel,
    });
  },


  initializeGoogleAnalytics: function(currentUser) {
    if(typeof(ga) !== "undefined") {
      ga('create', ENV.external.googleAnalyticsID, { 'userId' : "User#" + currentUser.get("id") });
    }
  },


  loadAccounts: function() {
    window.data
      .query("auth", "Account")
      .select("id", "name")
      .order("name", "asc")
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({
            loadingError: true
          });
        }
      })
      .on("fetch", (_event, _query, data) => {
        if(this.isMounted()) {
          this.setState({
            loadedAccounts: true,
            availableUserAccounts: data
          });

          this.loadBroadcastChannels();
        }
      })
      .fetch();
  },


  loadBroadcastChannels: function() {
    window.data
      .query("agenda", "Broadcast.Channel")
      .select("id", "name", "references")
      .order("name", "asc")
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({
            loadingError: true
          });
        }
      })
      .on("fetch", (_event, _query, data) => {
        if(this.isMounted()) {
          this.setState({
            loadedBroadcastChannels: true,
            availableBroadcastChannels: data
          });
        }
      })
      .fetch();
  },


  loadUser: function() {
    window.data
      .query("auth", "User")
      .method("me") // FIXME methods should be deprecated in favour of tokens
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({
            loadingError: true
          });
        }
      })
      .on("fetch", (_event, _query, data) => {
        if(this.isMounted()) {
          this.initializeGoogleAnalytics(data.first());
          this.setState({
            loadedUser: true,
            currentUser: data.first()
          });
        }
      })
      .fetch();
  },


  componentDidMount: function() {
    this.loadAccounts();
    this.loadUser();
  },


  render: function() {
    if(this.state.loadingError) {
      return (<Alert type="error" fullscreen={true} infoTextKey="general.errors.communication.general" />);

    } else {
      if(this.state.loadedUser === false || this.state.loadedAccounts === false || this.state.loadedBroadcastChannels === false) {
        return (<LoadingLayout />);

      } else {
        if(this.state.availableUserAccounts.size === 0) {
          return (<Alert type="error" fullscreen={true} infoTextKey="general.errors.authentication.no_accounts"/>);

        } else if(this.state.availableBroadcastChannels.size === 0) {
          return (<Alert type="error" fullscreen={true} infoTextKey="general.errors.authentication.no_channels"/>);

        } else {
          return (
            <AdminLayout>
              {this.props.children}
            </AdminLayout>
          );
        }
      }
    }
  }
});
