import React from 'react';
import Counterpart from 'counterpart';

import IndexTableBrowser from '../../../widgets/admin/crud/index_table_browser_widget.jsx';

Counterpart.registerTranslations("en", require('./ShowImportsSchemaPartial.locale.en.js'));
Counterpart.registerTranslations("pl", require('./ShowImportsSchemaPartial.locale.pl.js'));

const ShowImportsSchema = React.createClass({

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
      kind: {
        type: "enum",
        values: ["json"],
        hint: false,
        validators: {
          presence: true,
        },
      },
      json_endpoint: {
        type: "string",
        validators: {
          presence: true,
        },
        fieldValueFunc: (params, value) => {
          let newParams = params;
          newParams.connector_settings = { endpoint: value };
          return newParams;
        }
      },
      record_repository_id: {
        type: "hidden",
        value: this.props.record.get("id"),
      }
    }
  },

  buildAttributes() {
    return {
      name:                  { renderer: "string" },
      kind:                  { renderer: "string" },
      connector_settings:    { renderer: "string" },
    }
  },


  render() {
    return (
      <IndexTableBrowser
        contentPrefix = { this.props.contentPrefix + ".table" }
        app = "vault"
        model = "Data.Import.Schema"
        form = { this.buildForm() }
        attributes = { this.buildAttributes() }
        indexQueryFunc = { this.modifyIndexQuery }/>
    );
  }
});

export default ShowImportsSchema;
