import React from 'react';

export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    value: React.PropTypes.string,
  },


  contextTypes: {
    availableBroadcastChannels: React.PropTypes.object.isRequired,
  },


  render: function() {
    if(this.props.record.has("references") && this.props.record.get("references") && this.props.record.get("references").has("broadcast_channel_id")) {
      return (<span>{this.context.availableBroadcastChannels.find((broadcastChannel) => { return broadcastChannel.get("id") === this.props.record.get("references").get("user_account_id"); }).get("name")}</span>);
    } else {
      return (<span/>);
    }
  }
});
