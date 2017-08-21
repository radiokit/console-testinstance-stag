import React from 'react';
import Translate from 'react-translate-component';
import { Link } from 'react-router';


import GridRow from './widgets/admin/grid_row_widget.jsx';
import GridCell from './widgets/admin/grid_cell_widget.jsx';
import Section from './widgets/admin/section_widget.jsx';
import List from './widgets/admin/list_widget.jsx';
import Card from './widgets/admin/card_widget.jsx';
import RoutingHelper from './helpers/routing_helper.js';

import './dashboard.scss';


export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    const availableApps = this.context.currentUser.get('apps_available');

    if (availableApps.count() === 1) {
      return {
        selectedApp: availableApps.first(),
      };
    }

    return {
      selectedApp: null,
    };
  },

  onAppClick(appName) {
    this.setState({
      selectedApp: appName,
    });
  },

  renderAppCard(appName) {
    if (!RoutingHelper.apps[appName]) {
      return null;
    }

    return (
      <div key={appName} className="col-md-6 col-lg-3">
        <Card cardPadding={false} headerVisible={false}>
          <a
            className="btn btn-block btn-default text-center small-padding"
            onClick={() => this.onAppClick(appName)}
          >
            <i className={`text-xxxxl mdi mdi-${RoutingHelper.apps[appName].icon}`} />
            <Translate
              component="h2"
              content={`apps.${appName}.navigation.title`}
            />
            <Translate
              component="small"
              content={`apps.${appName}.navigation.subtitle`}
            />
          </a>
        </Card>
      </div>
    );
  },

  renderMainDashboard() {
    const apps = this.context.currentUser.get('apps_available').map(this.renderAppCard);

    return (
      <Section className="dashboard">
        <GridRow>
          {apps}
        </GridRow>
      </Section>
    );
  },

  renderSubAppLink(subAppName) {
    const selectedApp = this.state.selectedApp;

    return (
      <li key={subAppName} className="tile">
        <Link
          className="tile-content"
          to={RoutingHelper.apps[selectedApp][subAppName].index(this)}
        >
          <Translate
            component="div"
            className="tile-text"
            content={`apps.${selectedApp}.navigation.${subAppName}.title`}
          />
        </Link>
      </li>
    );
  },

  renderAppDashboard() {
    const selectedApp = this.state.selectedApp;
    const subapps = Object.keys(RoutingHelper.apps[selectedApp] || {})
      .filter(subAppName => subAppName !== 'icon')
      .map(this.renderSubAppLink);

    return (
      <Section className="dashboard">
        <GridRow>
          <GridCell size="small" center>
            <div className="text-center small-padding">
              <i className={`text-xxxxl mdi mdi-${RoutingHelper.apps[selectedApp].icon}`} />
              <Translate component="h2" content={`apps.${selectedApp}.navigation.title`} />
            </div>
            <List>
              <Card cardPadding={false} headerVisible={false}>
                {subapps}
              </Card>
            </List>
          </GridCell>
        </GridRow>
      </Section>
    );
  },

  render() {
    if (!this.state.selectedApp) {
      return this.renderMainDashboard();
    }

    return this.renderAppDashboard();
  },
});
