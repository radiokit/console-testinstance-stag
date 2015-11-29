import React from 'react';
import Immutable from 'immutable';

import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Loading from '../../../widgets/general/loading_widget.jsx';
import Alert from '../../../widgets/admin/alert_widget.jsx';
import DataQuery from '../../../widgets/api/data_query_widget.jsx';

import ComputingNodeContainer from './partials/computing_node_container_partial.jsx';
import ClientNodeContainer from './partials/client_node_container_partial.jsx';

export default React.createClass({
  render: function() {
    return (
      <Section>
        <GridRow>
          <GridCell size="large" center={true}>
            <DataQuery app="plumber" model="Resource.Architecture.ClientNode" select={["id", "name"]}>
              <ClientNodeContainer />
            </DataQuery>

            <DataQuery app="plumber" model="Resource.Architecture.computingNode" select={["id", "hostname"]}>
              <ComputingNodeContainer />
            </DataQuery>
          </GridCell>
        </GridRow>
      </Section>
    );
  }
});
