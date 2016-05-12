import React from 'react';
import Translate from 'react-translate-component';
import Counterpart from 'counterpart';

Counterpart.registerTranslations("en", require('./ShowExportsSchemaCreateAcknowledgement.locale.en.js'));
Counterpart.registerTranslations("pl", require('./ShowExportsSchemaCreateAcknowledgement.locale.pl.js'));


export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired,
  },


  render: function() {
    return (
      <div>
        <div>
          <Translate component="p" className="text-center" content={`${this.props.contentPrefix}.acknowledgement.instructions.mixcloud.intro`} />
        </div>

        <div className="row style-accent">
          <div className="col-md-12 text-center">
            <div className="btn-group btn-group-justified small-padding" role="group">
              <a className="btn btn-default-bright" href={`${window.data.options.apps.vault.baseUrl}/api/connector/v1.0/mixcloud/ask?data_export_schema_id=${encodeURIComponent(this.props.record.get("id"))}`}>
                <Translate component="span" content={`${this.props.contentPrefix}.acknowledgement.instructions.mixcloud.action_open`} />
              </a>
            </div>
          </div>
        </div>
      </div>

    );
  }
});
