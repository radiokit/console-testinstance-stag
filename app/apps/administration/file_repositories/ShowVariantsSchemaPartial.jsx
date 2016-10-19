import React from 'react';
import Counterpart from 'counterpart';

import IndexTableBrowser from '../../../widgets/admin/crud/index_table_browser_widget.jsx';

Counterpart.registerTranslations("en", require('./ShowVariantsSchemaPartial.locale.en.js'));
Counterpart.registerTranslations("pl", require('./ShowVariantsSchemaPartial.locale.pl.js'));

const ShowVariantssSchema = React.createClass({

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
      },
      key: {
        type: "string",
        hint: false,
        validators: {
          presence: true,
        },
      },
      format_kind: {
        type: "enum",
        values: ["mp3", "opus"],
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
      name:                  { renderer: "string" },
      key:                   { renderer: "string" },
      format_kind:           { renderer: "string" },
    }
  },


  render() {
    return (
      <IndexTableBrowser
        contentPrefix = { this.props.contentPrefix + ".table" }
        app = "vault"
        model = "Data.Variant.Schema"
        form = { this.buildForm() }
        attributes = { this.buildAttributes() }
        indexQueryFunc = { this.modifyIndexQuery }/>
    );
  }
});

export default ShowVariantssSchema;
