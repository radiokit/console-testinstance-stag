import React from 'react';

import ComputingNode from './computing_node_partial.jsx';

export default React.createClass({
  propTypes: {
    records: React.PropTypes.object,
  },


  render: function() {
    return (
      <div>
        {this.props.records.map((computingNode) => {
          return <ComputingNode key={computingNode.get("id")} computingNode={computingNode} />;
        })}
      </div>
    );
  }
});
