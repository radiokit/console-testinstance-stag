import React from 'react';
import Translate from 'react-translate-component';

var UploadWidget     = require('../../channel/widgets/upload_widget');

export default React.createClass({
  render: function() {
    return (
      <section>
        <UploadWidget dataInterface={this.props.dataInterface} uploadInterface={this.props.uploadInterface} currentChannel={this.props.currentChannel} kind="episode"/>
      </section>
    );
  }
});