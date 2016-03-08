import React from 'react';
import Immutable from 'immutable';
import Translate from 'react-translate-component';
import { Link } from 'react-router';


import GridRow from './widgets/admin/grid_row_widget.jsx';
import GridCell from './widgets/admin/grid_cell_widget.jsx';
import Section from './widgets/admin/section_widget.jsx';
import List from './widgets/admin/list_widget.jsx';
import Card from './widgets/admin/card_widget.jsx';
import RoutingHelper from './helpers/routing_helper.js';

export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object.isRequired,
  },


  getInitialState: function() {
    return {
      selectedApp: null,
    }
  },


  onAppClick: function(appName) {
    this.setState({
      selectedApp: appName
    });
  },


  // FIXME don't use inline styles
  render: function() {
    if(this.state.selectedApp == null) {
      return (
        <Section>
          <GridRow>
            {() => {
              return this.context.currentUser.get("apps_available").map((appName) => {
                return (
                  <div key={appName} className="col-md-3">
                    <Card cardPadding={false} headerVisible={false}>
                      <a className="btn btn-block btn-default text-center small-padding" style={{border: "none"}} onClick={this.onAppClick.bind(this, appName)}>
                        <i className={`text-xxxxl mdi mdi-${RoutingHelper.apps[appName].icon}`} />
                        <Translate component="h2" content={`apps.${appName}.navigation.title`}/>
                        <Translate component="small" content={`apps.${appName}.navigation.subtitle`}/>
                      </a>
                    </Card>
                  </div>
                );
              });
            }()}
          </GridRow>
        </Section>
      )

    } else {
      return (
        <Section>
          <GridRow>
            <GridCell size="small" center={true}>
              <div className="text-center small-padding">
                <i className={`text-xxxxl mdi mdi-${RoutingHelper.apps[this.state.selectedApp].icon}`} />
                <Translate component="h2" content={`apps.${this.state.selectedApp}.navigation.title`}/>
              </div>

              <List>
                <Card cardPadding={false} headerVisible={false}>
                  {() => {
                    return Immutable.fromJS(Object.keys(RoutingHelper.apps[this.state.selectedApp]))
                      .filterNot((subAppName) => { return subAppName === "icon"; })
                      .map((subAppName) => {
                        return (
                          <li key={subAppName} className="tile">
                            <Link className="tile-content" to={RoutingHelper.apps[this.state.selectedApp][subAppName].index(this)}>
                              <Translate component="div" className="tile-text" content={`apps.${this.state.selectedApp}.navigation.${subAppName}.title`}/>
                            </Link>
                          </li>
                        );
                    });
                  }()}
                </Card>
              </List>
            </GridCell>
          </GridRow>
        </Section>
      );
    }
  }
});
