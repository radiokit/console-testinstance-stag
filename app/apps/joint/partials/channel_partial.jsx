import React from 'react';
import Card from '../../../widgets/admin/card_widget.jsx';
import List from '../../../widgets/admin/list_widget.jsx';
import Tile from '../../../widgets/admin/tile_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Loading from '../../../widgets/general/loading_widget.jsx';

export default React.createClass({
  propTypes: {
    broadcastChannel: React.PropTypes.object.isRequired, 
  },


  getInitialState: function() {
    return { inputsRTP: null }
  },


  // componentDidMount: function() {
  //   window.data
  //     .query("auth", "Broadcast.Channel")
  //     .select("id", "name")
  //     .order("name", "asc")
  //     .on("update", (_, query) => {if(this.isMounted()) { this.setState({ availableBroadcastChannels: query.getData() }) }})
  //     .fetch();
  // },


  areInputsLoaded: function() {
    this.state.inputsRTP != null;
  },  



  renderReturn: function() {

  },

  
  renderInputs: function() {

  },


  render: function() {
    return <Section header={true} headerText={this.props.broadcastChannel.get("name")}>
      <div className="row">
        <div className="col-md-4">
          <Card header={true} headerTextKey="apps.joint.partials.channel.return.header">
            {this.renderReturn()}
          </Card>
        </div>

        <div className="col-md-8">
          <Card header={true} headerTextKey="apps.joint.partials.channel.inputs.header">
            {this.renderInputs()}
          </Card>
        </div>
      </div>
    </Section>;
  }
});