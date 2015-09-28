import React from 'react';

import Card from '../admin/card_widget.jsx';
import List from '../admin/list_widget.jsx';
import Tile from '../admin/tile_widget.jsx';
import Loading from '../general/loading_widget.jsx';


export default React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired
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
      .on("update", (_, query) => this.setState({ availableBroadcastChannels: query.getData() }))
      .fetch();
  },


  render: function() {
    if(this.state.availableBroadcastChannels == null) {
      return (<Loading info={true} infoTextKey="widgets.broadcast.channel_selector.loading"/>);

    } else {
      return (<Card padding={false} header={true} headerTextKey="widgets.broadcast.channel_selector.header">
        <List>
          {this.state.availableBroadcastChannels.map(x => <Tile>{x.get("name")}</Tile>)}
        </List>
      </Card>);
    }
  }
});