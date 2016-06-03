import React from 'react';
import Counterpart from 'counterpart';
import Immutable from 'immutable';

import IndexTableBrowser from '../../../widgets/admin/crud/index_table_browser_widget.jsx';

Counterpart.registerTranslations('en', require('./IndexRoutingLinkPartial.locale.en.js'));
Counterpart.registerTranslations('pl', require('./IndexRoutingLinkPartial.locale.pl.js'));

export default React.createClass({
  modifyIndexQuery(query) {
    return query
      .order("inserted_at", "desc")
  },


  buildAttributes() {
    return {
      id:    { renderer: "string", props: { selectable: true } },
      name:  { renderer: "string" },
      input_stream_rtp_id: { renderer: "string", props: { selectable: true } },
      input_stream_http_id: { renderer: "string", props: { selectable: true } },
      input_file_http_id: { renderer: "string", props: { selectable: true } },
      input_file_radiokit_vault_id: { renderer: "string", props: { selectable: true } },
      output_stream_rtp_id: { renderer: "string", props: { selectable: true } },
      output_stream_radiokit_diffusor_id: { renderer: "string", props: { selectable: true } },
      routing_group_id: { renderer: "string", props: { selectable: true } },
      routing_link_id: { renderer: "string", props: { selectable: true } },
    };
  },


  buildForm() {
    return {
      name: {
        type: 'string',
      },
      input_stream_rtp_id: {
        type: 'string',
      },
      input_stream_http_id: {
        type: 'string',
      },
      input_file_http_id: {
        type: 'string',
      },
      input_file_radiokit_vault_id: {
        type: 'string',
      },
      output_stream_rtp_id: {
        type: 'string',
      },
      output_stream_radiokit_diffusor_id: {
        type: 'string',
      },
      routing_group_id: {
        type: 'string',
      },
      routing_link_id: {
        type: 'string',
      },

    };
  },


  render() {
    return (
      <IndexTableBrowser
        contentPrefix = { this.props.contentPrefix + ".table" }
        app = "plumber"
        model = "Media.Routing.Link"
        form = { this.buildForm() }
        attributes = { this.buildAttributes() }
        indexQueryFunc = { this.modifyIndexQuery } />
    );
  },
});
