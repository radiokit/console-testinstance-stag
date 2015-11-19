import React from 'react';

export default React.createClass({
  render: function() {
    return (<div className="btn-toolbar margin-bottom-xl">{this.props.children}</div>);
  }
});
