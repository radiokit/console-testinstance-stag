import React from 'react';

import Alert from '../../../widgets/admin/alert_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Loading from '../../../widgets/general/loading_widget.jsx';
import Upload from '../../../widgets/admin/upload_widget.jsx'

import VaultHelper from '../../../helpers/vault_helper.js';

export default React.createClass({
  getInitialState: function() {
    return {
      currentRepository: null,
      loadedRepository: false,
      loadingError: false,
    };
  },


  contextTypes: {
    currentUserAccount: React.PropTypes.object.isRequired,
  },


  componentDidMount: function() {
    VaultHelper.loadRepository(this, "music");
  },


  render: function() {
    if(this.state.loadingError) {
      return (<Alert type="error" fullscreen={true} infoTextKey="general.errors.communication.general" />);

    } else {
      if(this.state.loadedRepository === false) {
        return (<Loading info={true} infoTextKey="apps.music.files.create.loading"/>);

      } else {
        return (
          <Section>
            <Upload repository={this.state.currentRepository} />
          </Section>
        );
      }
    }
  }
});
