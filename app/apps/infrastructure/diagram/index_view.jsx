import React from 'react';
import Immutable from 'immutable';

import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Loading from '../../../widgets/general/loading_widget.jsx';
import Alert from '../../../widgets/admin/alert_widget.jsx';

import ComputingNode from './partials/computing_node_partial.jsx';
import ClientNode from './partials/client_node_partial.jsx';

import RoutingHelper from '../../../helpers/routing_helper.js';

export default React.createClass({
  getInitialState: function() {
    return {
      loadingError: false,
      loadedComputingNodes: false,
      availableComputingNodes: new Immutable.Seq().toIndexedSeq(),
      loadedClientNodes: false,
      availableClientNodes: new Immutable.Seq().toIndexedSeq(),
    }
  },


  componentDidMount: function() {
    this.loadComputingNodes();
    this.loadClientNodes();
  },


  loadComputingNodes: function() {
    window.data
      .query("plumber", "Resource.Architecture.ComputingNode")
      .select("id", "hostname")
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({
            loadingError: true
          })
        }
      }).on("fetch", (_event, _query, data) => {
        if(this.isMounted()) {
          this.setState({
            loadedComputingNodes: true,
            availableComputingNodes: data
          });
        }
      }).fetch();
  },


  loadClientNodes: function() {
    window.data
      .query("plumber", "Resource.Architecture.ClientNode")
      .select("id", "name")
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({
            loadingError: true
          })
        }
      }).on("fetch", (_event, _query, data) => {
        if(this.isMounted()) {
          this.setState({
            loadedClientNodes: true,
            availableClientNodes: data
          });
        }
      }).fetch();
  },


  render: function() {
    if(this.state.loadingError) {
      return (<Alert type="error" fullscreen={true} infoTextKey="general.errors.communication.general" />);

    } else {
      if(this.state.loadedComputingNodes === false) {
        return (<Loading/>);

      } else {

        return (
          <Section>
            <GridRow>
              <GridCell size="large" center={true}>
                {this.state.availableClientNodes.map((clientNode) => {
                  return (
                    <ClientNode key={clientNode.get("id")} clientNode={clientNode} />
                  );
                })}
                {this.state.availableComputingNodes.map((computingNode) => {
                  return (
                    <ComputingNode key={computingNode.get("id")} computingNode={computingNode} />
                  );
                })}
              </GridCell>
            </GridRow>
          </Section>
        );
      }
    }
  }
});
