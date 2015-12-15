import React from 'react';
import Immutable from 'immutable';
import Counterpart from 'counterpart';
import clone from 'clone';

import Alert from '../../../widgets/admin/alert_widget.jsx';
import Loading from '../../../widgets/general/loading_widget.jsx';
import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import TableBrowser from '../../../widgets/admin/table_browser_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';
import CardBody from '../../../widgets/admin/card_body_widget.jsx';
import CardHeader from '../../../widgets/admin/card_header_widget.jsx';
import ToolBar from '../../../widgets/admin/toolbar_widget.jsx';
import ToolBarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolBarButton from '../../../widgets/admin/toolbar_button_widget.jsx';

import RoutingHelper from '../../../helpers/routing_helper.js';

export default React.createClass({
  contextTypes: {
    currentUserAccount: React.PropTypes.object.isRequired,
  },


  getInitialState: function() {
    return {
      availableInputsRtp: null,
      availableInputsHttp: null,
      availableServersRtsp: null,
      loadingError: false,
      updatingPatches: false,
      currentPatches: {},
    }
  },


  buildInputsRtpQuery: function() {
    this.inputsRtpQuery = window.data
      .query("plumber", "Media.Input.Stream.RTP")
      .select("id", "name", "client_node")
      .joins("client_node")
      .on("fetch", (_event, _query, data) => {
        if(this.isMounted()) {
          this.setState({ availableInputsRtp: data });
        }
      })
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({ loadingError: true });
        }
      })
      .fetch();
      // .where("references", "deq", "user_account_id", this.context.currentUserAccount.get("id"))
      // .where("references", "deq", "role", "joint")
  },


  buildInputsHttpQuery: function() {
    this.inputsHttpQuery = window.data
      .query("plumber", "Media.Input.Stream.HTTP")
      .select("id", "name")
      .on("fetch", (_event, _query, data) => {
        if(this.isMounted()) {
          this.setState({ availableInputsHttp: data });
        }
      })
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({ loadingError: true });
        }
      })
      .fetch();
      // .where("references", "deq", "user_account_id", this.context.currentUserAccount.get("id"))
      // .where("references", "deq", "role", "joint")
  },


  buildServersRtspQuery: function() {
    this.serversRtspQuery = window.data
      .query("plumber", "Media.Server.RTSP")
      .select("id", "name", "client_node")
      .joins("client_node")
      .on("fetch", (_event, _query, data) => {
        if(this.isMounted()) {
          this.setState({ availableServersRtsp: data });
        }
      })
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({ loadingError: true });
        }
      })
      .fetch();
      // .where("references", "deq", "user_account_id", this.context.currentUserAccount.get("id"))
      // .where("references", "deq", "role", "joint")
  },


  componentDidMount: function() {
    this.buildInputsRtpQuery();
    this.buildInputsHttpQuery();
    this.buildServersRtspQuery();
  },


  componentWillUnmount: function() {
    this.inputsRtpQuery.teardown();
    this.inputsHttpQuery.teardown();
    this.serversRtspQuery.teardown();
  },


  onCrossChange: function(state, inputPrefix, input, outputPrefix, output) {
    if(state === true) {
      let params = {};
      params[`${inputPrefix}_id`] = input.get("id");
      params[`${outputPrefix}_id`] = output.get("id");

      window.data
        .record("plumber", "Media.Routing.Link")
        .on("loaded", () => {
          if(this.isMounted()) {
            let newPatches = clone(this.state.currentPatches);
            newPatches[`${inputPrefix}#${input.get("id")} ${outputPrefix}#${output.get("id")}`] = true;
            this.setState({
              updatingPatches: false,
              currentPatches: newPatches,
            });
          }
        })
        .on("loading", () => {
          if(this.isMounted()) {
            this.setState({
              updatingPatches: true,
            });
          }
        })
        .on("error", () => {
          if(this.isMounted()) {
            this.setState({
              updatingPatches: true,
            });
          }

          // TODO display error
        })
        .create(params);
    }
  },


  render: function() {
    if(this.state.loadingError) {
      return (<Alert type="error" fullscreen={true} infoTextKey="general.errors.communication.general" />);

    } else if(!this.state.availableInputsRtp || !this.state.availableInputsHttp || !this.state.availableServersRtsp) {
      return (<Loading />);

    } else {
      return (
        <Section>
          <GridRow>
            <GridCell size="large" center={true}>
              <Card contentPrefix="apps.infrastructure.patchbay.index">
                <CardHeader/>
                <CardBody cardPadding={false}>
                  <table className="vertical" style={{width: 300 + 24 * this.state.availableServersRtsp.count() + "px"}}>
                    <thead>
                      <tr>
                        <th style={{width: "300px"}}></th>
                        {this.state.availableServersRtsp.map((output) => {
                          return (
                            <th key={`head-output-rtsp-${output.get("id")}`} className="vertical"><p>{output.get("client_node").get("name")}</p></th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.availableInputsRtp.map((input) => {
                        return (
                          <tr key={`head-input-rtp-${input.get("id")}`}>
                            <th className="text-right">{input.get("client_node").get("name")}</th>
                            {this.state.availableServersRtsp.map((output) => {
                              return (
                                <td style={{width: "24px", height: "24px"}} key={`patch-rtsp-${input.get("id")}-${output.get("id")}`}>
                                  <input type="checkbox" disabled={this.state.updatingPatches} onChange={this.onCrossChange.bind(this, true, "input_stream_rtp", input, "server_rtsp", output)}/>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                      {this.state.availableInputsHttp.map((input) => {
                        return (
                          <tr key={`head-input-http-${input.get("id")}`}>
                            <th className="text-right">{input.get("name")}</th>
                            {this.state.availableServersRtsp.map((output) => {
                              return (
                                <td style={{width: "24px", height: "24px"}} key={`patch-rtsp-${input.get("id")}-${output.get("id")}`}>
                                <input type="checkbox" disabled={this.state.updatingPatches} onChange={this.onCrossChange.bind(this, true, "input_stream_http", input, "server_rtsp", output)}/>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </GridCell>
          </GridRow>
        </Section>
      );
    }
  }
});
