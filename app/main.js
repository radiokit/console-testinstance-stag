import React from 'react';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router, Route, IndexRoute } from 'react-router';
import Counterpart from 'counterpart';
import RadioKit from 'radiokit-api';

import { Socket } from '../vendor/assets/javascripts/phoenixframework/socket.js';

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
// FIXME merge with official JS API
window.plumberStream = new Socket(getEnv().apps.plumber.baseUrl.replace(/^http/, "ws") + "/api/stream/v1.0", { heartbeatIntervalMs: 1000 });
window.plumberStream.connect();


React.render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App} onEnter={requireAuth}>
      <Route path="app/joint" component={JointIndex} onEnter={pingGoogleAnalytics}/>
    </Route>
  </Router>
), document.getElementById('app'));

