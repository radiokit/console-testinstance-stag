import React from 'react';
import Translate from 'react-translate-component';
import UploadWidget from '../../widgets/admin/upload_widget.jsx'

export default React.createClass({
  render: function() {
    console.log(this.props.uploadInterface);
    return (
      <section>
        <UploadWidget uploadInterface={this.props.uploadInterface} kind="episode"/>
      </section>
    );
  }
});