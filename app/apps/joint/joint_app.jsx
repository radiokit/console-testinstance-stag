import React from 'react';
import { History } from 'react-router';
import AdminLayout from '../../layouts/admin_layout.jsx';

export default React.createClass({
  mixins: [ History ],


  propTypes: {
    currentEditor: React.PropTypes.object,
    data: React.PropTypes.object.isRequired
  },


  componentDidMount: function() {
    this.history.replaceState(null, "/joint/broadcast_channels");
  },


  render: function() {
    return (<AdminLayout {...this.props}/>);
  }
});