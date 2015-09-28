import React from 'react';

import AdminLayout from '../../layouts/admin_layout.jsx';
import ChannelSelector from '../../widgets/broadcast/channel_selector_widget.jsx';
import Section from '../../widgets/admin/section_widget.jsx';

export default React.createClass({
  componentDidMount: function() {
    console.log(this);
    window.x = this;
    // this.props.data
    //   .query("plumber", "Media.Input.Stream.RTP")
    //   .select("id", "references", "jitter_buffer_duration", "read_buffer_duration")
    //   .fetch();
  },


  propTypes: {
    data: React.PropTypes.object.isRequired
  },


  render: function() {
    return (
      <Section>
        <ChannelSelector {...this.props} nextRoute="/joint/broadcast_channels/:broadcast_channel_id" />
      </Section>
      );
  }
});