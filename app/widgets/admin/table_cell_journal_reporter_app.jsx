import React from 'react';
import Translate from 'react-translate-component';

export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    value: React.PropTypes.number,
    attribute: React.PropTypes.string.isRequired
  },


  render: function() {
    return (
      <Translate
        component="span"
        content={`journal-reporter-app.${this.props.value}`}
      />
    );
  }
});
