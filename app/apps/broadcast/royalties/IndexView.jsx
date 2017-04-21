import React from 'react';
import Counterpart from 'counterpart';

import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';


import IndexReportsPartial from './IndexReportsPartial.jsx';

Counterpart.registerTranslations('en', require('./IndexView.locale.en.js'));
Counterpart.registerTranslations('pl', require('./IndexView.locale.pl.js'));


export default React.createClass({
  buildTabs() {
    return {
      reports: {
        element: IndexReportsPartial,
        props: { contentPrefix: 'apps.broadcast.royalties.reports' },
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
              contentPrefix="apps.broadcast.royalties"
              contentElement={this.buildTabs()}
            />
          </GridCell>
        </GridRow>
      </Section>
    );
  },
});
