import React from 'react';
import Immutable from 'immutable';
import Translate from 'react-translate-component';

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
    return {
      inputsRtp: new Immutable.Seq().toIndexedSeq(),
      inputsHttp: new Immutable.Seq().toIndexedSeq()
    };
  },


  componentDidMount: function() {
    this.inputsRtpQuery = window.data
      .query("plumber", "Media.Input.Stream.RTP")
      .select("id", "references", "extra")
      .where("references", "deq", "broadcast_channel", this.props.broadcastChannel.get("id"))
      .on("update", (_, query) => {if(this.isMounted()) { this.setState({ inputsRtp: query.getData() }) }})
      .fetch(); // FIXME enableAutoFetch

    this.inputsHttpQuery = window.data
      .query("plumber", "Media.Input.Stream.HTTP")
      .select("id", "references", "extra")
      .where("references", "deq", "broadcast_channel", this.props.broadcastChannel.get("id"))
      .on("update", (_, query) => {if(this.isMounted()) { this.setState({ inputsHttp: query.getData() }) }})
      .fetch(); // FIXME enableAutoFetch
  },


  componentWillUnmount: function() {
    this.inputsRtpQuery.teardown();
    this.inputsHttpQuery.teardown();
  },


  filterInputs: function(collection, role, subRole) {
    return collection.filter((x) => { try { return x.get("extra").get("joint.role") === role && x.get("extra").get("joint.subrole") === subRole } catch(e) { /* There are missing keys */ } });
  },


  renderReturns: function() {
    let radiosRtp = this.filterInputs(this.state.inputsRtp, "return", "radio");
    let radiosHttp = this.filterInputs(this.state.inputsHttp, "return", "radio");
    let talkbacksRtp = this.filterInputs(this.state.inputsRtp, "return", "talkback");
    let talkbacksHttp = this.filterInputs(this.state.inputsHttp, "return", "talkback");

    return (
      <table>
        <thead>
          <tr>
            {radiosRtp.map((x) => { return <th key={"joint-head-subrole-return-radio-rtp-" + x.get("id")}><Translate content="apps.joint.partials.channel.return.radio.header" component="small"/></th>; }) }
            {radiosHttp.map((x) => { return <th key={"joint-head-subrole-return-radio-http-" + x.get("id")}><Translate content="apps.joint.partials.channel.return.radio.header" component="small"/></th>; }) }
            {talkbacksRtp.map((x) => { return <th key={"joint-head-subrole-return-talkback-rtp-" + x.get("id")}><Translate content="apps.joint.partials.channel.return.talkback.header" component="small"/></th>; }) }
            {talkbacksHttp.map((x) => { return <th key={"joint-head-subrole-return-talkback-http-" + x.get("id")}><Translate content="apps.joint.partials.channel.return.talkback.header" component="small"/></th>; }) }
          </tr>
          <tr>
            {radiosRtp.map((x) => { return <th key={"joint-head-name-return-radio-rtp-" + x.get("id")}>{x.get("extra", {}).get("joint.name")}</th>; }) }
            {radiosHttp.map((x) => { return <th key={"joint-head-name-return-radio-http-" + x.get("id")}>{x.get("extra", {}).get("joint.name")}</th>; }) }
            {talkbacksRtp.map((x) => { return <th key={"joint-head-name-return-talkback-rtp-" + x.get("id")}>{x.get("extra", {}).get("joint.name")}</th>; }) }
            {talkbacksHttp.map((x) => { return <th key={"joint-head-name-return-talkback-http-" + x.get("id")}>{x.get("extra", {}).get("joint.name")}</th>; }) }
          </tr>          
        </thead>
        <tbody>
          <tr>
            {radiosRtp.map((x) => { return <td key={"joint-body-return-radio-rtp-" + x.get("id")}>{x.get("id")}</td>; }) }
            {radiosHttp.map((x) => { return <td key={"joint-body-return-radio-http-" + x.get("id")}>{x.get("id")}</td>; }) }
            {talkbacksRtp.map((x) => { return <td key={"joint-body-return-talkback-rtp-" + x.get("id")}>{x.get("id")}</td>; }) }
            {talkbacksHttp.map((x) => { return <td key={"joint-body-return-talkback-http-" + x.get("id")}>{x.get("id")}</td>; }) }
          </tr>
        </tbody>
      </table>
    );
  },

  
  renderTransmissions: function() {

  },


  render: function() {
    return <Section header={true} headerText={this.props.broadcastChannel.get("name")}>
      <div className="row">
        <div className="col-md-4">
          <Card header={true} headerTextKey="apps.joint.partials.channel.return.header">
            {this.renderReturns()}
          </Card>
        </div>

        <div className="col-md-8">
          <Card header={true} headerTextKey="apps.joint.partials.channel.transmissions.header">
            {this.renderTransmissions()}
          </Card>
        </div>
      </div>
    </Section>;
  }
});