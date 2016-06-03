import React from 'react';
import Counterpart from 'counterpart';
import Immutable from 'immutable';

import IndexTableBrowser from '../../../widgets/admin/crud/index_table_browser_widget.jsx';

Counterpart.registerTranslations('en', require('./IndexInputStreamHTTPPartial.locale.en.js'));
Counterpart.registerTranslations('pl', require('./IndexInputStreamHTTPPartial.locale.pl.js'));

export default React.createClass({
  modifyIndexQuery(query) {
    return query
      .order("inserted_at", "desc")
  },


  buildAttributes() {
    return {
      id:        { renderer: "string", props: { selectable: true } },
      name:      { renderer: "string" },
      location:  { renderer: "string" },
      level:     { renderer: "peakmeter", props: { model: "Media.Input.Stream.HTTP" } },
    };
  },


  buildForm() {
    return {
      name: {
        type: 'string',
      },
      location: {
        type: 'string',
        validators: {
          presence: true,
        }
      },
      start_at: {
        type: 'datetime',
      },
      stop_at: {
        type: 'datetime',
      },
    };
  },


  render() {
    return (
      <IndexTableBrowser
        contentPrefix = { this.props.contentPrefix + ".table" }
        app = "plumber"
        model = "Media.Input.Stream.HTTP"
        form = { this.buildForm() }
        attributes = { this.buildAttributes() }
        indexQueryFunc = { this.modifyIndexQuery } />
    );
  },
});
