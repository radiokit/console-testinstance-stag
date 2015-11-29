import React from 'react';


export default React.createClass({
  propTypes: {
    clientNode: React.PropTypes.object.isRequired,
  },


  render: function() {
    return (
      <div className="client-node">
        <b>{this.props.clientNode.get("name")}</b>
      </div>
    );
  }
});
