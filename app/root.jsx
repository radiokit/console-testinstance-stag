import React from 'react';
import RadioKit from 'radiokit-api';

import LoadingLayout from './layouts/loading_layout.jsx';
import AdminLayout from './layouts/admin_layout.jsx';


export default React.createClass({
  getInitialState: function() {
    return { currentEditor: null };
  },


  getEnv: function() {
    if(typeof(window.ENV) === "object") {
      return window.ENV;
    
    } else {
      return { 
        auth: { clientId: "123", baseUrl: "http://localhost:4000" }, 
        apps: { 
          "plumber" : { baseUrl: "https://radiokit-plumber-stag.herokuapp.com" },
          "auth" : { baseUrl: "http://localhost:4000" } 
        },
        verbose: true
      };
    }
  },


  componentWillMount: function() {
    this.data = new RadioKit.Data.Interface(this.getEnv());
  },


  componentDidMount: function() {
    this.data.on("auth::success", this.onAuthSuccess);
    this.data.signIn("Editor");
  },


  onAuthSuccess: function() {
    this.data
      .query("auth", "Editor")
      .method("me") // FIXME methods should be deprecated in favour of tokens
      .on("update", (_, query) => this.setState({ currentEditor: query.getData().first()}))
      .fetch();
  },


  render: function() {
    if(this.state.currentEditor == null) {
      return (<LoadingLayout />);

    } else {
      return (<AdminLayout currentEditor={this.state.currentEditor} data={this.data} />);
    }

  }
});