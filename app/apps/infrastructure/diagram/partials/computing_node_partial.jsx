import React from 'react';

export default React.createClass({
  propTypes: {
    computingNode: React.PropTypes.object.isRequired,
  },


  render: function() {
    return (
      <div className="computing-node">
        <b>{this.props.computingNode.get("hostname")}</b>
      </div>
    );
  }
});
