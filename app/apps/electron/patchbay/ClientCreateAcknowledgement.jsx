import React from 'react';
import Translate from 'react-translate-component';
import Counterpart from 'counterpart';

Counterpart.registerTranslations('en', require('./ClientCreateAcknowledgement.locale.en.js'));
Counterpart.registerTranslations('pl', require('./ClientCreateAcknowledgement.locale.pl.js'));


const ClientCreateAcknowledgement = React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired,
  },


  render() {
    return (
      <div>
        <div>
          <Translate
            component="p"
            className="text-center"
            content={`${this.props.contentPrefix}.acknowledgement.instructions.header`}
          />
        </div>

        <p className="text-xxxl text-center selectable">
          {this.props.record.get('authorization_code')}
        </p>

      </div>
    );
  },
});

export default ClientCreateAcknowledgement;
