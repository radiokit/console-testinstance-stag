import React from 'react';
import LoadingLayout from './layouts/loading_layout.jsx';
import AdminLayout from './layouts/admin_layout.jsx';
import Alert from './widgets/admin/alert_widget.jsx';

export default React.createClass({
  getInitialState: function() {
    return {
      loadedEditor:                    false,
      currentEditor:                   null,
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
    loadedEditor:                      React.PropTypes.bool,
    currentEditor:                     React.PropTypes.object,
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
      loadedEditor:                    this.state.loadedEditor,
      currentEditor:                   this.state.currentEditor,
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


  initializeGoogleAnalytics: function(currentEditor) {
    if(typeof(ga) !== "undefined") {
      ga('create', ENV.external.googleAnalyticsID, { 'userId' : "Editor#" + currentEditor.get("id") });
    }
  },


  loadAccounts: function() {
    window.data
      .query("auth", "User.Account")
      .select("id", "name_custom")
      .order("name_custom", "asc")
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


  loadEditor: function() {
    window.data
      .query("auth", "Editor")
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
            loadedEditor: true,
            currentEditor: data.first()
          });
        }
      })
      .fetch();
  },


  componentDidMount: function() {
    this.loadAccounts();
    this.loadEditor();
  },


  render: function() {
    if(this.state.loadingError) {
      return (<Alert type="error" fullscreen={true} infoTextKey="general.errors.communication.general" />);

    } else {
      if(this.state.loadedEditor === false || this.state.loadedAccounts === false || this.state.loadedBroadcastChannels === false) {
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
