import React from 'react';
import Immutable from 'immutable';

import RoutingDiagramClient from './RoutingDiagramClient.jsx';
import RoutingDiagramDimensions from './RoutingDiagramDimensions.js';


export default React.createClass({
  propTypes: {
    clients: React.PropTypes.object.isRequired,
  },


  clientHasExtra: function(client) {
    return (
      client.has("extra") && client.get("extra") !== null &&
      client.get("extra").has("electron") && client.get("extra").get("electron") !== null &&
      client.get("extra").get("electron").has("diagram") && client.get("extra").get("electron").get("diagram") !== null &&
      client.get("extra").get("electron").get("diagram").has("x") && client.get("extra").get("electron").get("diagram").get("x") !== null &&
      client.get("extra").get("electron").get("diagram").has("x") && client.get("extra").get("electron").get("diagram").get("y") !== null
    );
  },


  buildDefaultClientExtra: function() {
    return Immutable.fromJS({
      electron: {
        diagram: {
           x: 0,
           y: 0,
         }
       }
     }
   );
  },


  setDefaultClientExtra: function(client) {
    if(!client.has("extra") || client.get("extra") === null) {
      return client.set("extra", this.buildDefaultClientExtra());

    } else {
      return client.set("extra", client.get("extra").merge(this.buildDefaultClientExtra()));
    }
  },


  buildClientsWithExtra: function(clients) {
    // TODO improve algorithm that will append X/Y positions to clients
    // if it's necessary so it does not assign 0, 0 all the time
    return clients.map((client) => {
      if(!this.clientHasExtra(client)) {
        return this.setDefaultClientExtra(client);
      } else {
        return client;
      }
    });
  },


  render: function() {
    let clientsWithCoordinates = this.buildClientsWithExtra(this.props.clients);

    return (
      <svg version="1.1" height="600" width="100%">
        {clientsWithCoordinates.map((client) => {
          return (
            <RoutingDiagramClient
              key={client.get("id")}
              client={client} />
          );
        })}
      </svg>
    );
  }
});
