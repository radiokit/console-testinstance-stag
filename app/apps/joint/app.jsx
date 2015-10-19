import React from 'react';
import Card from '../../widgets/admin/card_widget.jsx';
import List from '../../widgets/admin/list_widget.jsx';
import Tile from '../../widgets/admin/tile_widget.jsx';
import Section from '../../widgets/admin/section_widget.jsx';
import Loading from '../../widgets/general/loading_widget.jsx';
import Alert from '../../widgets/admin/alert_widget.jsx';
import Channel from './partials/channel_partial.jsx';

export default React.createClass({

  render: function() {
    return (<div>{this.props.children}</div>);    
  }  
});