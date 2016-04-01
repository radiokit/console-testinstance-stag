import React from 'react';

import IndexTableBrowser from '../../../widgets/admin/crud/index_table_browser_widget.jsx';

const ShowMetadataSchema = React.createClass({

  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired,
  },

  modifyIndexQuery(query) {
    return query
      .where("record_repository_id", "eq", this.props.record.get("id"))
      .order("name", "asc")
  },

  buildForm() {
    return {
      name: {
        type: "string",
        hint: true,
        validators: {
          presence: true,
        }
      },
      key: {
        type: "string",
        hint: true,
        validators: {
          presence: true,
        }
      },
      kind: {
        type: "enum",
        values: ["string", "db", "integer", "text", "float", "date", "time", "datetime", "url", "duration"],
        hint: false,
        validators: {
          presence: true,
        },
      },
      record_repository_id: {
        type: "hidden",
        value: this.props.record.get("id"),
      }
    }
  },

  buildAttributes() {
    return {
      name:     { renderer: "string" },
      key:      { renderer: "string" },
      kind:     { renderer: "string" },
    }
  },

  render() {
    return (
      <IndexTableBrowser
        contentPrefix = { this.props.contentPrefix + ".table" }
        app = "vault"
        model = "Data.Metadata.Schema"
        form = { this.buildForm() }
        attributes = { this.buildAttributes() }
        indexQueryFunc = { this.modifyIndexQuery }/>
    );
  }
});

export default ShowMetadataSchema;
