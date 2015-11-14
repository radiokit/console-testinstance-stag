import React from 'react';
import { Link } from 'react-router';

import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Alert from '../../../widgets/admin/alert_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Loading from '../../../widgets/general/loading_widget.jsx';
import FileBrowser from '../../../widgets/vault/file_browser_widget.jsx';

import VaultHelper from '../../../helpers/vault_helper.js';
import RoutingHelper from '../../../helpers/routing_helper.js';
import AccountHelper from '../../../helpers/account_helper.js';

export default React.createClass({
  childContextTypes: {
    scopeUserAccountId: React.PropTypes.string
  },


  getChildContext: function() {
    return {
      scopeUserAccountId: this.props.params.userAccountId,
    };
  },


  render: function() {
    return (
      <Section>
        <GridRow>
          <GridCell size="large" center={true}>
            <FileBrowser role="shows"/>
          </GridCell>
        </GridRow>
      </Section>
    );
  }
});
