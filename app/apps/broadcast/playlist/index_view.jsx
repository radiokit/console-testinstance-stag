import React from 'react';

import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';
import Alert from '../../../widgets/admin/alert_widget.jsx';

import ScheduleDomain from '../../../services/ScheduleDomain';

import ScheduleDailyIndex from './schedule_daily_index.jsx';
import ScheduleDetailsIndex from './schedule_details_index.jsx';

// import Translate from 'react-translate-component';
import Counterpart from 'counterpart';
import localePL from './index_view_pl';
import localeEN from './index_view_en';

Counterpart.registerTranslations('en', localeEN);
Counterpart.registerTranslations('pl', localePL);

const BroadcastPlaylist = React.createClass({
  propTypes: {
    routeParams: React.PropTypes.object,
    history: React.PropTypes.object,
  },

  contextTypes: {
    data: React.PropTypes.object.isRequired,
    currentBroadcastChannel: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      activeItem: null,
    };
  },

  getOffset() {
    return this.props.routeParams.date
      ? parseInt(this.props.routeParams.date, 10)
      : Date.now()
    ;
  },

  getZoom() {
    return this.props.routeParams.zoom
      ? this.props.routeParams.zoom
      : 'daily'
    ;
  },

  handleChangeActiveItem(activeItem) {
    this.setState({ activeItem });
  },

  changeView({ offset, zoom }) {
    this.props.history.push(`/apps/broadcast/playlist/${
      offset || this.getOffset()
    }/${
      zoom || this.getZoom()
    }`);
  },

  handleOffsetStartChange(offset) {
    this.changeView({ offset });
  },

  handleZoomChange(zoom) {
    this.changeView({ zoom });
  },

  handleCRUD() {
    ScheduleDomain.clear();
  },

  render() {
    const date = this.getOffset();
    const zoom = this.getZoom();

    if (this.state.loadingError) {
      return (<Alert type="error" fullscreen infoTextKey="general.errors.communication.general" />);
    }

    const childProps = {
      data: this.context.data,
      currentBroadcastChannel: this.context.currentBroadcastChannel,

      offsetStart: parseInt(date, 10),
      activeItem: this.state.activeItem,

      onOffsetStartChange: this.handleOffsetStartChange,
      onZoomChange: this.handleZoomChange,
      onActiveItemChange: this.handleChangeActiveItem,

      onCRUD: this.handleCRUD,
    };

    return (
        <Section>
          <GridRow>
            <GridCell size="large" center>
              <Card
                contentPrefix="BroadcastPlaylist"
                contentElement={{
                  daily: { element: ScheduleDailyIndex },
                  details: { element: ScheduleDetailsIndex },
                }}
                contentElementSelected={zoom}
                onContentElementSelect={this.handleZoomChange}
                contentProps={{
                  contentProps: childProps,
                  sidebarProps: childProps,
                  toolbarProps: childProps,
                }}
              />
            </GridCell>
          </GridRow>
        </Section>
      );
  },
});

export default BroadcastPlaylist;
