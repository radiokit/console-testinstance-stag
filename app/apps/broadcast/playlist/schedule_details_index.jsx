import React from 'react';

import ScheduleDetails from '../../../widgets/admin/schedule_details/schedule_details.jsx';
import PlaylistSidebar from './playlist_sidebar.jsx';
import PlaylistToolbar from './playlist_toolbar.jsx';

import CardSidebar from '../../../widgets/admin/card_sidebar_widget.jsx';
import CardToolBar from '../../../widgets/admin/card_tool_bar_widget.jsx';
import CardBody from '../../../widgets/admin/card_body_widget.jsx';

import RenderHelper from '../../../helpers/render_helper.js';

const ScheduleDetailsIndex = React.createClass({
  propTypes: {
    contentProps: React.PropTypes.object,
    sidebarProps: React.PropTypes.object,
    toolbarProps: React.PropTypes.object,
  },

  renderSidebarElement() {
    return RenderHelper.renderDelegatedComponent(
      PlaylistSidebar,
      this.props.sidebarProps
    );
  },

  renderContentPartial() {
    return (
      <div>
        <CardToolBar>
          {RenderHelper.renderDelegatedComponent(
            PlaylistToolbar,
            this.props.toolbarProps
          )}
        </CardToolBar>
        {RenderHelper.renderDelegatedComponent(
          ScheduleDetails,
          this.props.contentProps,
        )}
      </div>
    );
  },

  render() {
    return (
      <div>
        <PlaylistToolbar {...this.props.toolbarProps} />
        <CardBody cardPadding={true}>
          <CardSidebar>
            {this.renderSidebarElement()}
            {this.renderContentPartial()}
          </CardSidebar>
        </CardBody>
      </div>
    );
  },
});

export default ScheduleDetailsIndex;
