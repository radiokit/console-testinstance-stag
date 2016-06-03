import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router, Route, IndexRoute } from 'react-router';
import Counterpart from 'counterpart';

import './services/RadioKit'; // for legacy window binding
import './services/Plumber'; // for legacy window binding

import Root from './root.jsx';
import Dashboard from './dashboard.jsx';
import ScopeLayout from './layouts/scope_layout.jsx';
import AppsIndex from './apps/apps_index.jsx';
import BroadcastApp from './apps/broadcast/app.jsx';
import BroadcastPlaylistIndex from './apps/broadcast/playlist/index_view.jsx';
import BroadcastLiveIndex from './apps/broadcast/live/index_view.jsx';
import ElectronApp from './apps/electron/app.jsx';
import ElectronPatchbayIndex from './apps/electron/patchbay/IndexView.jsx';
import ElectronTransmissionsIndex from './apps/electron/transmissions/IndexView.jsx';
import InfrastructureApp from './apps/infrastructure/app.jsx';
import InfrastructureComputingNodesIndex from './apps/infrastructure/computing_nodes/index_view.jsx';
import InfrastructureMediaIndex from './apps/infrastructure/media/IndexView.jsx';
import LibraryApp from './apps/library/app.jsx';
import LibraryFileRepositoriesIndex from './apps/library/file_repositories/IndexView.jsx';
import LibraryFileRepositoriesShow from './apps/library/file_repositories/show_view.jsx';
import ClipEditorApp from './apps/clip_editor/app.jsx';
import AdministrationApp from './apps/administration/app.jsx';
import AdministrationBroadcastChannelsIndex from './apps/administration/broadcast_channels/IndexView.jsx';
import AdministrationBroadcastChannelsShow from './apps/administration/broadcast_channels/ShowView.jsx';
import AdministrationUsersIndex from './apps/administration/users/IndexView.jsx';
import AdministrationFileRepositoriesIndex from './apps/administration/file_repositories/IndexView.jsx';
import AdministrationFileRepositoriesShow from './apps/administration/file_repositories/ShowView.jsx';

Counterpart.registerTranslations("en", require('./locales/en/general.js'));
Counterpart.registerTranslations("en", require('./locales/en/apps/broadcast.js'));
Counterpart.registerTranslations("en", require('./locales/en/apps/library.js'));
Counterpart.registerTranslations("en", require('./locales/en/apps/electron.js'));
Counterpart.registerTranslations("en", require('./locales/en/apps/infrastructure.js'));
Counterpart.registerTranslations("en", require('./locales/en/apps/administration.js'));
Counterpart.registerTranslations("en", require('./locales/en/widgets/vault/file_browser.js'));
Counterpart.registerTranslations("en", require('./locales/en/widgets/admin/table_browser.js'));
Counterpart.registerTranslations("en", require('./locales/en/widgets/admin/modal.js'));
Counterpart.registerTranslations("en", require('./locales/en/widgets/admin/scope.js'));
Counterpart.registerTranslations("en", require('./locales/en/widgets/admin/form.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/general.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/apps/broadcast.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/apps/library.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/apps/electron.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/apps/infrastructure.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/apps/administration.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/widgets/vault/file_browser.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/widgets/admin/table_browser.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/widgets/admin/modal.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/widgets/admin/scope.js'));
Counterpart.registerTranslations("pl", require('./locales/pl/widgets/admin/form.js'));

import { Dispatcher } from 'immview';
if (window.requestIdleCallback) {
  const noTime = () => 0;
  let timeLeft = noTime;
  Dispatcher.tick = f => {
    if (timeLeft() > 0) {
      f();
    } else {
      window.requestIdleCallback(deadline => {
        timeLeft = deadline.timeRemaining.bind(deadline);
        f();
      });
      timeLeft = noTime();
    }
  };
} else if (window.requestAnimationFrame) {
  Dispatcher.tick = window.requestAnimationFrame.bind(window);
} else {
  Dispatcher.tick = f => window.setTimeout(f, 10);
}

function pingGoogleAnalytics() {
  if (typeof ga !== 'undefined') {
    ga('send', 'pageview');
  }
}

ReactDOM.render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={Root} onEnter={pingGoogleAnalytics}>
      <IndexRoute component={Dashboard} />
      <Route path="apps" component={AppsIndex} onEnter={pingGoogleAnalytics}>
        <Route path="broadcast" component={BroadcastApp}>
          <Route component={ScopeLayout} scope="broadcastChannel">
            <Route path="playlist/index" component={BroadcastPlaylistIndex} onEnter={pingGoogleAnalytics} />
            <Route path="playlist(/:date/:zoom)" component={BroadcastPlaylistIndex} onEnter={pingGoogleAnalytics} />
          </Route>
          <Route component={ScopeLayout} scope="broadcastChannel">
            <Route path="live/index" component={BroadcastLiveIndex} onEnter={pingGoogleAnalytics}/>
          </Route>
        </Route>

        <Route path="library" component={LibraryApp}>
          <Route path="file_repositories">
            <Route component={ScopeLayout} scope="userAccount">
              <Route path="index" component={LibraryFileRepositoriesIndex} onEnter={pingGoogleAnalytics}/>
            </Route>
            <Route path="show/:id" component={LibraryFileRepositoriesShow} onEnter={pingGoogleAnalytics}/>
          </Route>
        </Route>

        <Route path="electron" component={ElectronApp}>
          <Route component={ScopeLayout} scope="userAccount">
            <Route path="transmissions">
              <Route path="index" component={ElectronTransmissionsIndex} onEnter={pingGoogleAnalytics}/>
            </Route>
            <Route path="patchbay">
              <Route path="index" component={ElectronPatchbayIndex} onEnter={pingGoogleAnalytics}/>
            </Route>
          </Route>
        </Route>

        <Route path="clipeditor" component={ClipEditorApp}></Route>

        <Route path="infrastructure" component={BroadcastApp}>
          <Route path="media/index" component={InfrastructureMediaIndex} onEnter={pingGoogleAnalytics}/>
          <Route path="computing_nodes/index" component={InfrastructureComputingNodesIndex} onEnter={pingGoogleAnalytics}/>
        </Route>

        <Route path="administration" component={AdministrationApp}>
          <Route path="broadcast_channels">
            <Route path="index" component={AdministrationBroadcastChannelsIndex} onEnter={pingGoogleAnalytics}/>
            <Route path="show/:id" component={AdministrationBroadcastChannelsShow} onEnter={pingGoogleAnalytics}/>
          </Route>
          <Route path="users/index" component={AdministrationUsersIndex} onEnter={pingGoogleAnalytics}/>
          <Route path="file_repositories">
            <Route path="index" component={AdministrationFileRepositoriesIndex} onEnter={pingGoogleAnalytics}/>
            <Route path="show/:id" component={AdministrationFileRepositoriesShow} onEnter={pingGoogleAnalytics}/>
          </Route>
        </Route>

      </Route>
    </Route>
  </Router>
), document.getElementById('app'));
