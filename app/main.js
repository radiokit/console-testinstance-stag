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
import BroadcastApp from './apps/broadcast/app.jsx';
import BroadcastPlaylistIndex from './apps/broadcast/playlist/index_view.jsx';
import BroadcastLiveIndex from './apps/broadcast/live/index_view.jsx';
import InfrastructureApp from './apps/infrastructure/app.jsx';
import InfrastructureClientNodesIndex from './apps/infrastructure/client_nodes/index_view.jsx';
import InfrastructureComputingNodesIndex from './apps/infrastructure/computing_nodes/index_view.jsx';
import InfrastructureExternalInputsIndex from './apps/infrastructure/external_inputs/index_view.jsx';
import InfrastructureTransmissionsIndex from './apps/infrastructure/transmissions/index_view.jsx';
import InfrastructurePatchbayIndex from './apps/infrastructure/patchbay/index_view.jsx';
import AdministrationApp from './apps/administration/app.jsx';
import AdministrationUserAccountsIndex from './apps/administration/user_accounts/index_view.jsx';
import AdministrationBroadcastChannelsIndex from './apps/administration/broadcast_channels/index_view.jsx';
import AdministrationEditorsIndex from './apps/administration/editors/index_view.jsx';
import AdministrationFileRepositoriesIndex from './apps/administration/file_repositories/index_view.jsx';

Counterpart.registerTranslations("en", require('./locales/en/general.js'));
Counterpart.registerTranslations("en", require('./locales/en/apps/music.js'));
Counterpart.registerTranslations("en", require('./locales/en/apps/broadcast.js'));
Counterpart.registerTranslations("en", require('./locales/en/apps/infrastructure.js'));
Counterpart.registerTranslations("en", require('./locales/en/apps/administration.js'));
Counterpart.registerTranslations("en", require('./locales/en/widgets/vault/file_browser.js'));
Counterpart.registerTranslations("en", require('./locales/en/widgets/admin/table_browser.js'));
Counterpart.registerTranslations("en", require('./locales/en/widgets/admin/modal.js'));
Counterpart.registerTranslations("en", require('./locales/en/widgets/admin/scope.js'));
Counterpart.registerTranslations("en", require('./locales/en/widgets/admin/form.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/general.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/apps/music.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/apps/broadcast.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/apps/infrastructure.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/apps/administration.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/widgets/vault/file_browser.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/widgets/admin/table_browser.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/widgets/admin/modal.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/widgets/admin/scope.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/widgets/admin/form.js'));

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
        "agenda": { baseUrl: "https://radiokit-agenda-stag.herokuapp.com" },
        "diffusor": { baseUrl: "https://radiokit-diffusor-stag.herokuapp.com" },
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
        </Route>

        <Route path="infrastructure" component={BroadcastApp}>
          <Route path="client_nodes/index" component={InfrastructureClientNodesIndex} onEnter={pingGoogleAnalytics}/>
          <Route path="external_inputs/index" component={InfrastructureExternalInputsIndex} onEnter={pingGoogleAnalytics}/>
          <Route path="transmissions/index" component={InfrastructureTransmissionsIndex} onEnter={pingGoogleAnalytics}/>
          <Route path="patchbay/index" component={InfrastructurePatchbayIndex} onEnter={pingGoogleAnalytics}/>
          <Route path="computing_nodes/index" component={InfrastructureComputingNodesIndex} onEnter={pingGoogleAnalytics}/>
        </Route>

        <Route path="administration" component={AdministrationApp}>
          <Route path="broadcast_channels/index" component={AdministrationBroadcastChannelsIndex} onEnter={pingGoogleAnalytics}/>
          <Route path="user_accounts/index" component={AdministrationUserAccountsIndex} onEnter={pingGoogleAnalytics}/>
          <Route path="editors/index" component={AdministrationEditorsIndex} onEnter={pingGoogleAnalytics}/>
          <Route path="file_repositories/index" component={AdministrationFileRepositoriesIndex} onEnter={pingGoogleAnalytics}/>
        </Route>

      </Route>
    </Route>
  </Router>
), document.getElementById('app'));
