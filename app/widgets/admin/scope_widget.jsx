import React from 'react';


export default React.createClass({
  propTypes: {
    kind: React.PropTypes.oneOf(['userAccount', 'broadcastChannel']).isRequired,
  },


  contextTypes: {
    currentUserAccount: React.PropTypes.object,
    availableUserAccounts: React.PropTypes.object.isRequired,
    currentBroadcastChannel: React.PropTypes.object,
    availableBroadcastChannels: React.PropTypes.object.isRequired,
    onCurrentUserAccountChange: React.PropTypes.func,
    onCurrentBroadcastChannelChange: React.PropTypes.func,
  },


  onUserAccountClick: function(userAccount) {
    this.context.onCurrentUserAccountChange(userAccount);
  },


  onBroadcastChannelClick: function(broadcastChannel) {
    this.context.onCurrentBroadcastChannelChange(broadcastChannel);
  },


  render: function() {
    switch(this.props.kind) {
      case "userAccount":
        if(this.context.currentUserAccount) {
          return (<div>{this.props.children}</div>);

        } else {
          return (
            <div>
              <header>SELECT ACCOUNT</header>
              <ul>
                {this.context.availableUserAccounts.map((userAccount) => {
                  return (
                    <li key={userAccount.get("id")}>
                      <a onClick={this.onUserAccountClick.bind(this, userAccount)}>
                        {userAccount.get("name_custom")}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          );
        }
        break;


      case "broadcastChannel":
        if(this.context.currentBroadcastChannel) {
          return (<div>{this.props.children}</div>);

        } else {
          return (
            <div>
              <header>SELECT CHANNEL</header>
              <ul>
                {this.context.availableBroadcastChannels.map((broadcastChannel) => {
                  return (
                    <li key={broadcastChannel.get("id")}>
                      <a onClick={this.onBroadcastChannelClick.bind(this, broadcastChannel)}>
                        {broadcastChannel.get("name")}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          );
        }
        break;

    }
  }
});
