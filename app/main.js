import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router, Route, IndexRoute } from 'react-router';
import Counterpart from 'counterpart';

import './services/Plumber'; // for legacy window binding

// this is set to false on staging and production builds
// and true on local builds
if (process.env.NODE_ENV) {
  window.Perf = require('react-addons-perf');
}

import Root from './root.jsx';
import Dashboard from './dashboard.jsx';
import ScopeLayout from './layouts/ScopeLayout.jsx';
import AppsIndex from './apps/apps_index.jsx';
import BroadcastApp from './apps/broadcast/app.jsx';
import BroadcastPlaylistIndex from './apps/broadcast/playlist/index_view.jsx';
import BroadcastLiveIndex from './apps/broadcast/live/index_view.jsx';
import BroadcastAutoIndex from './apps/broadcast/auto/IndexView.jsx';
import BroadcastSwitchIndex from './apps/broadcast/switch/IndexView.jsx';
import ElectronApp from './apps/electron/app.jsx';
import ElectronPatchbayIndex from './apps/electron/patchbay/IndexView.jsx';
import ElectronTransmissionsIndex from './apps/electron/transmissions/IndexView.jsx';
import AlmanacApp from './apps/almanac/app.jsx';
import AlmanacResourcesIndex from './apps/almanac/resources/IndexView.jsx';
import AlmanacResourcesShow from './apps/almanac/resources/ShowView.jsx';
import AlmanacAnnouncementsIndex from './apps/almanac/announcements/IndexView.jsx';
import InfrastructureApp from './apps/infrastructure/app.jsx';
import InfrastructureComputingNodesIndex from './apps/infrastructure/computing_nodes/index_view.jsx';
import InfrastructureroadcastChannelsIndex from './apps/infrastructure/broadcast_channels/IndexView.jsx';
import InfrastructureBroadcastChannelsShow from './apps/infrastructure/broadcast_channels/ShowView.jsx';
import LibraryApp from './apps/library/app.jsx';
import LibraryFileRepositoriesIndex from './apps/library/file_repositories/IndexView.jsx';
import LibraryFileRepositoriesShow from './apps/library/file_repositories/show_view.jsx';
import LibraryLimitedApp from './apps/library_limited/app.jsx';
import LibraryLimitedFileRepositoriesIndex from './apps/library_limited/file_repositories/IndexView.jsx';
import LibraryLimitedFileRepositoriesShow from './apps/library_limited/file_repositories/show_view.jsx';
import ClipEditorApp from './apps/clip_editor/app.jsx';
import AdministrationApp from './apps/administration/app.jsx';
import AdministrationUsersIndex from './apps/administration/users/IndexView.jsx';
import AdministrationFileRepositoriesIndex from './apps/administration/file_repositories/IndexView.jsx';
import AdministrationFileRepositoriesShow from './apps/administration/file_repositories/ShowView.jsx';
import AdministrationStatsIndex from './apps/administration/stats/IndexView.jsx';

Counterpart.registerTranslations("en", require('./locales/en/general.js'));
Counterpart.registerTranslations("en", require('./locales/en/apps/almanac.js'));
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
Counterpart.registerTranslations("pl", require('./locales/pl/apps/almanac.js'));
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

/*
TODO

Following function is for giving browser time to render
in between pushing data through immview streams

Despite it being quite smart
it completely breaks broadcast playlist details view
as it requires all changes to be applied synchronously

Until ScheduleDetails is not holding uncommited changes
this should be disabled

import { Dispatcher } from 'immview';
if (window.requestIdleCallback) {
  const targetFPS = 60;
  const frameTime = 1000 / targetFPS;
  const logicCalcTime = 8;
  const paintTime = frameTime - logicCalcTime;
  const noTime = () => 0;
  let timeLeft = noTime;
  Dispatcher.tick = f => {
    if (timeLeft() > paintTime) {
      f();
    } else {
      window.requestAnimationFrame(() => {
        window.requestIdleCallback(deadline => {
          timeLeft = deadline.timeRemaining.bind(deadline);
          f();
        });
      });
      timeLeft = noTime;
    }
  };
} else if (window.requestAnimationFrame) {
  Dispatcher.tick = window.requestAnimationFrame.bind(window);
} else {
  Dispatcher.tick = f => window.setTimeout(f);
}
*/

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
            <Route path="live/index" component={BroadcastLiveIndex} onEnter={pingGoogleAnalytics} />
          </Route>
          <Route component={ScopeLayout} scope="broadcastChannel">
            <Route path="auto/index" component={BroadcastAutoIndex} onEnter={pingGoogleAnalytics} />
          </Route>
          <Route component={ScopeLayout} scope="broadcastChannel">
            <Route path="switch/index" component={BroadcastSwitchIndex} onEnter={pingGoogleAnalytics} />
          </Route>
        </Route>

        <Route path="almanac" component={AlmanacApp}>
          <Route path="resources">
            <Route component={ScopeLayout} scope="userAccount">
              <Route path="index" component={AlmanacResourcesIndex} onEnter={pingGoogleAnalytics} />
              <Route path="show/:id" component={AlmanacResourcesShow} onEnter={pingGoogleAnalytics} />
            </Route>
          </Route>
          <Route path="announcements">
            <Route component={ScopeLayout} scope="userAccount">
              <Route path="index" component={AlmanacAnnouncementsIndex} onEnter={pingGoogleAnalytics} />
            </Route>
          </Route>
        </Route>

        <Route path="library" component={LibraryApp}>
          <Route path="file_repositories">
            <Route component={ScopeLayout} scope="userAccount">
              <Route path="index" component={LibraryFileRepositoriesIndex} onEnter={pingGoogleAnalytics} />
            </Route>
            <Route path="show/:id" component={LibraryFileRepositoriesShow} onEnter={pingGoogleAnalytics} />
          </Route>
        </Route>

        <Route path="library_limited" component={LibraryLimitedApp}>
          <Route path="file_repositories">
            <Route component={ScopeLayout} scope="userAccount">
              <Route path="index" component={LibraryLimitedFileRepositoriesIndex} onEnter={pingGoogleAnalytics} />
            </Route>
            <Route path="show/:id" component={LibraryLimitedFileRepositoriesShow} onEnter={pingGoogleAnalytics} />
          </Route>
        </Route>


        <Route path="electron" component={ElectronApp}>
          <Route component={ScopeLayout} scope="userAccount">
            <Route path="transmissions">
              <Route path="index" component={ElectronTransmissionsIndex} onEnter={pingGoogleAnalytics} />
            </Route>
            <Route path="patchbay">
              <Route path="index" component={ElectronPatchbayIndex} onEnter={pingGoogleAnalytics} />
            </Route>
          </Route>
        </Route>

        <Route path="clipeditor" component={ClipEditorApp}></Route>

        <Route path="infrastructure" component={BroadcastApp}>
          <Route path="computing_nodes/index" component={InfrastructureComputingNodesIndex} onEnter={pingGoogleAnalytics} />
          <Route path="broadcast_channels">
            <Route path="index" component={InfrastructureroadcastChannelsIndex} onEnter={pingGoogleAnalytics} />
            <Route path="show/:id" component={InfrastructureBroadcastChannelsShow} onEnter={pingGoogleAnalytics} />
          </Route>
        </Route>

        <Route path="administration" component={AdministrationApp}>
          <Route path="users/index" component={AdministrationUsersIndex} onEnter={pingGoogleAnalytics} />
          <Route path="file_repositories">
            <Route path="index" component={AdministrationFileRepositoriesIndex} onEnter={pingGoogleAnalytics} />
            <Route path="show/:id" component={AdministrationFileRepositoriesShow} onEnter={pingGoogleAnalytics} />
          </Route>
          <Route path="stats/index" component={AdministrationStatsIndex} onEnter={pingGoogleAnalytics} />
        </Route>

      </Route>
    </Route>
  </Router>
), document.getElementById('app'));
