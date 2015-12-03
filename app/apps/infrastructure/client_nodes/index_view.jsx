import React from 'react';

import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Table from '../../../widgets/admin/table_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';
import CardBody from '../../../widgets/admin/card_body_widget.jsx';
import CardHeader from '../../../widgets/admin/card_header_widget.jsx';
import DataQuery from '../../../widgets/api/data_query_widget.jsx';

import RoutingHelper from '../../../helpers/routing_helper.js';

export default React.createClass({
  render: function() {
    return (
      <Section>
        <GridRow>
          <GridCell size="large" center={true}>
            <Card contentPrefix="apps.infrastructure.client_nodes.index">
              <CardHeader/>
              <CardBody>
                <DataQuery app="plumber" model="Resource.Architecture.ClientNode" select={["id", "name"]}>
                  <Table selectable={false} attributes={{name: { renderer: "string" }}} actions={[]} contentPrefix="apps.infrastructure.client_nodes.index.table" />
                </DataQuery>
              </CardBody>
            </Card>
          </GridCell>
        </GridRow>
      </Section>
    );
  }
});
