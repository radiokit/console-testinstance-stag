import React from 'react';
import Immutable from 'immutable';
import { Data } from 'radiokit-api';

import SVGDraggable from '../../../widgets/svg/SVGDraggable.jsx';

import RoutingDiagramDimensions from './RoutingDiagramDimensions.js';


export default React.createClass({
  propTypes: {
    clients: React.PropTypes.object.isRequired,
    audioInterfaces: React.PropTypes.object.isRequired,
    linkRules: React.PropTypes.object.isRequired,
  },


  getInitialState: function() {
    return {
      audioInterfacesLinkCoordinates: null,
    }
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



  getAudioInterfacesOfClient: function(client) {
    return this.props.audioInterfaces.filter((audioInterface) => {
      return (
        audioInterface.has("references") && audioInterface.get("references") !== null &&
        audioInterface.get("references").has("owner") && audioInterface.get("references").has("owner") !== null &&
        audioInterface.get("references").get("owner") === Data.buildRecordGlobalID("auth", "Client.Standalone", client.get("id"))
      );
    });
  },


  getLinkRulesOfAudioInterface: function(audioInterface) {
    return this.props.linkRules.filter((linkRule) => {
      return (
        linkRule.get("source_audio_interface_id") === audioInterface.get("id")
      );
    });
  },


  onClientDragStop: function(x, y) {
    // FIXME
    window.data.record("auth", "Client.Standalone", this.props.client.get("id"))
      .update({
        extra: {
          electron: {
            diagram: {
              x: x,
              y: y
            }
          }
        }
      });
  },


  onAudioInterfaceClick: function() {
    // TODO
  },


  render: function() {
    let clientsWithExtra = this.buildClientsWithExtra(this.props.clients);

    var linkCoordinates = {};

    let clientsDiagram = clientsWithExtra.map((client) => {
      let clientX = client.get("extra").get("electron").get("diagram").get("x");
      let clientY = client.get("extra").get("electron").get("diagram").get("y");

      return (
        <SVGDraggable
          key={`client-${client.get("id")}`}
          x={clientX}
          y={clientY}
          onDragStop={this.onClientDragStop}>
          <rect
            x="2"
            y="2"
            rx="4"
            ry="4"
            width={RoutingDiagramDimensions.getClientWidth()-2}
            height={RoutingDiagramDimensions.getClientHeight(this.getAudioInterfacesOfClient(client).count())-2}
            opacity="0.2"
            fill="#000000" />

          <rect
            x="0"
            y="0"
            rx="2"
            ry="2"
            width={RoutingDiagramDimensions.getClientWidth()-2}
            height={RoutingDiagramDimensions.getClientHeight(this.getAudioInterfacesOfClient(client).count())-2}
            fill="#006c90"
            stroke="#2b323a" />

          <text
            transform={`translate(${RoutingDiagramDimensions.getClientWidth()/2},${-1 * RoutingDiagramDimensions.getHeaderHeight()})`}
            x="0"
            y="0"
            textAnchor="middle"
            fontFamily="Roboto,Helvetica,Arial,sans"
            fontSize="14px"
            stroke="none"
            fill="#2b323a">
            {client.get("name")}
          </text>


          {this.getAudioInterfacesOfClient(client)
            .map((audioInterface, index) => {
              let audioInterfaceX = (audioInterface.get("direction") === "capture" ? 0 : RoutingDiagramDimensions.getClientWidth()) + RoutingDiagramDimensions.getAudioInterfaceWidth() / -2;
              let audioInterfaceY = (index * (RoutingDiagramDimensions.getAudioInterfaceMargin() + RoutingDiagramDimensions.getAudioInterfaceHeight()) + RoutingDiagramDimensions.getAudioInterfaceMargin());

              linkCoordinates[audioInterface.get("id")] = {
                x: clientX + audioInterfaceX + (audioInterface.get("direction") === "playback" ? RoutingDiagramDimensions.getAudioInterfaceWidth() : 0),
                y: clientY + audioInterfaceY + RoutingDiagramDimensions.getAudioInterfaceHeight() / 2
              };

              return (
                <g key={`audio-interface-${audioInterface.get("id")}`}
                  transform={`translate(${audioInterfaceX},${audioInterfaceY})`}>
                  <rect
                    x="0"
                    y="0"
                    rx="2"
                    ry="2"
                    width={RoutingDiagramDimensions.getAudioInterfaceWidth()}
                    height={RoutingDiagramDimensions.getAudioInterfaceHeight()}
                    fill="#fff"
                    stroke="#2b323a"
                    onClick={this.onAudioInterfaceClick} />

                  <text
                    x={audioInterface.get("direction") === "capture" ? RoutingDiagramDimensions.getAudioInterfaceWidth() * 1.25 : RoutingDiagramDimensions.getAudioInterfaceWidth() * -0.25}
                    y="12"
                    textAnchor={audioInterface.get("direction") === "capture" ? "start" : "end"}
                    fontFamily="Roboto,Helvetica,Arial,sans"
                    fontSize="10px"
                    stroke="none"
                    fill="#fff">
                    {audioInterface.get("name")}
                  </text>
                </g>
              );
          })}

        </SVGDraggable>
      );
    });

    clientsDiagram.toJS(); // Do any operation so the lazy map() above is actually triggered

    // console.log(linkCoordinates);

    let linkRulesDiagram = this.props.linkRules
      .filter((linkRule) => {
        return (
          linkCoordinates.hasOwnProperty(linkRule.get("source_audio_interface_id")) ||
          linkCoordinates.hasOwnProperty(linkRule.get("destination_audio_interface_id"))
        );
      })
      .filter((linkRule) => {
        return (
          linkRule.get("source_audio_interface_id") !== null &&
          linkRule.get("destination_audio_interface_id") !== null
        );
      })
      .map((linkRule) => {
        console.log(linkRule.get("source_audio_interface_id") + " -> " + linkRule.get("destination_audio_interface_id"));

        let start = `M${linkCoordinates[linkRule.get("source_audio_interface_id")].x} ${linkCoordinates[linkRule.get("source_audio_interface_id")].y}`;
        let stop = `L${linkCoordinates[linkRule.get("destination_audio_interface_id")].x} ${linkCoordinates[linkRule.get("destination_audio_interface_id")].y}`;

        return (
          <path key={`link-rule-${linkRule.get("id")}`}
            d={`${start} ${stop}`}
            strokeWidth="2"
            stroke="red" />
          );
      })

    return (
      <svg version="1.1" height="600" width="100%">
        {clientsDiagram}
        {linkRulesDiagram}
      </svg>
    );
  }
});
