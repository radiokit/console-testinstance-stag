import React from 'react';

import ClientNode from './client_node_partial.jsx';

export default React.createClass({
  propTypes: {
    records: React.PropTypes.object,
  },


  render: function() {
    return (
      <div>
        {this.props.records.map((clientNode) => {
          return <ClientNode key={clientNode.get("id")} clientNode={clientNode} />;
        })}
      </div>
    );
  }
});
