import React from 'react';
import RadioKit from 'radiokit-api';
import { Router } from 'react-router';


import LoadingLayout from './layouts/loading_layout.jsx';


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


  componentWillUnmount: function() {
    this.data.teardown();
    delete this.data;
  },


  onAuthSuccess: function() {
    console.log("Authenticated");

    this.data
      .query("auth", "Editor")
      .method("me") // FIXME methods should be deprecated in favour of tokens
      .on("update", this.onCurrentEditorFetched)
      .fetch();
  },


  onCurrentEditorFetched: function(_, query) {
    console.log("Fetched current editor");
    this.setState({ currentEditor: query.getData().first() });
  },


  render: function() {
   if(this.state.currentEditor == null) {
     return (<LoadingLayout />);
  
    } else {
      return (<div>{React.cloneElement(this.props.children, { data: this.data, currentEditor: this.state.currentEditor })}</div>);
    }
  }
});