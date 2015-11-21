import React from 'react';

import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';

export default React.createClass({
  render: function() {
    return (
      <Section>
        <GridRow>
          <GridCell size="large" center={true}>
            PLAYLIST!!!!
          </GridCell>
        </GridRow>
      </Section>
    );
  }
});
