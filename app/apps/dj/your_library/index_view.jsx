import React, { PropTypes } from 'react';

import RadioKit from '../../../services/RadioKit';
import Loading from '../../../widgets/general/loading_widget.jsx';
import Alert from '../../../widgets/admin/alert_widget.jsx';
import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';
import DJLibraryIndexContent from './index_view_content_partial.jsx';

export default React.createClass({
  contextTypes: {
    currentTagItemId: PropTypes.string.isRequired,
    currentTagItemName: PropTypes.string.isRequired,
    currentRepositoryId: PropTypes.string.isRequired,
  },

  getInitialState() {
    return {
      record: null,
      loaded: false,
      error: false,
    };
  },

  componentDidMount() {
    this.recordQuery = this.buildShowQuery()
      .on('fetch', this.onQuerySuccess)
      .on('error', this.onQueryFailure)
      .fetch();
  },

  componentWillUnmount() {
    if (!this.state.loaded && this.recordQuery) {
      this.recordQuery.teardown();
    }
  },

  onQuerySuccess(_eventName, _record, data) {
    this.setState({
      record: data.first(),
      loaded: true,
    });
  },

  onQueryFailure() {
    this.setState({ loaded: true, error: true });
  },

  buildShowQuery() {
    return RadioKit
      .query('vault', 'Data.Record.Repository')
      .select(
        'id',
        'name',
        'metadata_schemas.id',
        'metadata_schemas.name',
        'metadata_schemas.key',
        'metadata_schemas.kind',
        'metadata_schemas.tag_category_id',
      )
      .joins('metadata_schemas')
      .where('id', 'eq', this.context.currentRepositoryId);
  },

  buildTabs() {
    return {
      incoming: {
        element: DJLibraryIndexContent,
        props: {
          stage: 'incoming',
        },
      },
      current: {
        element: DJLibraryIndexContent,
        props: {
          stage: 'current',
        },
      },
      archive: {
        element: DJLibraryIndexContent,
        props: {
          stage: 'archive',
        },
      },
      trash: {
        element: DJLibraryIndexContent,
        props: {
          stage: 'trash',
        },
      },
    };
  },

  render() {
    if (!this.state.loaded) {
      return <Loading />;
    }

    if (this.state.error) {
      return <Alert type="error" infoTextKey="general.errors.communication.general" />;
    }

    const cardHeader = `${this.state.record.get('name')} (${this.context.currentTagItemName})`;

    return (
      <Section>
        <GridRow>
          <GridCell size="large" center>
            <Card
              contentPrefix="apps.library.file_repositories.show"
              headerText={cardHeader}
              contentElement={this.buildTabs()}
              contentProps={{
                app: 'vault',
                model: 'Data.Record.Repository',
                contextPrefix: 'apps.library.file_repositories.show',
                record: this.state.record,
                tagItemId: this.context.currentTagItemId,
              }}
            />
          </GridCell>
        </GridRow>
      </Section>
    );
  },
});
