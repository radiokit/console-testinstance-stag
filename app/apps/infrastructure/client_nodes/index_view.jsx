import React from 'react';

import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Table from '../../../widgets/admin/table_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';
import CardBody from '../../../widgets/admin/card_body_widget.jsx';
import CardHeader from '../../../widgets/admin/card_header_widget.jsx';
import ToolBar from '../../../widgets/admin/toolbar_widget.jsx';
import ToolBarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolBarButton from '../../../widgets/admin/toolbar_button_widget.jsx';
import DataQuery from '../../../widgets/api/data_query_widget.jsx';
import CreateModal from './create_modal.jsx';
import DeleteModal from './delete_modal.jsx';

import RoutingHelper from '../../../helpers/routing_helper.js';

export default React.createClass({
  onCreateButtonClick: function(e) {
    e.preventDefault();
    this.refs.createModal.show();
  },


  render: function() {
    return (
      <Section>
        <GridRow>
          <GridCell size="large" center={true}>
            <CreateModal ref="createModal" />

            <Card contentPrefix="apps.infrastructure.client_nodes.index">
              <CardHeader/>
              <CardBody>
                <ToolBar>
                  <ToolBarGroup>
                    <ToolBarButton icon="plus" labelTextKey="apps.infrastructure.client_nodes.index.actions.create" onClick={this.onCreateButtonClick} />
                  </ToolBarGroup>
                </ToolBar>

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
