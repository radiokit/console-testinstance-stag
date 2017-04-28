import React from 'react';
import Counterpart from 'counterpart';
import Translate from 'react-translate-component';

Counterpart.registerTranslations("en", require('./ShowSchedulerLogEntriesTableCellEvent.locale.en.js'));
Counterpart.registerTranslations("pl", require('./ShowSchedulerLogEntriesTableCellEvent.locale.pl.js'));


export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    value: React.PropTypes.string,
    attribute: React.PropTypes.string.isRequired,
  },


  render: function() {
    let style;
    if(this.props.value.indexOf('failed') !== -1) {
      style = { color: '#aa0000' };
    } else {
      style = {};
    }

    return (
      <Translate 
        component="span" 
        content={`apps.administration.broadcast_channels.show.tabs.body.scheduler_log_entries.table.index.table.event.${this.props.value}`}
        style={style} />
    );
  }
});
