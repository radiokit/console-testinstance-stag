import React from 'react';
import Counterpart from 'counterpart';
import Immutable from 'immutable';
import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';
import ShowViewSidebarPartial from './ShowViewSidebarPartial.jsx';
import ShowViewContentPartial from './ShowViewContentPartial.jsx';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

import './ShowView.scss';

Counterpart.registerTranslations('en', require('./ShowView.locale.en.js'));
Counterpart.registerTranslations('pl', require('./ShowView.locale.pl.js'));

const ShowView = React.createClass({

  contextTypes: {
    params: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      dateRange: moment.range(moment().subtract(1, 'months'), moment()),
      checkedTargets: Immutable.Seq().toIndexedSeq(),
      checkedChannels: Immutable.Seq().toIndexedSeq(),
    };
  },

  onChannelTableRowSelect(_selectedChannelRecordIds, checkedChannels) {
    this.setState({ checkedChannels: checkedChannels || Immutable.Seq().toIndexedSeq() });
  },

  onTargetTableRowSelect(_selectedTargetRecordIds, checkedTargets) {
    this.setState({ checkedTargets: checkedTargets || Immutable.Seq().toIndexedSeq() });
  },

  onDateRangeSelect(range) {
    const dateRange = moment.range(range.startDate.clone().startOf('day'), range.endDate.clone().endOf('day'));
    if (this.state.dateRange.isSame(dateRange)) return;
    this.setState({ dateRange });
  },

  buildTabs() {
    return {
      streamPlayLength: {
        element: ShowViewContentPartial,
        props: {
          stage: 'streamPlayLength',
          checkedTargets: this.state.checkedTargets,
          checkedChannels: this.state.checkedChannels,
          dateRange: this.state.dateRange,
        },
      },
      connections: {
        element: ShowViewContentPartial,
        props: {
          stage: 'connections',
          checkedTargets: this.state.checkedTargets,
          checkedChannels: this.state.checkedChannels,
          dateRange: this.state.dateRange,
        },
      },
    };
  },

  buildSideBar() {
    return {
      sidebar: {
        element: ShowViewSidebarPartial,
        props: {
          dateRange: this.state.dateRange,
          onChannelTableRowSelect: this.onChannelTableRowSelect,
          onTargetTableRowSelect: this.onTargetTableRowSelect,
          onDateRangeSelect: this.onDateRangeSelect,
        },
      },
    };
  },

  contentPrefix: 'apps.broadcast.stats.show',

  render() {
    return (
      <Section>
        <GridRow>
          <GridCell size="large" center>
            <Card
              contentPrefix={this.contentPrefix}
              sidebarElement={this.buildSideBar()}
              contentElement={this.buildTabs()}
              sidebarColumnClasses="col-sm-5 col-md-4 col-lg-3"
              contentColumnClasses="col-sm-7 col-md-8 col-lg-9"
            />
          </GridCell>
        </GridRow>
      </Section>
    );
  },
});

export default ShowView;
