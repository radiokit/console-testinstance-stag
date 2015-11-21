import React from 'react';

import Scope from '../widgets/admin/scope_widget.jsx';

export default React.createClass({
  render: function() {
    return (
      <Scope kind={this.props.route.scope}>
        {this.props.children}
      </Scope>
    )
  }
});
