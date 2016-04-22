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
    return {
      selectedApp: null,
    };
  },


  onAppClick(appName) {
    this.setState({
      selectedApp: appName,
    });
  },


  // FIXME don't use inline styles
  render() {
    const { selectedApp } = this.state;
    if (!selectedApp) {
      return (
        <Section className="dashboard">
          <GridRow>
            {this.context.currentUser.get('apps_available').map((appName) => (
              RoutingHelper.apps[appName] && (
                  <div key={appName} className="col-md-3">
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
                )
            ))}
          </GridRow>
        </Section>
      );
    }
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
                  {Object.keys(RoutingHelper.apps[selectedApp] || {})
                      .filter((subAppName) => subAppName !== 'icon')
                      .map((subAppName) => (
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
                        )
                      )
                  }
                </Card>
              </List>
            </GridCell>
          </GridRow>
        </Section>
      );
  },
});
