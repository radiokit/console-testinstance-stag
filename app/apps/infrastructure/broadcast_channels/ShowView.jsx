import React from 'react';
import Counterpart from 'counterpart';

import Show from '../../../widgets/admin/crud/show_widget.jsx';

import StreamsPartial from './ShowStreamsPartial.jsx';
import ContentTypesPartial from './ShowContentTypesPartial.jsx';


Counterpart.registerTranslations("en", require('./ShowView.locale.en.js'));
Counterpart.registerTranslations("pl", require('./ShowView.locale.pl.js'));


export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object.isRequired,
  },


  buildTabs: function() {
    return {
      streams: {
        element: StreamsPartial, props: { contentPrefix: "apps.infrastructure.broadcast_channels.show.tabs.body.streams" },
      },
      content_types: {
        element: ContentTypesPartial, props: { contentPrefix: "apps.infrastructure.broadcast_channels.show.tabs.body.content_types" },
      },
    }
  },


  render: function() {
    return (
      <Show contentPrefix="apps.infrastructure.broadcast_channels" app="agenda" model="Broadcast.Channel" contentElement={this.buildTabs()} />
    );
  }
});
