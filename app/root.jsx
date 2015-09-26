import React from 'react';

import LoadingLayout from './layouts/loading_layout.jsx';


export default class Root extends React.Component {
  getInitialState() {
    return { currentEditor: null };
  }


  componentWillMount() {
    // this.dataInterface = new RadioKit.Data.Interface({ auth: this.props.auth, apps: this.props.apps, verbose: true });
    // this.dataInterface.signIn("Editor");
  }


  componentWillUnmount() {
    // this.dataInterface.teardown();
  }


  render() {
    // if(this.state.currentEditor == null) {
      return (<LoadingLayout/>);

    // } else {
    //   return (<MaterialAdminLayout dataInterface={this.dataInterface} />);
    // }
  }
}



