import React from 'react';
import Immutable from 'immutable';


import Card from '../../widgets/admin/card_widget.jsx';
import CardHeader from '../../widgets/admin/card_header_widget.jsx';
import CardToolBar from '../../widgets/admin/card_tool_bar_widget.jsx';
import CardToolBarCreate from '../../widgets/admin/card_tool_bar_create_widget.jsx';
import CardBody from '../../widgets/admin/card_body_widget.jsx';
import GridRow from '../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../widgets/admin/section_widget.jsx';
import Loading from '../../widgets/general/loading_widget.jsx';
import RoutingHelper from '../../helpers/routing_helper.js';

export default React.createClass({
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
      // .where("references", "deq", "broadcast_channel", this.props.broadcastChannel.get("id"))
      .on("update", (_, query) => {if(this.isMounted()) { this.setState({ inputsRtp: query.getData() }) }})
      .enableAutoUpdate(10000);

    this.inputsHttpQuery = window.data
      .query("plumber", "Media.Input.Stream.HTTP")
      .select("id", "extra")
      // .where("references", "deq", "broadcast_channel", this.props.broadcastChannel.get("id"))
      .on("update", (_, query) => {if(this.isMounted()) { this.setState({ inputsHttp: query.getData() }) }})
      .enableAutoUpdate(10000);
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

    return (
      <Section>
        <GridRow>
          <GridCell size="medium">
            <Card contentPrefix="apps.joint.control_room.transmissions">
              <CardHeader>
                <CardToolBar>
                  <CardToolBarCreate path={RoutingHelper.apps.joint.devices.add(this, "transmissions")} hintTooltipKey="apps.joint.devices.create.form.header" />
                </CardToolBar>
              </CardHeader>

              <CardBody>

              </CardBody>
            </Card>
          </GridCell>

          <GridCell size="xsmall">
            <Card contentPrefix="apps.joint.control_room.talkbacks">
              <CardHeader>
                <CardToolBar>
                  <CardToolBarCreate path={RoutingHelper.apps.joint.devices.add(this, "talbacks")} hintTooltipKey="apps.joint.devices.create.form.header" />
                </CardToolBar>
              </CardHeader>

              <CardBody>

              </CardBody>
            </Card>
          </GridCell>

          <GridCell size="xsmall">
            <Card contentPrefix="apps.joint.control_room.onair">
              <CardHeader>
                <CardToolBar>
                  <CardToolBarCreate path={RoutingHelper.apps.joint.devices.add(this, "onair")} hintTooltipKey="apps.joint.devices.create.form.header" />
                </CardToolBar>
              </CardHeader>

              <CardBody>

              </CardBody>
            </Card>
          </GridCell>
        </GridRow>
      </Section>
    );
  }
});
