import React from 'react';

import '../../assets/stylesheets/widgets/admin/card_tool_bar.scss';


export default React.createClass({  
  render: function() {
    return (<div className="tools widgets-admin-card-tool-bar--container">
      <div className="btn-group">
        {this.props.children}
      </div>
    </div>);
  }
});