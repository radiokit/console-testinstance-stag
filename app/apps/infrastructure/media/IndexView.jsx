import React from 'react';
import Counterpart from 'counterpart';


import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';
import Show from '../../../widgets/admin/crud/show_widget.jsx';


import MediaInputStreamRTP from './IndexInputStreamRTPPartial.jsx';
import MediaInputStreamHTTP from './IndexInputStreamHTTPPartial.jsx';
import MediaInputFileHTTP from './IndexInputFileHTTPPartial.jsx';
import MediaInputFileRadioKitVault from './IndexInputFileRadioKitVaultPartial.jsx';
import MediaOutputStreamRTP from './IndexOutputStreamRTPPartial.jsx';
import MediaOutputStreamRadioKitDiffusor from './IndexOutputStreamRadioKitDiffusorPartial.jsx';
import MediaRoutingGroup from './IndexRoutingGroupPartial.jsx';
import MediaRoutingLink from './IndexRoutingLinkPartial.jsx';

Counterpart.registerTranslations("en", require('./IndexView.locale.en.js'));
Counterpart.registerTranslations("pl", require('./IndexView.locale.pl.js'));


const IndexView = React.createClass({

  buildTabs() {
    return {
      input_stream_rtp: {
        element: MediaInputStreamRTP,
        props: {
          contentPrefix: 'apps.infrastructure.media.index.tabs.input_stream_rtp',
        },
      },
      input_stream_http: {
        element: MediaInputStreamHTTP,
        props: {
          contentPrefix: 'apps.infrastructure.media.index.tabs.input_stream_http',
        },
      },
      input_file_http: {
        element: MediaInputFileHTTP,
        props: {
          contentPrefix: 'apps.infrastructure.media.index.tabs.input_file_http',
        },
      },
      input_file_radiokit_vault: {
        element: MediaInputFileRadioKitVault,
        props: {
          contentPrefix: 'apps.infrastructure.media.index.tabs.input_file_radiokit_vault',
        },
      },
      output_stream_rtp: {
        element: MediaOutputStreamRTP,
        props: {
          contentPrefix: 'apps.infrastructure.media.index.tabs.output_stream_rtp',
        },
      },
      output_stream_radiokit_diffusor: {
        element: MediaOutputStreamRadioKitDiffusor,
        props: {
          contentPrefix: 'apps.infrastructure.media.index.tabs.output_stream_radiokit_diffusor',
        },
      },
      routing_group: {
        element: MediaRoutingGroup,
        props: {
          contentPrefix: 'apps.infrastructure.media.index.tabs.routing_group',
        },
      },
      routing_link: {
        element: MediaRoutingLink,
        props: {
          contentPrefix: 'apps.infrastructure.media.index.tabs.routing_link',
        },
      },
    };
  },

  render() {
    return (
      <Section>
        <GridRow>
          <GridCell size="large" center={true}>
            <Card
                contentPrefix="apps.infrastructure.media.index"
                headerText="Media"
                contentElement={this.buildTabs()} />
          </GridCell>
        </GridRow>
      </Section>
    );
  },
});

export default IndexView;
