import React from 'react';
import Card from '../../widgets/admin/card_widget.jsx';
import List from '../../widgets/admin/list_widget.jsx';
import Tile from '../../widgets/admin/tile_widget.jsx';
import Section from '../../widgets/admin/section_widget.jsx';
import Loading from '../../widgets/general/loading_widget.jsx';
import Channel from './partials/channel_partial.jsx';

export default React.createClass({
  getInitialState: function() {
    return { availableBroadcastChannels: null };
  },


  componentDidMount: function() {
    window.data
      .query("auth", "Broadcast.Channel")
      .select("id", "name")
      .order("name", "asc")
      .on("update", (_, query) => {if(this.isMounted()) { this.setState({ availableBroadcastChannels: query.getData() }) }})
      .fetch();
  },



  render: function() {
    if(this.state.availableBroadcastChannels == null) {
      return (<Loading info={true} infoTextKey="apps.joint.index.loading"/>);

    } else {
      return (<div>{this.state.availableBroadcastChannels.map(x => <Channel key={`joint.channel.${x.get("id")}`} broadcastChannel={x}/>)}</div>);
    }
  }
});