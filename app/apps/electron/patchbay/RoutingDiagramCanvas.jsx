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


  getAudioInterfacesOfClient: function(client) {
    let clientGlobalID = Data.buildRecordGlobalID("auth", "Client.Standalone", client.get("id"));

    return this.props.audioInterfaces.filter((audioInterface) => {
      return (
        audioInterface.has("references") && audioInterface.get("references") !== null &&
        audioInterface.get("references").has("owner") && audioInterface.get("references").has("owner") !== null &&
        audioInterface.get("references").get("owner") === clientGlobalID
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


  onClientDragMove: function(client, x, y) {
    this.clientsCoordinates = this.clientsCoordinates.set(client.get("id"), new Immutable.Map({x: x, y: y}));
    this.forceUpdate();

    // FIXME
    // window.data.record("auth", "Client.Standalone", this.props.client.get("id"))
    //   .update({
    //     extra: {
    //       electron: {
    //         diagram: {
    //           x: x,
    //           y: y
    //         }
    //       }
    //     }
    //   });
  },


  onAudioInterfaceClick: function() {
    // TODO
  },


  componentWillMount: function() {
    // We do not use state as it's updates are not not happening immediately
    // which results in sluggish UI
    this.clientsCoordinates = new Immutable.Map();
  },


  componentWillUnount: function() {
    delete this.clientsCoordinates;
  },


  render: function() {
    var linkCoordinates = {};

    // Render all clients along with their audio interfaces
    let clientsDiagram = this.props.clients.map((client) => {
      // If client was moved, use its new coordinates, otherwise get one that came with props
      let clientX = this.clientsCoordinates.has(client.get("id")) ? this.clientsCoordinates.get(client.get("id")).get("x") : client.get("extra").get("electron").get("diagram").get("x");
      let clientY = this.clientsCoordinates.has(client.get("id")) ? this.clientsCoordinates.get(client.get("id")).get("y") : client.get("extra").get("electron").get("diagram").get("y");

      // Render dragable box + shadow + client's name
      return (
        <SVGDraggable
          key={`client-${client.get("id")}`}
          x={clientX}
          y={clientY}
          onDragMove={this.onClientDragMove.bind(this, client)}>
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
              // Use audio interface box position as internal relative origin.
              // Put it on the right edge of client's box if it's "capture"
              // interface, or on the left otherwise.
              let audioInterfaceX = (audioInterface.get("direction") === "capture" ? RoutingDiagramDimensions.getClientWidth() : 0) + RoutingDiagramDimensions.getAudioInterfaceWidth() / -2;
              let audioInterfaceY = (index * (RoutingDiagramDimensions.getAudioInterfaceMargin() + RoutingDiagramDimensions.getAudioInterfaceHeight()) + RoutingDiagramDimensions.getAudioInterfaceMargin());

              // Store computed, absolute coordinates of the interface for
              // future usage while linking.
              linkCoordinates[audioInterface.get("id")] = {
                x: clientX + audioInterfaceX + (audioInterface.get("direction") === "capture" ? RoutingDiagramDimensions.getAudioInterfaceWidth() : 0),
                y: clientY + audioInterfaceY + RoutingDiagramDimensions.getAudioInterfaceHeight() / 2
              };

              // Render box + interface's name
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
                    x={audioInterface.get("direction") === "capture" ? RoutingDiagramDimensions.getAudioInterfaceWidth() * -0.25 : RoutingDiagramDimensions.getAudioInterfaceWidth() * 1.25}
                    y="12"
                    textAnchor={audioInterface.get("direction") === "capture" ? "end" : "start"}
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

    // Do any operation on clients so the lazy map() above is actually triggered
    clientsDiagram.toJS();

    // Render link rules, filter out only these for which we know coordinates
    // (in case we got from the server more data than needed) and these
    // which link from audio interface to audio interface (as they may support
    // other types of linking later on).
    let linkRulesDiagram = this.props.linkRules
      .filter((linkRule) => {
        return (
          linkCoordinates.hasOwnProperty(linkRule.get("source_audio_interface_id")) ||
          linkCoordinates.hasOwnProperty(linkRule.get("destination_audio_interface_id"))
        ) && (
          linkRule.get("source_audio_interface_id") !== null &&
          linkRule.get("destination_audio_interface_id") !== null
        );
      })
      .map((linkRule) => {
        // Determine associated audio interfaces
        let sourceAudioInterface = this.props.audioInterfaces.find((audioInterface) => { return audioInterface.get("id") === linkRule.get("source_audio_interface_id"); });
        let destinationAudioInterface = this.props.audioInterfaces.find((audioInterface) => { return audioInterface.get("id") === linkRule.get("destination_audio_interface_id"); });

        // Cache some values
        let linkRuleSourceX = linkCoordinates[linkRule.get("source_audio_interface_id")].x;
        let linkRuleSourceY = linkCoordinates[linkRule.get("source_audio_interface_id")].y;
        let linkRuleDestinationX = linkCoordinates[linkRule.get("destination_audio_interface_id")].x;
        let linkRuleDestinationY = linkCoordinates[linkRule.get("destination_audio_interface_id")].y;


        // Compute coordinates of starting point
        let startPoint = `${linkRuleSourceX} ${linkRuleSourceY}`;

        // Compute coordinates of points that make curve near starting point
        let startAnchorXOffset;
        if(sourceAudioInterface.get("direction") === "playback") {
          startAnchorXOffset = RoutingDiagramDimensions.getLinkAnchorDistance() * -1;
        } else {
          startAnchorXOffset = RoutingDiagramDimensions.getLinkAnchorDistance();
        }
        let startAnchorH = `${linkRuleSourceX + startAnchorXOffset} ${linkRuleSourceY}`;

        let startAnchorV;
        if(linkRuleSourceY > linkRuleDestinationY) {
          startAnchorV = `${linkRuleSourceX + startAnchorXOffset} ${linkRuleSourceY - RoutingDiagramDimensions.getLinkAnchorDistance()}`;
        } else {
          startAnchorV = `${linkRuleSourceX + startAnchorXOffset} ${linkRuleSourceY + RoutingDiagramDimensions.getLinkAnchorDistance()}`;
        }


        // Compute coordinates of points that make curve near stopping point
        let stopAnchorXOffset;
        if(destinationAudioInterface.get("direction") === "playback") {
          stopAnchorXOffset = RoutingDiagramDimensions.getLinkAnchorDistance() * -1;
        } else {
          stopAnchorXOffset = RoutingDiagramDimensions.getLinkAnchorDistance();
        }
        let stopAnchorH = `${linkRuleDestinationX + stopAnchorXOffset} ${linkRuleDestinationY}`;

        let stopAnchorV;
        if(linkRuleSourceY < linkRuleDestinationY) {
          stopAnchorV = `${linkRuleDestinationX + stopAnchorXOffset} ${linkRuleDestinationY - RoutingDiagramDimensions.getLinkAnchorDistance()}`;
        } else {
          stopAnchorV = `${linkRuleDestinationX + stopAnchorXOffset} ${linkRuleDestinationY + RoutingDiagramDimensions.getLinkAnchorDistance()}`;
        }

        // Compute coordinates of stopping point
        let stopPoint = `${linkRuleDestinationX} ${linkRuleDestinationY}`;


        // Render path
        return (
          <path key={`link-rule-${linkRule.get("id")}`}
            d={`M ${startPoint}
                L ${startAnchorH}
                L ${startAnchorV}
                L ${stopAnchorV}
                L ${stopAnchorH}
                L ${stopPoint}`}
            strokeWidth="2"
            stroke="red"
            fill="none" />
          );
      });


    // Render whole canvas, clients above link rules
    return (
      <svg version="1.1" height="600" width="100%">
        <g>
          {linkRulesDiagram}
        </g>
        <g>
          {clientsDiagram}
        </g>
      </svg>
    );
  }
});
