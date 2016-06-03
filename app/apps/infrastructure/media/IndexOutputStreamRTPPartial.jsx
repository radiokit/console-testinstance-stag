import React from 'react';
import Counterpart from 'counterpart';
import Immutable from 'immutable';

import IndexTableBrowser from '../../../widgets/admin/crud/index_table_browser_widget.jsx';

Counterpart.registerTranslations('en', require('./IndexOutputStreamRTPPartial.locale.en.js'));
Counterpart.registerTranslations('pl', require('./IndexOutputStreamRTPPartial.locale.pl.js'));

export default React.createClass({
  modifyIndexQuery(query) {
    return query
      .order("inserted_at", "desc")
  },


  buildAttributes() {
    return {
      id:    { renderer: "string", props: { selectable: true } },
      name:  { renderer: "string" },
      level: { renderer: "peakmeter", props: { model: "Media.Output.Stream.RTP" } },
    };
  },


  buildForm() {
    return {
      name: {
        type: 'string',
      },
    };
  },


  render() {
    return (
      <IndexTableBrowser
        contentPrefix = { this.props.contentPrefix + ".table" }
        app = "plumber"
        model = "Media.Output.Stream.RTP"
        form = { this.buildForm() }
        attributes = { this.buildAttributes() }
        indexQueryFunc = { this.modifyIndexQuery } />
    );
  },
});
