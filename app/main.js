import React from 'react';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router, Route, IndexRoute } from 'react-router';
import Counterpart from 'counterpart';
import RadioKit from 'radiokit-api';

import App from './app.jsx';
import JointIndex from './apps/joint/index_view.jsx';


Counterpart.registerTranslations("en", require('./locales/en/apps/joint.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/apps/joint.js'));


function getEnv() {
  if(typeof(ENV) === "object") {
    return ENV;
  
  } else {
    return { 
      auth: { clientId: "123", baseUrl: "http://localhost:4000" }, 
      apps: { 
        "plumber" : { baseUrl: "http://localhost:4010" },
        "auth" : { baseUrl: "http://localhost:4000" } 
      },
      verbose: true
    };
  }
}


function requireAuth() {
  window.data.signIn("Editor");  
  pingGoogleAnalytics();
}


function pingGoogleAnalytics() {
  if(typeof(ga) !== "undefined") {
    ga('send', 'pageview');
  }
}


window.ENV = getEnv();
window.data = new RadioKit.Data.Interface(getEnv());


React.render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App} onEnter={requireAuth}>
      <Route path="joint" component={JointIndex} onEnter={pingGoogleAnalytics}/>
    </Route>
  </Router>
), document.getElementById('app'));

