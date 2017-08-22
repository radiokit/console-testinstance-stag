import React, { PropTypes } from 'react';
import counterpart from 'counterpart';

import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';
import IndexProfilePartial from './IndexProfilePartial.jsx';

const IndexView = (_props, { currentTagItemName }) => {
  const cardHeader = counterpart('apps.dj.your_profile.header', { name: currentTagItemName });

  return (
    <Section>
      <GridRow>
        <GridCell size="large" center>
          <Card
            cardPadding
            contentPrefix="apps.dj.your_profile"
            headerText={cardHeader}
            contentElement={IndexProfilePartial}
            contentProps={{
              contentPrefix: 'apps.dj.your_profile',
            }}
          />
        </GridCell>
      </GridRow>
    </Section>
  );
};

IndexView.contextTypes = {
  currentTagItemName: PropTypes.string.isRequired,
};

export default IndexView;
