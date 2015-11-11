import React from 'react';
import Translate from 'react-translate-component';
import UploadWidget from '../../widgets/admin/upload_widget.jsx'

export default React.createClass({
  render: function() {
    return (
      <section>
        <UploadWidget kind="episode"/>
      </section>
    );
  }
});
