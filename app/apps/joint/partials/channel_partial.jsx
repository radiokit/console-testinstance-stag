import React from 'react';
import Immutable from 'immutable';
import Translate from 'react-translate-component';

import Card from '../../../widgets/admin/card_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Loading from '../../../widgets/general/loading_widget.jsx';

import Mix from './mix_partial.jsx';


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
      .select("id", "extra")
      .where("references", "deq", "broadcast_channel", this.props.broadcastChannel.get("id"))
      .on("update", (_, query) => {if(this.isMounted()) { this.setState({ inputsRtp: query.getData() }) }})
      .fetch(); // FIXME enableAutoFetch

    this.inputsHttpQuery = window.data
      .query("plumber", "Media.Input.Stream.HTTP")
      .select("id", "extra")
      .where("references", "deq", "broadcast_channel", this.props.broadcastChannel.get("id"))
      .on("update", (_, query) => {if(this.isMounted()) { this.setState({ inputsHttp: query.getData() }) }})
      .fetch(); // FIXME enableAutoFetch
  },


  componentWillUnmount: function() {
    this.inputsRtpQuery.teardown();
    this.inputsHttpQuery.teardown();
  },


  filterInputs: function(collection, kind, role, subrole) {
    return collection
      .filter((x) => { try { return x.get("extra").get("joint.role") === role && x.get("extra").get("joint.subrole") === subrole } catch(e) { /* There are missing keys */ } })
      .map((x) => { return Immutable.Map({ kind: kind, role: role, subrole: subrole, input: x })});
  },



  render: function() {
    let returns = this.filterInputs(this.state.inputsRtp, "rtp", "return", "radio")
      .concat(this.filterInputs(this.state.inputsHttp, "http", "return", "radio"))
      .concat(this.filterInputs(this.state.inputsRtp, "rtp", "return", "talkback"))
      .concat(this.filterInputs(this.state.inputsHttp, "http", "return", "talkback"));

    let transmissions = this.filterInputs(this.state.inputsRtp, "rtp", "transmission", "studio")
      .concat(this.filterInputs(this.state.inputsHttp, "http", "transmission", "studio"))
      .concat(this.filterInputs(this.state.inputsRtp, "rtp", "transmission", "reporter"))
      .concat(this.filterInputs(this.state.inputsHttp, "http", "transmission", "reporter"));


    return <Section header={true} headerText={this.props.broadcastChannel.get("name")}>
      <div className="row">
        <div className="col-md-8">
          <Mix role="transmissions" inputs={transmissions} />
        </div>

        <div className="col-md-4">
          <Mix role="returns" inputs={returns} />
        </div>
      </div>
    </Section>;
  }
});