import React from 'react';
import ReactDOM from 'react-dom';
import Joint from 'jointjs';
import Immutable from 'immutable';
import { Data } from 'radiokit-api';

const CLIENTS_PER_COL = 4;

const ClientLinkDiagram = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired,
  },
  componentWillMount() {
    this._clients = new Map();
  },
  componentDidMount() {
    this.graph = new Joint.dia.Graph;
    new Joint.dia.Paper({
      el: ReactDOM.findDOMNode(this.refs.paper),
      model: this.graph
    })
    this.updateGraph(Immutable.Map(), this.props.data || Immutable.Map())
  },
  componentDidUpdate(oldProps) {
    this.updateGraph(oldProps.data || Immutable.Map(), this.props.data || Immutable.Map());
  },
  reservePosition() {
    let idx = this._clientCounter || 0;
    this._clientCounter = idx+1;
    return {
      x: 140 + Math.floor(idx/CLIENTS_PER_COL) * 220,
      y: 10 + idx%CLIENTS_PER_COL*150
    }
  },
  addClient(neu) {
    let interfaces = neu.get('interfaces') || Immutable.Seq();
    let model = new Joint.shapes.devs.Model({
      position: this.reservePosition(),
      size: {width: 120, height: 130},
      inPorts: interfaces.filter(i=>i.get('direction') === 'capture').map(i=>i.get('name')).toJS(),
      outPorts: interfaces.filter(i=>i.get('direction') === 'playback').map(i=>i.get('name')).toJS(),
      attrs: {
        '.label': { text: neu.get('name'), 'ref-x': .4, 'ref-y': .2 },
        rect: { fill: '#2ECC71' },
        '.inPorts circle': { fill: '#16A085', magnet: 'passive', type: 'input' },
        '.outPorts circle': { fill: '#E74C3C', type: 'output' }
      }
    });
    this.graph.addCell(model);
    this._clients.set(neu.get("id"), model);

  },
  removeClient(old) {
    let id = old.get("id");
    let element = this._clients.get(id);
    this._clients.set(id, undefined);
    element.remove();
  },
  updateClient(old, neu) {
    let id = old.get("id");
    let element = this._clients.get(id);


    let interfaces = neu.get('interfaces');
    if(interfaces) {
      interfaces = interfaces.valueSeq();
    } else {
      interfaces = Immutable.Seq();
    }
    element.set('inPorts', interfaces.filter(i=>i.get('direction') === 'capture').map(i=>i.get('name')).toJS());
    element.set('outPorts', interfaces.filter(i=>i.get('direction') === 'playback').map(i=>i.get('name')).toJS());
    //element.updatePortsAttrs();
  },

  updateGraph(oldData, data) {
    if(data.size === 0) {
      this._clientCounter = 0;
    }
    let clientIDs = Immutable.Set(Immutable.Seq(data.keys()).concat(Immutable.Seq(oldData.keys())));

    for (let id of clientIDs) {
      let old = oldData.get(id);
      let neu = data.get(id);
      if (old && neu) {
        this.updateClient(old, neu);
      } else if (old) {
        this.removeClient(old);
      } else if (neu) {
        this.addClient(neu);
      } else {
        console.error("This should not happen. Check for cosmic radiation.");
      }
    }
  },

  render: function() {
    return (
      <div ref="paper" style={{backgroundColor: "white"}}/>
    );

  }
});

export default ClientLinkDiagram;
