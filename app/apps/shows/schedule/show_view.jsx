import React from 'react';
import Alert from '../../../widgets/admin/alert_widget.jsx';

export default React.createClass({
  render: function() {
    return (<Alert type="error" fullscreen={true} infoTextKey="general.errors.underconstruction" />);
  }
});
