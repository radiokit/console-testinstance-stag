import React from 'react';
import Immutable from 'immutable';
import Moment from 'moment';
import Translate from 'react-translate-component';

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

export default React.createClass({
  contextTypes: {
    currentBroadcastChannel: React.PropTypes.object.isRequired,
  },


  getInitialState: function() {
    return {
      loadedFiles: false,
      availableFiles: new Immutable.Seq().toIndexedSeq(),
      now: Moment.utc(),
    }
  },


  componentDidMount: function() {
    window.data
      .query("plumber", "Media.Input.File.Http")
      .select("id", "start_at", "stop_at")
      .where("references","deq", "broadcast_channel_id", this.context.currentBroadcastChannel.get("id"))
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({
            loadingError: true
          })
        }
      }).on("fetch", (_event, _query, data) => {
        if(this.isMounted()) {
          if(data.count() != 0) {
            this.setState({
              loadedFiles: true,
              availableFiles: data
            });
          } else {
            this.setState({
              laodedListOfFiles: true,
            })
          }
        }
      }).fetch();
  },


  onNowChange: function(newNow) {
    this.setState({
      now: newNow,
    });
  },


  render: function() {
    let items = Immutable.fromJS([
      {id: "1234", start_at: Moment.utc().clone().subtract(5, "minutes"), stop_at: Moment.utc().clone().add(5, "minutes")},
      {id: "4556", start_at: Moment.utc().clone().add(60, "minutes"), stop_at: Moment.utc().clone().add(145, "minutes")},
      {id: "7890", start_at: Moment.utc().clone().add(200, "minutes"), stop_at: Moment.utc().clone().add(400, "minutes")},
    ]);

    if(this.state.loadingError) {
      return (<Alert type="error" fullscreen={true} infoTextKey="general.errors.communication.general" />);

    } else {
      return (
        <Section>
          <GridRow>
            <GridCell size="large" center={true}>
              <Card contentPrefix="apps.broadcast.playlist" contentElement={ScheduleDaily} contentProps={{now: this.state.now, items: items}} />
            </GridCell>
          </GridRow>
        </Section> )
    }
  }
});
