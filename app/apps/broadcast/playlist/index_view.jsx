import React from 'react';
import moment from 'moment';
import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';
import Alert from '../../../widgets/admin/alert_widget.jsx';
import ScheduleDaily from '../../../widgets/admin/schedule_daily/schedule_daily_widget.jsx';

import Schedule from '../../../services/ScheduleDomain';
setTimeout(() => {
  Schedule.subscribe(d => d && console.log(JSON.stringify(d.toJS(), null, '    ')));
  Schedule.observe('2014-05-05');
}, 2000);

const PlayListIndex = React.createClass({
  propTypes: {
    routeParams: React.PropTypes.object,
  },

  contextTypes: {
    currentBroadcastChannel: React.PropTypes.object.isRequired,
    availableUserAccounts: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      activeItem: null,
    };
  },

  render() {
    debugger;

    const {
      date = Date.now(),
      zoom = 'daily',
    } = this.props.routeParams || {};

    const Display = ({
      daily: ScheduleDaily,
    })[zoom];

    if (this.state.loadingError) {
      return (<Alert type="error" fullscreen infoTextKey="general.errors.communication.general" />);
    }

    return (
        <Section>
          <GridRow>
            <GridCell size="large" center>
              <Card
                contentPrefix="apps.broadcast.playlist"
                contentElement={Display}
                contentProps={{
                  currentBroadcastChannel: this.context.currentBroadcastChannel,
                  availableUserAccounts: this.context.availableUserAccounts,
                  offsetStart: moment(date).unix(),
                  activeItem: this.state.activeItem,
                  onChangeActiveItem: this.onChangeActiveItem,
                }}
              />
            </GridCell>
          </GridRow>
        </Section>
      );
  },
});

export default PlayListIndex;
