import React from 'react';
import Counterpart from 'counterpart';
import { Data } from 'radiokit-api';
import IndexTableBrowser from '../../../widgets/admin/crud/index_table_browser_widget.jsx';

Counterpart.registerTranslations("en", require('./ShowStreamsPartial.locale.en.js'));
Counterpart.registerTranslations("pl", require('./ShowStreamsPartial.locale.pl.js'));


export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired,
  },


  modifyIndexQuery(query) {
    return query
      .where("broadcast_channel_id", "eq", this.props.record.get("id"))
      .order("name", "asc")
  },


  buildForm: function() {
    return {
      name: {
        type: "string",
        hint: true,
      },
      audio_codec: {
        type: "enum",
        values: ["mp3"],
        validators: {
          presence: true,
        }
      },
      audio_quality: {
        type: "enum",
        values: ["medium"],
        validators: {
          presence: true,
        }
      },
      protocol: {
        type: "enum",
        values: ["http"],
        validators: {
          presence: true,
        }
      },
      broadcast_channel_id: {
        type: "hidden",
        value: this.props.record.get("id"),
      }
    }
  },


  buildAttributes: function() {
    return {
      name:          { renderer: "string" },
      audio_codec:   { renderer: "string" },
      audio_quality: { renderer: "string" },
      protocol:      { renderer: "string" },
      public_urls:   { renderer: "string" },
    }
  },


  render: function() {
    return (
      <IndexTableBrowser
        contentPrefix={this.props.contentPrefix + ".table"}
        app="agenda"
        model="Broadcast.Stream"
        form={this.buildForm()}
        attributes={this.buildAttributes()}
        indexQueryFunc={this.modifyIndexQuery}
        readEnabled={false} />
    );
  }
});
