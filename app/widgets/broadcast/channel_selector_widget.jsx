import React from 'react';
import { History } from 'react-router';

import Card from '../admin/card_widget.jsx';
import List from '../admin/list_widget.jsx';
import Tile from '../admin/tile_widget.jsx';
import Loading from '../general/loading_widget.jsx';


export default React.createClass({
  mixins: [ History ],


  propTypes: {
    data: React.PropTypes.object.isRequired,
    nextRoute: React.PropTypes.string.isRequired
  },


  getInitialState: function() {
    return { 
      availableBroadcastChannels: null
    };
  },


  componentDidMount: function() {
    this.props.data
      .query("auth", "Broadcast.Channel")
      .select("id", "name")
      .order("name", "asc")
      .on("update", (_, query) => {if(this.isMounted()) { this.setState({ availableBroadcastChannels: query.getData() }) }})
      .fetch();
  },


  transitionToNextRoute: function(broadcast_channel_id) {
    this.history.pushState(null, this.props.nextRoute.replace(/:broadcast_channel_id/, broadcast_channel_id), {})
  },


  render: function() {
    if(this.state.availableBroadcastChannels == null) {
      return (<Loading info={true} infoTextKey="widgets.broadcast.channel_selector.loading"/>);

    } else if(this.state.selectedBroadcastChannel == null) {
      return (<Card padding={false} header={true} headerTextKey="widgets.broadcast.channel_selector.header">
        <List>
          {this.state.availableBroadcastChannels.map(x => <Tile onClick={this.transitionToNextRoute(x.get("id"))}>{x.get("name")}</Tile>)}
        </List>
      </Card>);
    
    }
  }
});