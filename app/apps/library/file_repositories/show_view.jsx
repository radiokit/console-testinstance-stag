import React from 'react';

import Show from '../../../widgets/admin/crud/show_widget.jsx';

export default React.createClass({
  render: function() {
    return (
      <Show contentPrefix="apps.administration.file_repositories" app="vault" model="Data.Record.Repository" />
    );
  }
});
