import React from 'react';
import moment from 'moment';

import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';
import Alert from '../../../widgets/admin/alert_widget.jsx';

import ScheduleDaily from '../../../widgets/admin/schedule_daily/schedule_daily_widget.jsx';
import ScheduleWeekly from '../../../widgets/admin/schedule_weekly/schedule_weekly.jsx';
import ScheduleDetails from '../../../widgets/admin/schedule_details/schedule_details.jsx';
import PlaylistSidebar from './playlist_sidebar.jsx';
import PlaylistToolbar from './playlist_toolbar.jsx';

// import Schedule from '../../../services/ScheduleDomain';
// setTimeout(() => {
//   Schedule.subscribe(d => d && console.log(JSON.stringify(d.toJS(), null, '    ')));
//   Schedule.observe('2014-05-05');
// }, 2000);

import Translate from 'react-translate-component';
import Counterpart from 'counterpart';
import localePL from './index_view_pl';
import localeEN from './index_view_en';

Counterpart.registerTranslations('en', localeEN);
Counterpart.registerTranslations('pl', localePL);

const PlayListIndex = React.createClass({
  propTypes: {
    routeParams: React.PropTypes.object,
  },

  contextTypes: {
    currentBroadcastChannel: React.PropTypes.object.isRequired,
    // availableUserAccounts: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      activeItem: null,
    };
  },

  onChangeActiveItem(item) {
    // TODO
    return item;
  },

  render() {
    const {
      date = Date.now(),
      zoom = 'daily',
    } = this.props.routeParams || {};

    if (this.state.loadingError) {
      return (<Alert type="error" fullscreen infoTextKey="general.errors.communication.general" />);
    }

    const contentProps = {
      currentBroadcastChannel: this.context.currentBroadcastChannel,
      offsetStart: moment(date).unix(),
      activeItem: this.state.activeItem,
      onChangeActiveItem: this.onChangeActiveItem,
    };

    return (
        <Section>
          <GridRow>
            <GridCell size="large" center>
              <Card
                contentPrefix="BroadcastPlaylist"
                toolbarElement={PlaylistToolbar}
                sidebarElement={PlaylistSidebar}
                contentElement={{
                  weekly: { element: ScheduleWeekly },
                  daily: { element: ScheduleDaily },
                  details: { element: ScheduleDetails },
                }}
                contentElementSelected={zoom}
                contentProps={contentProps}
              />
            </GridCell>
          </GridRow>
        </Section>
      );
  },
});

export default PlayListIndex;
