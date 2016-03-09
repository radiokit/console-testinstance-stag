import React from 'react';
import Counterpart from 'counterpart';
import Translate from 'react-translate-component';

Counterpart.registerTranslations("en", require('./table_cell_toggle.en.js'));
Counterpart.registerTranslations("pl", require('./table_cell_toggle.pl.js'));


export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    value: React.PropTypes.bool,
    attribute: React.PropTypes.string.isRequired,
    toggleFunc: React.PropTypes.func.isRequired,
  },


  onButtonClick: function(e) {
    e.preventDefault();

    this.props.toggleFunc(this.props.record, this.props.attribute, this.props.value);
  },


  render: function() {
    if(this.props.value === true) {
      return (
        <Translate content="widgets.admin.table_cell_toggle.on" component="button" className="btn btn-success" onClick={this.onButtonClick} />
      );
    } else {
      return (
        <Translate content="widgets.admin.table_cell_toggle.off" component="button" className="btn btn-default" onClick={this.onButtonClick} />
      );
    }
  }
});
