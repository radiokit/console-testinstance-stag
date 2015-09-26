import React from 'react';

import RadioKit from './radiokit/api.js';

import LoadingLayout from './layouts/loading_layout.jsx';
import AdminLayout from './layouts/admin_layout.jsx';


export default React.createClass({
  getInitialState: function() {
    return { currentEditor: null };
  },


  componentWillMount: function() {
    this.api = new RadioKit({ role: "Editor" });
  },


  componentDidMount: function() {
    this.api.data().app("auth").model("Editor");
  },


  render: function() {
    if(this.state.currentEditor == null) {
      return (<LoadingLayout />);

    } else {
      return (<AdminLayout currentEditor={this.state.currentEditor} api={this.api} />);
    }
  }
});