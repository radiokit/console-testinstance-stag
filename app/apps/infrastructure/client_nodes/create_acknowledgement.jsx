import React from 'react';

export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
  },


  render: function() {
    return (
      <div>OK: {this.props.record.get("pairing_key")}</div>
    );

    // FIXME LOCALES
  }
});
