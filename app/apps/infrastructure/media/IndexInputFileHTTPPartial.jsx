import React from 'react';
import Counterpart from 'counterpart';
import Immutable from 'immutable';

import IndexTableBrowser from '../../../widgets/admin/crud/index_table_browser_widget.jsx';

Counterpart.registerTranslations('en', require('./IndexInputFileHTTPPartial.locale.en.js'));
Counterpart.registerTranslations('pl', require('./IndexInputFileHTTPPartial.locale.pl.js'));

export default React.createClass({
  modifyIndexQuery(query) {
    return query
      .order("inserted_at", "desc")
  },


  buildAttributes() {
    return {
      id:          { renderer: "string", props: { selectable: true } },
      name:        { renderer: "string" },
      location:    { renderer: "string" },
      level:       { renderer: "peakmeter", props: { model: "Media.Input.File.HTTP" } },
      start_at:    { renderer: "string" },
      stop_at:     { renderer: "string" },
      cue_in_at:   { renderer: "string" },
      cue_out_at:  { renderer: "string" },
      inserted_at: { renderer: "string" },
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
        validators: {
          presence: true,
        }
      },
      stop_at: {
        type: 'datetime',
        validators: {
          presence: true,
        }
      },
      cue_in_at: {
        type: 'datetime',
        validators: {
          presence: true,
        }
      },
      cue_out_at: {
        type: 'datetime',
        validators: {
          presence: true,
        }
      },
    };
  },


  render() {
    return (
      <IndexTableBrowser
        contentPrefix = { this.props.contentPrefix + ".table" }
        app = "plumber"
        model = "Media.Input.File.HTTP"
        form = { this.buildForm() }
        attributes = { this.buildAttributes() }
        indexQueryFunc = { this.modifyIndexQuery } />
    );
  },
});
