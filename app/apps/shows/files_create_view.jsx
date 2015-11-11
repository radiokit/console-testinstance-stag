import React from 'react';
import Translate from 'react-translate-component';

import UploadWidget from '../../widgets/admin/upload_widget.jsx'
import AccountHelper from '../../helpers/account_helper.js';

export default React.createClass({
  render: function() {
    return (
      <section>
        <UploadWidget repositoryRole="shows" repositoryUserAccountId={AccountHelper.getCurrentAccountIdFromContext(this)} />
      </section>
    );
  }
});
