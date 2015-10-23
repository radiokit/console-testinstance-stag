import React from 'react';

import AdminHelper from '../../helpers/admin_helper.js';


export default React.createClass({
  render: function() {
    return (<div style={{width: "100%", height: "100%", position: "fixed"}} onMouseOver={AdminHelper.hideMenuBar} />);
  }
});
