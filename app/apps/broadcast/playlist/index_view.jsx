import React from 'react';
import Immutable from 'immutable';
import Moment from 'moment';
import Translate from 'react-translate-component';

import { Data } from 'radiokit-api';
import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';
import CardBody from '../../../widgets/admin/card_body_widget.jsx';
import CardHeader from '../../../widgets/admin/card_header_widget.jsx';
import CardSidebar from '../../../widgets/admin/card_sidebar_widget.jsx';
import Alert from '../../../widgets/admin/alert_widget.jsx';
import ScheduleDaily from '../../../widgets/admin/schedule_daily_widget.jsx';
import ScheduleDaySelector from '../../../widgets/admin/schedule_day_selector_widget.jsx';
import ScheduleDayCrudButtons from '../../../widgets/admin/schedule_day_crud_buttons.jsx';
import ToolbarButtonModal from '../../../widgets/admin/toolbar_button_modal_widget.jsx';

export default React.createClass({
  contextTypes: {
    currentBroadcastChannel: React.PropTypes.object.isRequired,
    availableUserAccounts: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
  },


  getInitialState: function() {
    return {
      loadedFiles: false,
      availableFiles: new Immutable.Seq().toIndexedSeq(),
      now: Moment.utc(),
      activeItem: null
    }
  },


  componentDidMount: function() {
    this.fetchPlumberFiles();
  },

  fetchPlumberFiles: function() {
    this.context.data
      .query("plumber", "Media.Input.File.Http")
      .select("id", "start_at", "stop_at")
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({
            loadingError: true
          })
        }
      }).on("fetch", (_event, _query, data) => {
        if(this.isMounted()) {
          if(data.count() !== 0) {
            this.setState({
              loadedFiles: true,
              availableFiles: this.getItems(data).toList()
            });
          } else {
            this.setState({
              loadedListOfFiles: true,
              availableFiles: new Immutable.Seq().toIndexedSeq()
            });
          }
        }
      }).fetch();
  },

  onNowChange: function(newNow) {
    this.setState({
      now: newNow,
    });
  },

  onChangeActiveItem(item) {
    this.setState({activeItem: item});
  },

  getItems: function(data) {
    return data.map(entry => {
      return Immutable.Map()
        .set("id", entry.get("id"))
        .set("start_at", Moment.utc(entry.get("start_at")))
        .set("stop_at", Moment.utc(entry.get("stop_at")))
    });
  },

  afterFormSubmit: function() {
    this.fetchPlumberFiles();
    this.onChangeActiveItem(null);
  },

  render: function() {

    if(this.state.loadingError) {
      return (<Alert type="error" fullscreen={true} infoTextKey="general.errors.communication.general" />);

    } else {
      return (
        <Section>
          <GridRow>
            <GridCell size="large" center={true}>
              <Card
                  contentPrefix="apps.broadcast.playlist"
                  toolbarElement={ScheduleDayCrudButtons}
                  toolbarProps={{
                    availablePlumberFiles: this.state.availableFiles,
                    afterFormSubmit: this.afterFormSubmit,
                    activeItem: this.state.activeItem
                  }}
                  sidebarElement={ScheduleDaySelector}
                  sidebarProps={{
                    now: this.state.now,
                    onChange: this.onNowChange
                  }}
                  contentElement={ScheduleDaily}
                  contentProps={{
                    now: this.state.now,
                    items: this.state.availableFiles,
                    activeItem: this.state.activeItem,
                    onChangeActiveItem: this.onChangeActiveItem
                  }} />
            </GridCell>
          </GridRow>
        </Section> )
    }
  }
});
