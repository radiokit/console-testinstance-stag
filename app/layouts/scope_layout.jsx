import React from 'react';

import Scope from '../widgets/admin/scope_widget.jsx';

const ScopeLayout = props => (
  <Scope kind={props.route.scope}>
    {props.children}
  </Scope>
);

ScopeLayout.propTypes = {
  route: React.PropTypes.object,
  children: React.PropTypes.any,
};

export default ScopeLayout;
