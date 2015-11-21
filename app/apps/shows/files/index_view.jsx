import React from 'react';

import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Loading from '../../../widgets/general/loading_widget.jsx';
import FileBrowser from '../../../widgets/vault/file_browser_widget.jsx';

import RoutingHelper from '../../../helpers/routing_helper.js';

export default React.createClass({
  render: function() {
    return (
      <Section>
        <GridRow>
          <GridCell size="large" center={true}>
            <FileBrowser repositoryRole="shows" contentPrefix="apps.shows.files" routingPrefix={RoutingHelper.apps.shows} />
          </GridCell>
        </GridRow>
      </Section>
    );
  }
});
