import React from 'react';
import Counterpart from 'counterpart';

import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';

import IndexDiagramPartial from './IndexDiagramPartial.jsx';
import IndexTablePartial from './IndexTablePartial.jsx';

Counterpart.registerTranslations("en", require('./locales.en.js'));
Counterpart.registerTranslations("pl", require('./locales.pl.js'));


export default React.createClass({
  buildTabs: function() {
    return {
      diagram:  { element: IndexDiagramPartial },
      table:    { element: IndexTablePartial },
    }
  },



  render: function() {
    return (
      <Section>
        <GridRow>
          <GridCell size="large" center={true}>
            <Card contentPrefix="apps.electron.patchbay"
                  contentElement={this.buildTabs()} />
          </GridCell>
        </GridRow>
      </Section>
    );
  }
});
