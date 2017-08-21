import React from 'react';

import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';
import IndexProfilePartial from './IndexProfilePartial.jsx';

export default () => (
  <Section>
    <GridRow>
      <GridCell size="large" center>
        <Card
          cardPadding
          contentPrefix="apps.dj.your_profile"
          contentElement={IndexProfilePartial}
          contentProps={{
            contentPrefix: 'apps.dj.your_profile',
          }}
        />
      </GridCell>
    </GridRow>
  </Section>
);
