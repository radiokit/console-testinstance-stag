import React from 'react';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router, Route, IndexRoute } from 'react-router';
import Counterpart from 'counterpart';
import RadioKit from 'radiokit-api';

import { Socket } from '../vendor/assets/javascripts/phoenixframework/socket.js';

import Root from './root.jsx';
import AppsIndex from './apps/apps_index.jsx';
import JointApp from './apps/joint/app.jsx';
import JointControlRoom from './apps/joint/control_room_view.jsx';
import JointDevicesIndex from './apps/joint/devices_index_view.jsx';
import JointDevicesCreate from './apps/joint/devices_create_view.jsx';
import JointDevicesAdd from './apps/joint/devices_add_view.jsx';
import ShowsApp from './apps/shows/app.jsx';
import ShowsControlRoom from './apps/shows/control_room_view.jsx';


Counterpart.registerTranslations("en", require('./locales/en/general.js'));
Counterpart.registerTranslations("en", require('./locales/en/apps/joint.js'));
Counterpart.registerTranslations("en", require('./locales/en/apps/shows.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/general.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/apps/joint.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/apps/shows.js'));

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
    <Route path="/" component={Root} onEnter={requireAuth}>
      <Route path="apps" component={AppsIndex} onEnter={pingGoogleAnalytics}>
        <Route path="joint/:userAccountId" component={JointApp}>
          <Route path="control_room" component={JointControlRoom} onEnter={pingGoogleAnalytics}/>
          <Route path="devices/create" component={JointDevicesCreate} onEnter={pingGoogleAnalytics}/>
          <Route path="devices/index" component={JointDevicesIndex} onEnter={pingGoogleAnalytics}/>
          <Route path="devices/add/:role" component={JointDevicesAdd} onEnter={pingGoogleAnalytics}/>
        </Route>
        <Route path="shows/:userAccountId" component={ShowsApp}>
          <Route path="control_room" component={ShowsControlRoom} onEnter={pingGoogleAnalytics}/>
        </Route>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'));
