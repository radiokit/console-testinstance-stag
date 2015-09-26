import React from 'react';

import RadioKitAuth from './radiokit/auth/oauth2.js';

import LoadingLayout from './layouts/loading_layout.jsx';
import AdminLayout from './layouts/admin_layout.jsx';


export default React.createClass({
  getInitialState: function() {
    return { currentEditor: null };
  },


  componentWillMount: function() {
    this.auth = new RadioKitAuth("Editor").authenticate();

    // this.dataInterface = new RadioKit.Data.Interface({ auth: this.props.auth, apps: this.props.apps, verbose: true });
    // this.dataInterface.signIn("Editor");
  },


  componentWillUnmount: function() {
    // this.dataInterface.teardown();
  },


  render: function() {
    if(this.state.currentEditor == null) {
      return (<LoadingLayout />);

    } else {
      return (<AdminLayout />);
    }
  }
});