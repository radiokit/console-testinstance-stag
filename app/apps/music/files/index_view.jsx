import React from 'react';

import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Scope from '../../../widgets/admin/scope_widget.jsx';
import Loading from '../../../widgets/general/loading_widget.jsx';
import FileBrowser from '../../../widgets/vault/file_browser_widget.jsx';

import RoutingHelper from '../../../helpers/routing_helper.js';

export default React.createClass({
  render: function() {
    return (
      <Scope kind="userAccount">
        <Section>
          <GridRow>
            <GridCell size="large" center={true}>
              <FileBrowser repositoryRole="music" contentPrefix="apps.music.files" routingPrefix={RoutingHelper.apps.music} />
            </GridCell>
          </GridRow>
        </Section>
      </Scope>
    );
  }
});
