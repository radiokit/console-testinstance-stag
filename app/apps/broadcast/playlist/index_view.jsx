import React from 'react';
import Immutable from 'immutable';

import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';
import CardBody from '../../../widgets/admin/card_body_widget.jsx';
import CardHeader from '../../../widgets/admin/card_header_widget.jsx';
import Alert from '../../../widgets/admin/alert_widget.jsx';

export default React.createClass({
  contextTypes: {
    currentBroadcastChannel: React.PropTypes.object.isRequired,
  },


  getInitialState: function() {
    return {
      loadedFiles: false,
      availableFiles: new Immutable.Seq().toIndexedSeq(),
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

  render: function() {
    if(this.state.loadingError) {
      return (<Alert type="error" fullscreen={true} infoTextKey="general.errors.communication.general" />);

    } else {
      return (
        <Section>
          <GridRow>
            <GridCell size="small" center={true}>
              <Card contentPrefix="apps.broadcast.playlist" cardPadding={false}>
                <CardHeader/>
                <CardBody>
                  <ul className="list divider-full-bleed">
                    {this.state.availableFiles.map((item) => {
                      return (
                        <li key={item.get("id")} className="tile">
                          <div className="tile-text">
                            {item.get("id")}
                            {item.get("start_at")}
                            {item.get("stop_at")}
                          </div>
                        </li>
                      )
                    })}
                  </ul>

                </CardBody>
              </Card>
            </GridCell>
          </GridRow>
        </Section> )
    }
  }
});
