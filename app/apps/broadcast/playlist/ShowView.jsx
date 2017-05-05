import React, { PropTypes } from 'react';

import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';

import SidebarPartial from './ShowViewSidebarPartial.jsx';
import ContentPartial from './ShowViewContentPartial.jsx';

const ShowView = React.createClass({
  propTypes: {
    routeParams: PropTypes.object,
    history: PropTypes.object,
  },

  contextTypes: {
    currentBroadcastChannel: React.PropTypes.object.isRequired,
  },

  getOffset() {
    return this.props.routeParams.date ?
      parseInt(this.props.routeParams.date, 10) :
      Date.now();
  },

  handleOffsetStartChange(offset) {
    this.props.history.push(`/apps/broadcast/playlist/${offset}`);
  },

  buildSidebar() {
    return {
      day: {
        element: SidebarPartial,
        props: {
          offsetStart: this.getOffset(),
          onOffsetStartChange: this.handleOffsetStartChange,
        },
      },
    };
  },

  buildContent() {
    return {
      day: {
        element: ContentPartial,
        props: {
          offset: this.getOffset(),
        },
      },
    };
  },

  render() {
    return (
      <Section>
        <GridRow>
          <GridCell size="large" center>
            <Card
              contentPrefix="apps.broadcast.playlist"
              sidebarElement={this.buildSidebar()}
              contentElement={this.buildContent()}
            />
          </GridCell>
        </GridRow>
      </Section>
    );
  },
});

export default ShowView;
