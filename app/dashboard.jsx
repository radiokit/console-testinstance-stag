import React from 'react';
import Translate from 'react-translate-component';
import GridRow from './widgets/admin/grid_row_widget.jsx';
import GridCell from './widgets/admin/grid_cell_widget.jsx';
import Section from './widgets/admin/section_widget.jsx';

import RoutingHelper from './helpers/routing_helper.js';

export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object.isRequired,
  },


  render: function() {
    return (
      <div>
        {() => {
          return this.context.currentUser.get("apps_available").map((appName) => {
            return (
              <Section>
                <GridRow>
                  <div className="col-md-3">
                    <a className="btn btn-default text-center">
                      <i className={`text-xxxxl mdi mdi-${RoutingHelper.apps[appName].icon}`} />
                      <Translate component="h2" content={`apps.${appName}.navigation.title`}/>
                      <Translate component="h4" content={`apps.${appName}.navigation.subtitle`}/>
                    </a>
                  </div>
                </GridRow>
              </Section>
            );
          });
        }()}
      </div>
    )
  }
});
