import React from 'react';

import Show from '../../../widgets/admin/crud/show_widget.jsx';

import AudioInterfacePartial from './show_audio_interface_partial.jsx';


export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object.isRequired,
  },


  buildTabs: function() {
    return {
      audio_interface: {
        element: AudioInterfacePartial, props: { contentPrefix: "apps.electron.devices.show.tabs.body.audio_interface" },
      },
    }
  },


  render: function() {
    return (
      <Show contentPrefix="apps.electron.devices" app="auth" model="Client.Standalone" contentElement={this.buildTabs()} />
    );
  }
});
