import React from 'react';
import Counterpart from 'counterpart';

import Show from '../../../widgets/admin/crud/show_widget.jsx';

import MixSourcesPartial from './ShowMixSourcesPartial.jsx';


Counterpart.registerTranslations("en", require('./ShowView.locale.en.js'));
Counterpart.registerTranslations("pl", require('./ShowView.locale.pl.js'));


export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object.isRequired,
  },


  buildTabs: function() {
    return {
      mix_sources: {
        element: MixSourcesPartial, props: { contentPrefix: "apps.infrastructure.broadcast_channels.show.tabs.body.mix_sources" },
      },
    }
  },


  render: function() {
    return (
      <Show contentPrefix="apps.infrastructure.broadcast_channels" app="agenda" model="Broadcast.Channel" contentElement={this.buildTabs()} />
    );
  }
});
