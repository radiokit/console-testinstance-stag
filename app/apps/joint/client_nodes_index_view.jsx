import React from 'react';
import Card from '../../widgets/admin/card_widget.jsx';
import List from '../../widgets/admin/list_widget.jsx';
import Tile from '../../widgets/admin/tile_widget.jsx';
import Section from '../../widgets/admin/section_widget.jsx';
import Loading from '../../widgets/general/loading_widget.jsx';
import Alert from '../../widgets/admin/alert_widget.jsx';
import Channel from './partials/channel_partial.jsx';

export default React.createClass({
  getInitialState: function() {
    return { clientNodes: null };
  },


  componentDidMount: function() {
    window.data
      .query("plumber", "Resource.Architecture.ClientNode")
      .select("id", "name")
      .order("name", "asc")
      .on("update", (_, query) => {if(this.isMounted()) { this.setState({ clientNodes: query.getData() }) }})
      .fetch();
  },



  render: function() {
    if(this.state.clientNodes == null) {
      return (<Loading info={true} infoTextKey="apps.joint.client_nodes.loading"/>);

    } else if(this.state.clientNodes.size == 0) {
      return (<Alert type="error" fullscreen={true} infoTextKey="apps.joint.client_nodes.none"/>);

    } else {
      // return (<div>{this.state.clientNodes.map(x => <Channel key={`joint.channel.${x.get("id")}`} broadcastChannel={x}/>)}</div>);
    }
  }
});