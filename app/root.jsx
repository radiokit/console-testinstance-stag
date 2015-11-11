import React from 'react';
import LoadingLayout from './layouts/loading_layout.jsx';
import AdminLayout from './layouts/admin_layout.jsx';
import Alert from './widgets/admin/alert_widget.jsx';

export default React.createClass({
  getInitialState: function() {
    return {
      loadedEditor:      false,
      currentEditor:     null,
      loadedAccounts:    false,
      availableAccounts: null,
      currentAccount:    null,
      loadedChannels:    false,
      availableChannels: null,
      currentChannel:    null,
      loadingError:      false
    };
  },


  initializeGoogleAnalytics: function(currentEditor) {
    if(typeof(ga) !== "undefined") {
      ga('create', ENV.external.googleAnalyticsID, { 'userId' : "Editor#" + currentEditor.get("id") });
    }
  },


  loadAccounts: function() {
    window.data
      .query("auth", "User.Account")
      .select("name_custom")
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({
            loadingError: true
          });
        }
      })
      .on("update", (_, query) => {
        if(this.isMounted()) {
          this.setState({
            loadedAccounts: true,
            availableAccounts: query.getData(),
            currentAccount: query.getData().first()
          });


          if(query.getData().size != 0) {
            this.loadChannels(query.getData().first().get("id"))

          } else {
            this.setState({
              loadedChannels: true,
              availableChannels: null,
              currentChannel: null
            });
          }
        }
      })
      .fetch();
  },


  loadChannels: function(userAccountId) {
    window.data
      .query("auth", "Broadcast.Channel")
      .select("name")
      .where("user_account_id", "eq", userAccountId)
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({
            loadingError: true
          });
        }
      })
      .on("update", (_, query) => {
        if(this.isMounted()) {
          this.setState({
            loadedChannels: true,
            availableChannels: query.getData(),
            currentChannel: query.getData().first()
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
      .on("update", (_, query) => {
        if(this.isMounted()) {
          this.initializeGoogleAnalytics(query.getData().first());
          this.setState({
            loadedEditor: true,
            currentEditor: query.getData().first()
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
      if(this.state.loadedEditor === false || this.state.loadedAccounts === false || this.state.loadedChannels === false) {
        return (<LoadingLayout />);

      } else {
        if(this.state.availableAccounts.size === 0) {
          return (<Alert type="error" fullscreen={true} infoTextKey="general.errors.authentication.no_accounts"/>);

        } else if(this.state.availableChannels.size === 0) {
          return (<Alert type="error" fullscreen={true} infoTextKey="general.errors.authentication.no_channels"/>);

        } else {
          return (
            <AdminLayout availableAccounts={this.state.availableAccounts}
                         availableChannels={this.state.availableChannels}
                         currentAccount={this.state.currentAccount}
                         currentChannel={this.state.currentChannel}
                         currentEditor={this.state.currentEditor}>
              {this.props.children}
            </AdminLayout>
          );
        }
      }
    }
  }
});