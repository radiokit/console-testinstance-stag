import React from 'react';
import Counterpart from 'counterpart';

import Show from '../../../widgets/admin/crud/show_widget.jsx';

import EventsPartial from './ShowEventsPartial.jsx';


Counterpart.registerTranslations('en', require('./ShowView.locale.en.js'));
Counterpart.registerTranslations('pl', require('./ShowView.locale.pl.js'));


export default React.createClass({
  buildTabs() {
    return {
      events: {
        element: EventsPartial, props: {
          contentPrefix: 'apps.almanac.resources.show.tabs.body.events' },
      },
    };
  },


  render() {
    return (
      <Show
        contentPrefix="apps.almanac.resources"
        app="agenda"
        model="Reservation.Resource"
        contentElement={this.buildTabs()}
      />
    );
  },
});
