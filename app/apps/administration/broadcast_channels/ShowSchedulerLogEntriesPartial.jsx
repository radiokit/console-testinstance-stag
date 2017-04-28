import React from 'react';
import Counterpart from 'counterpart';
import { Data } from 'radiokit-api';
import IndexTableBrowser from '../../../widgets/admin/crud/index_table_browser_widget.jsx';

import ShowSchedulerLogEntriesTableCellEvent from './ShowSchedulerLogEntriesTableCellEvent.jsx';

Counterpart.registerTranslations("en", require('./ShowSchedulerLogEntriesPartial.locale.en.js'));
Counterpart.registerTranslations("pl", require('./ShowSchedulerLogEntriesPartial.locale.pl.js'));


export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired,
  },


  modifyIndexQuery(query) {
    return query
      .where("channel_id", "eq", this.props.record.get("id"))
      .order("inserted_at", "desc");
  },


  buildAttributes: function() {
    return {
      inserted_at:     { renderer: "datetime", props: { format: "YYYY-MM-DD HH:mm:ss.SSS" } },
      event:           { renderer: ShowSchedulerLogEntriesTableCellEvent, cellClassName: 'scheduler-log-entries-event' },
      metadata:        { renderer: "string" },
    }
  },


  render: function() {
    return (
      <IndexTableBrowser
        contentPrefix={this.props.contentPrefix + ".table"}
        app="agenda"
        model="Broadcast.Scheduler.Log.Entry"
        attributes={this.buildAttributes()}
        indexQueryFunc={this.modifyIndexQuery}
        readEnabled={false}
        createEnabled={false}
        deleteEnabled={false} />
    );
  }
});
