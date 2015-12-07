import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router, Route, IndexRoute } from 'react-router';
import Counterpart from 'counterpart';
import RadioKit from 'radiokit-api';

import { Socket } from 'phoenix-socket';

import Root from './root.jsx';
import ScopeLayout from './layouts/scope_layout.jsx';
import AppsIndex from './apps/apps_index.jsx';
import JointApp from './apps/joint/app.jsx';
import JointControlRoom from './apps/joint/control_room_view.jsx';
import ShowsApp from './apps/shows/app.jsx';
import ShowsFilesIndex from './apps/shows/files/index_view.jsx';
import ShowsFilesCreate from './apps/shows/files/create_view.jsx';
import ShowsFilesShow from './apps/shows/files/show_view.jsx';
import ShowsScheduleIndex from './apps/shows/schedule/index_view.jsx';
import ShowsScheduleShow from './apps/shows/schedule/show_view.jsx';
import MusicApp from './apps/music/app.jsx';
import MusicFilesIndex from './apps/music/files/index_view.jsx';
import MusicFilesCreate from './apps/music/files/create_view.jsx';
import MusicFilesShow from './apps/music/files/show_view.jsx';
import MusicScheduleIndex from './apps/music/schedule/index_view.jsx';
import MusicScheduleShow from './apps/music/schedule/show_view.jsx';
import BroadcastApp from './apps/broadcast/app.jsx';
import BroadcastPlaylistIndex from './apps/broadcast/playlist/index_view.jsx';
import BroadcastLiveIndex from './apps/broadcast/live/index_view.jsx';
import BroadcastChannelsIndex from './apps/broadcast/channels/index_view.jsx';
import InfrastructureApp from './apps/infrastructure/app.jsx';
import InfrastructureClientNodesIndex from './apps/infrastructure/client_nodes/index_view.jsx';
import InfrastructureComputingNodesIndex from './apps/infrastructure/computing_nodes/index_view.jsx';
import InfrastructureExternalInputsIndex from './apps/infrastructure/external_inputs/index_view.jsx';

Counterpart.registerTranslations("en", require('./locales/en/general.js'));
Counterpart.registerTranslations("en", require('./locales/en/apps/joint.js'));
Counterpart.registerTranslations("en", require('./locales/en/apps/shows.js'));
Counterpart.registerTranslations("en", require('./locales/en/apps/music.js'));
Counterpart.registerTranslations("en", require('./locales/en/apps/broadcast.js'));
Counterpart.registerTranslations("en", require('./locales/en/apps/infrastructure.js'));
Counterpart.registerTranslations("en", require('./locales/en/widgets/vault/file_browser.js'));
Counterpart.registerTranslations("en", require('./locales/en/widgets/admin/table_browser.js'));
Counterpart.registerTranslations("en", require('./locales/en/widgets/admin/modal.js'));
Counterpart.registerTranslations("en", require('./locales/en/widgets/admin/scope.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/general.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/apps/joint.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/apps/shows.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/apps/music.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/apps/broadcast.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/apps/infrastructure.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/widgets/vault/file_browser.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/widgets/admin/table_browser.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/widgets/admin/modal.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/widgets/admin/scope.js'));

function getEnv() {
  if(typeof(ENV) === "object") {
    return ENV;

  } else {
    return {
      auth: { clientId: "123", baseUrl: "https://radiokit-auth-stag.herokuapp.com" },
      apps: {
        "plumber" : { baseUrl: "https://radiokit-plumber-stag.herokuapp.com" },
        "auth" : { baseUrl: "https://radiokit-auth-stag.herokuapp.com" },
        "vault" : { baseUrl: "https://radiokit-vault-stag.herokuapp.com" },
        "agenda": { baseUrl: "http://localhost:4070" }
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
        <Route path="broadcast" component={BroadcastApp}>
          <Route component={ScopeLayout} scope="broadcastChannel">
            <Route path="playlist/index" component={BroadcastPlaylistIndex} onEnter={pingGoogleAnalytics}/>
          </Route>
          <Route component={ScopeLayout} scope="broadcastChannel">
            <Route path="live/index" component={BroadcastLiveIndex} onEnter={pingGoogleAnalytics}/>
          </Route>
          <Route component={ScopeLayout} scope="userAccount">
            <Route path="channels/index" component={BroadcastChannelsIndex} onEnter={pingGoogleAnalytics}/>
          </Route>
        </Route>

        <Route path="infrastructure" component={BroadcastApp}>
          <Route component={ScopeLayout} scope="userAccount">
            <Route path="client_nodes/index" component={InfrastructureClientNodesIndex} onEnter={pingGoogleAnalytics}/>
            <Route path="external_inputs/index" component={InfrastructureExternalInputsIndex} onEnter={pingGoogleAnalytics}/>
          </Route>
          <Route path="computing_nodes/index" component={InfrastructureComputingNodesIndex} onEnter={pingGoogleAnalytics}/>
        </Route>

        <Route path="joint" component={JointApp}>
          <Route path="control_room" component={JointControlRoom} onEnter={pingGoogleAnalytics}/>
        </Route>

        <Route path="shows" component={ShowsApp}>
          <Route component={ScopeLayout} scope="userAccount">
            <Route path="files/index" component={ShowsFilesIndex} onEnter={pingGoogleAnalytics}/>
            <Route path="files/create" component={ShowsFilesCreate} onEnter={pingGoogleAnalytics}/>
            <Route path="files/show/:fileId" component={ShowsFilesShow} onEnter={pingGoogleAnalytics}/>
          </Route>
          <Route component={ScopeLayout} scope="broadcastChannel">
            <Route path="schedule/index" component={ShowsScheduleIndex}/>
            <Route path="schedule/show/:schedulingItemId" component={ShowsScheduleShow}/>
          </Route>
        </Route>

        <Route path="music" component={MusicApp}>
          <Route component={ScopeLayout} scope="userAccount">
            <Route path="files/index" component={MusicFilesIndex} onEnter={pingGoogleAnalytics}/>
            <Route path="files/create" component={MusicFilesCreate} onEnter={pingGoogleAnalytics}/>
            <Route path="files/show/:fileId" component={MusicFilesShow} onEnter={pingGoogleAnalytics}/>
          </Route>
          <Route component={ScopeLayout} scope="broadcastChannel">
            <Route path="schedule/index" component={MusicScheduleIndex}/>
            <Route path="schedule/show/:schedulingItemId" component={MusicScheduleShow}/>
          </Route>
        </Route>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'));
