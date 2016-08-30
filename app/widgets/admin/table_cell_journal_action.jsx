import React from 'react';
import Counterpart from 'counterpart';
import Translate from 'react-translate-component';

Counterpart.registerTranslations("en", require('./table_cell_journal_action.locale.en.js'));

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
        content={`widget.admin.table_cell_journal_action.${this.props.value}`}
      />
    );
  }
});
