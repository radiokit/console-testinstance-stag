import React from 'react';
import ReactDOM from 'react-dom';
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
import ShowsFilesIndex from './apps/shows/files/index_view.jsx';
import ShowsFilesCreate from './apps/shows/files/create_view.jsx';
import ShowsFilesShow from './apps/shows/files/show_view.jsx';
import ShowsFilesShowTrackMarkers from './apps/shows/show_track_markers.jsx';
import ShowsScheduleIndex from './apps/shows/schedule/index_view.jsx';
import ShowsScheduleShow from './apps/shows/schedule/show_view.jsx';
import MusicSchedulerApp from './apps/music_scheduler/app.jsx';
import MusicSchedulerAutomation from './apps/music_scheduler/automation.jsx';
import MusicSchedulerAutomationRegionsShow from './apps/music_scheduler/automation_regions_show.jsx';

Counterpart.registerTranslations("en", require('./locales/en/general.js'));
Counterpart.registerTranslations("en", require('./locales/en/apps/joint.js'));
Counterpart.registerTranslations("en", require('./locales/en/apps/shows.js'));
Counterpart.registerTranslations("en", require('./locales/en/apps/music_scheduler.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/general.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/apps/joint.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/apps/shows.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/apps/music_scheduler.js'));

function getEnv() {
  if(typeof(ENV) === "object") {
    return ENV;

  } else {
    return {
      auth: { clientId: "123", baseUrl: "https://radiokit-auth-stag.herokuapp.com" },
      apps: {
        "plumber" : { baseUrl: "http://localhost:4010" },
        "auth" : { baseUrl: "https://radiokit-auth-stag.herokuapp.com" },
        "horn-gw" : {baseUrl: "https://radiokit-horn-gw-stag.herokuapp.com"},
        "vault" : { baseUrl: "https://radiokit-vault-stag.herokuapp.com" },
        "agenda": { baseUrl: "https://radiokit-agenda-stag.herokuapp.com" }
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

ReactDOM.render((
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
          <Route path="files/index" component={ShowsFilesIndex} onEnter={pingGoogleAnalytics}/>
          <Route path="files/create" component={ShowsFilesCreate} onEnter={pingGoogleAnalytics}/>
          <Route path="files/show/:fileId" component={ShowsFilesShow} onEnter={pingGoogleAnalytics}/>
          <Route path="schedule/index" component={ShowsScheduleIndex}/>
          <Route path="schedule/show/:schedulingItemId" component={ShowsScheduleShow}/>
          <Route path="show/:trackId/track_markers" component={ShowsFilesShowTrackMarkers} onEnter={pingGoogleAnalytics}/>
        </Route>
        <Route path="music_scheduler/:userAccountId" component={MusicSchedulerApp}>
          <Route path="automation" component={MusicSchedulerAutomation}/>
          <Route path="automation_regions_show/:schedulingItemId" component={MusicSchedulerAutomationRegionsShow}/>
        </Route>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'));
