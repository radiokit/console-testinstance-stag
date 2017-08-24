import React from 'react';
import Counterpart from 'counterpart';

import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';


import IndexOverridePartial from './IndexOverridePartial.jsx';

Counterpart.registerTranslations('en', require('./IndexView.locale.en.js'));
Counterpart.registerTranslations('pl', require('./IndexView.locale.pl.js'));


export default React.createClass({
  buildTabs() {
    return {
      override: {
        element: IndexOverridePartial,
        props: { contentPrefix: 'apps.broadcast.metadata.override' },
      },
    };
  },

  render() {
    return (
      <Section>
        <GridRow>
          <GridCell size="large" center={true}>
            <Card
              cardPadding={true}
              contentPrefix="apps.broadcast.metadata"
              contentElement={this.buildTabs()}
            />
          </GridCell>
        </GridRow>
      </Section>
    );
  },
});
