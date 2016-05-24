import React from 'react';

import GridRow from '../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../widgets/admin/grid_cell_widget.jsx';
import Card from '../../widgets/admin/card_widget.jsx';
import Section from '../../widgets/admin/section_widget.jsx';


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

  onUserAccountClick(userAccount) {
    this.context.onCurrentUserAccountChange(userAccount);
  },

  onBroadcastChannelClick(broadcastChannel) {
    this.context.onCurrentBroadcastChannelChange(broadcastChannel);
  },

  componentDidMount: function() {
    switch (this.props.kind) {
      case 'userAccount':
        if(this.context.availableUserAccounts.count() === 1) {
          this.context.onCurrentUserAccountChange(this.context.availableUserAccounts.first());
        }
        break;

      case 'broadcastChannel':
        if(this.context.availableBroadcastChannels.count() === 1) {
          this.context.onCurrentBroadcastChannelChange(this.context.availableBroadcastChannels.first());
        }
        break;
    }
  },

  render() {
    switch (this.props.kind) {
      case 'userAccount':
        {
          if (this.context.currentUserAccount) {
            return (<div>{this.props.children}</div>);
          }
          let contentElement = (
              <ul className="list divider-full-bleed">
                {(this.context.availableUserAccounts || []).map((userAccount) => {
                  return (
                    <li key={userAccount.get('id')} className="tile">
                      <a onClick={this.onUserAccountClick.bind(this, userAccount)} className="tile-content"
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="tile-text">
                          {userAccount.get('name')}
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            );

          return (
              <Section>
                <GridRow>
                  <GridCell size="small" center>
                    <Card contentPrefix="widgets.admin.scope.user_account" cardPadding={false}
                      contentElement={contentElement}
                    />
                  </GridCell>
                </GridRow>
              </Section>
            );
        }

      case 'broadcastChannel':
        {
          if (this.context.currentBroadcastChannel) {
            return (<div>{this.props.children}</div>);
          }
          let contentElement = (
            <ul className="list divider-full-bleed">
              {(this.context.availableBroadcastChannels || []).map((broadcastChannel) => {
                return (
                  <li key={broadcastChannel.get('id')} className="tile">
                    <a onClick={this.onBroadcastChannelClick.bind(this, broadcastChannel)} className="tile-content">
                      <div className="tile-text">
                        {broadcastChannel.get('name')}
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          );

          return (
            <Section>
              <GridRow>
                <GridCell size="small" center>
                  <Card contentPrefix="widgets.admin.scope.broadcast_channel" cardPadding={false}
                    contentElement={contentElement}
                  />
                </GridCell>
              </GridRow>
            </Section>

          );
        }

      default:
        return null;
    }
  },
});
