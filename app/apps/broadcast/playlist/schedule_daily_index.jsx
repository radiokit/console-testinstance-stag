import React from 'react';

import ScheduleDaily from '../../../widgets/admin/schedule_daily/schedule_daily_widget.jsx';
import PlaylistSidebar from './playlist_sidebar.jsx';
import PlaylistToolbar from './playlist_toolbar.jsx';

import CardSidebar from '../../../widgets/admin/card_sidebar_widget.jsx';
import CardToolBar from '../../../widgets/admin/card_tool_bar_widget.jsx';
import CardBody from '../../../widgets/admin/card_body_widget.jsx';

import RenderHelper from '../../../helpers/render_helper.js';

const ScheduleDailyIndex = React.createClass({
  propTypes: {
    contentProps: React.PropTypes.object,
    sidebarProps: React.PropTypes.object,
    toolbarProps: React.PropTypes.object,
  },

  render() {
    return (
      <div>
        <PlaylistToolbar {...this.props.toolbarProps} />
        <CardBody cardPadding={true}>
          <CardSidebar>
            <PlaylistSidebar {...this.props.sidebarProps} />
            <div>
              <CardToolBar>
                <PlaylistToolbar {...this.props.toolbarProps} />
              </CardToolBar>
              <ScheduleDaily {...this.props.contentProps} />
            </div>
          </CardSidebar>
        </CardBody>
      </div>
    );
  },
});

export default ScheduleDailyIndex;
