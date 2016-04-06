import React from 'react';
import Counterpart from 'counterpart';

import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';

import IndexDiagramPartial from './IndexDiagramPartial.jsx';
import IndexTablePartial from './IndexTablePartial.jsx';

Counterpart.registerTranslations("en", require('./IndexView.locale.en.js'));
Counterpart.registerTranslations("pl", require('./IndexView.locale.pl.js'));


export default React.createClass({
  buildTabs: function() {
    return {
      table:    { element: IndexTablePartial, props: { contentPrefix: "apps.electron.patchbay.table" } },
      diagram:  { element: IndexDiagramPartial, props: { contentPrefix: "apps.electron.patchbay.diagram" } },
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
