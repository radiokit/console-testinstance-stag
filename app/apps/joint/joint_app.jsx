import React from 'react';

import AdminLayout from '../../layouts/admin_layout.jsx';
import ChannelSelector from '../../widgets/broadcast/channel_selector_widget.jsx';
import Section from '../../widgets/admin/section_widget.jsx';

export default React.createClass({
  getInitialState: function() {
    return { currentBroadcastChannel: null };
  },


  componentDidMount: function() {
    // this.props.data
    //   .query("plumber", "Media.Input.Stream.RTP")
    //   .select("id", "references", "jitter_buffer_duration", "read_buffer_duration")
    //   .fetch();
  },


  render: function() {
    if(this.state.currentBroadcastChannel == null) {
      return (
        <AdminLayout {...this.props}>
          <Section>
            <ChannelSelector {...this.props}/>
          </Section>
        </AdminLayout>);

    } else {

    }
  }
});