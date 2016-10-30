import React from 'react';
import Counterpart from 'counterpart';

import IndexTableBrowser from '../../../widgets/admin/crud/index_table_browser_widget.jsx';

Counterpart.registerTranslations("en", require('./ShowAffiliatesSchemaPartial.locale.en.js'));
Counterpart.registerTranslations("pl", require('./ShowAffiliatesSchemaPartial.locale.pl.js'));

const ShowAffiliatessSchema = React.createClass({

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
      kind: {
        type: "enum",
        values: ["itunes"],
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
      kind:                  { renderer: "string" },
    }
  },


  render() {
    return (
      <IndexTableBrowser
        contentPrefix = { this.props.contentPrefix + ".table" }
        app = "vault"
        model = "Data.Affiliate.Schema"
        form = { this.buildForm() }
        attributes = { this.buildAttributes() }
        indexQueryFunc = { this.modifyIndexQuery }/>
    );
  }
});

export default ShowAffiliatessSchema;
