import React from 'react';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router, Route, IndexRoute } from 'react-router';
import Counterpart from 'counterpart';

import Root from './root.jsx';
import IndexApp from './apps/index/index_app.jsx';
import JointApp from './apps/joint/joint_app.jsx';


Counterpart.registerTranslations("en", require('./locales/en/widgets.js'));


React.render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={Root}>
      <IndexRoute component={IndexApp}>

      </IndexRoute>

      <Route path="joint" component={JointApp}>

      </Route>
    </Route>
  </Router>
), document.getElementById('app'));

