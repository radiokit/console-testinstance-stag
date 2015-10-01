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
      .enableAutoUpdate();

    this.inputsHttpQuery = window.data
      .query("plumber", "Media.Input.Stream.HTTP")
      .select("id", "extra")
      .where("references", "deq", "broadcast_channel", this.props.broadcastChannel.get("id"))
      .on("update", (_, query) => {if(this.isMounted()) { this.setState({ inputsHttp: query.getData() }) }})
      .enableAutoUpdate();
  },


  componentWillUnmount: function() {
    this.inputsRtpQuery.teardown();
    this.inputsHttpQuery.teardown();
  },


  filterInputs: function(collection, kind, role) {
    return collection
      .filter((x) => { return x.get("extra", {}).get("joint.role") === role })
      .map((x) => { return Immutable.Map({ kind: kind, role: role, input: x })});
  },



  render: function() {
    let returns = this.filterInputs(this.state.inputsRtp, "rtp", "return")
      .concat(this.filterInputs(this.state.inputsHttp, "http", "return"));

    let transmissions = this.filterInputs(this.state.inputsRtp, "rtp", "transmission")
      .concat(this.filterInputs(this.state.inputsHttp, "http", "transmission"));


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