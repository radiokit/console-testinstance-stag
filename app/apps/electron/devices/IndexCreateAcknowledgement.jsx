import React from 'react';
import Translate from 'react-translate-component';
import Counterpart from 'counterpart';

Counterpart.registerTranslations("en", require('./IndexCreateAcknowledgement.locale.en.js'));
Counterpart.registerTranslations("pl", require('./IndexCreateAcknowledgement.locale.pl.js'));


export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired,
  },


  render: function() {
    return (
      <div>
        <div>
          <Translate component="p" className="text-center" content={`${this.props.contentPrefix}.acknowledgement.instructions.header`} />
        </div>

        <p className="text-xxxl text-center selectable">{this.props.record.get("authorization_code")}</p>

        <div>
          <Translate component="p" className="text-center" content={`${this.props.contentPrefix}.acknowledgement.instructions.os`} />

          <div className="row style-accent">
            <div className="col-md-6 text-center">
              <Translate component="h2" content={`${this.props.contentPrefix}.acknowledgement.instructions.android.header`} />
              <Translate component="p" content={`${this.props.contentPrefix}.acknowledgement.instructions.android.instructions`} />
              <div className="btn-group btn-group-justified small-padding" role="group">
                <a className="btn btn-default-bright" href="https://play.google.com/store/apps/details?id=org.radiokit.electron">
                  <Translate component="span" content={`${this.props.contentPrefix}.acknowledgement.instructions.android.action_open`} />
                </a>
              </div>
            </div>

            <div className="col-md-6 text-center">
              <Translate component="h2" content={`${this.props.contentPrefix}.acknowledgement.instructions.windows.header`} />
              <Translate component="p" content={`${this.props.contentPrefix}.acknowledgement.instructions.windows.instructions`} />
              <div className="btn-group btn-group-justified small-padding" role="group">
                <a className="btn btn-default-bright" href="https://packages.radiokit.org/packages/windows/radiokit-electron/stable/RadioKit%20Electron%201.0.1%2032bit%20Setup.exe">
                  <Translate component="span" content={`${this.props.contentPrefix}.acknowledgement.instructions.windows.action_open_32bit`} />
                </a>
                <a className="btn btn-default-bright" href="https://packages.radiokit.org/packages/windows/radiokit-electron/stable/RadioKit%20Electron%201.0.1%2064bit%20Setup.exe">
                  <Translate component="span" content={`${this.props.contentPrefix}.acknowledgement.instructions.windows.action_open_64bit`} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
