import React from 'react';

import AdminLayout from '../../layouts/admin_layout.jsx';

export default React.createClass({
  render: function() {
    return <AdminLayout {...this.props} />;
  }
});