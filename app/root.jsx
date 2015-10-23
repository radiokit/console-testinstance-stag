import React from 'react';

import LoadingLayout from './layouts/loading_layout.jsx';
import AdminLayout from './layouts/admin_layout.jsx';
import Alert from './widgets/admin/alert_widget.jsx';

export default React.createClass({
  getInitialState: function() {
    return { 
      currentEditor:     undefined,
      availableAccounts: undefined,
      currentAccount:    undefined,
      availableChannels: undefined,
      currentChannel:    undefined,
    };
  },


  initializeGoogleAnalytics: function(currentEditor) {
    if(typeof(ga) !== "undefined") {
      ga('create', ENV.external.googleAnalyticsID, { 'userId' : "Editor#" + currentEditor.get("id") });
    }
  },


  componentDidMount: function() {
    window.data
      .query("auth", "User.Account")
      .select("name_custom")
      .on("update", (_, query) => {
        if(this.isMounted()) { 
          this.setState({ 
            availableAccounts: query.getData(),
            currentAccount: query.getData().first()
          });

          if(query.getData().size != 0) {
            window.data
              .query("auth", "Broadcast.Channel")
              .select("name")
              .where("user_account_id", "eq", query.getData().first().get("id"))
              .on("update", (_, query) => {
                if(this.isMounted()) { 
                  this.setState({ 
                    availableChannels: query.getData(),
                    currentChannel: query.getData().first()
                  });
                }
              })
              .fetch();
          }
        }
      })
      .fetch();

    window.data
      .query("auth", "Editor")
      .method("me") // FIXME methods should be deprecated in favour of tokens
      .on("update", (_, query) => {
        if(this.isMounted()) { 
          this.initializeGoogleAnalytics(query.getData().first());
          this.setState({ currentEditor: query.getData().first() });
        }
      })
      .fetch();
  },


  render: function() {
   if(this.state.currentEditor === undefined || this.state.availableAccounts === undefined || this.state.availableChannels === undefined) {
     return (<LoadingLayout />);
  
    } else {
      if(this.state.currentAccount == null) {
        return (<Alert type="error" fullscreen={true} infoTextKey="general.no_accounts"/>);

      } else if(this.state.currentChannel == null) {
        return (<Alert type="error" fullscreen={true} infoTextKey="general.no_channels"/>);

      } else {
        return (
          <AdminLayout availableAccounts={this.state.availableAccounts} availableChannels={this.state.availableChannels} currentAccount={this.state.currentAccount} currentChannel={this.state.currentChannel} currentEditor={this.state.currentEditor}>
            {this.props.children}
          </AdminLayout>
        );
      }
    }
  }
});