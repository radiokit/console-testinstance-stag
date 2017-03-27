import React from 'react';
import Translate from 'react-translate-component';
import Counterpart from 'counterpart';

Counterpart.registerTranslations('en', require('./UserCreateAcknowledgement.locale.en.js'));
Counterpart.registerTranslations('pl', require('./UserCreateAcknowledgement.locale.pl.js'));


const UserCreateAcknowledgement = React.createClass({
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
          {this.props.record.get('password')}
        </p>

      </div>
    );
  },
});

export default UserCreateAcknowledgement;
