import React from 'react';
import Joint from 'jointjs';
import Immutable from 'immutable';
import { Data } from 'radiokit-api';

import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Loading from '../../../widgets/general/loading_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';
import Alert from '../../../widgets/admin/alert_widget.jsx';
import VolumeTracker from '../../../widgets/general/volume_tracker_widget.jsx';


export default React.createClass({
  contextTypes: {
    currentUserAccount: React.PropTypes.object.isRequired,
  },


  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
  },


  componentDidMount: function() {
    let graph = new Joint.dia.Graph();

    let paper = new Joint.dia.Paper({
        el: this.refs.paper,
        width: 1000,
        height: 400,
        model: graph,
        gridSize: 1
    });

    let rect = new Joint.shapes.basic.Rect({
        position: { x: 100, y: 30 },
        size: { width: 100, height: 30 },
        attrs: { rect: { fill: 'blue' }, text: { text: 'my box', fill: 'white' } }
    });

    let rect2 = rect.clone();
    rect2.translate(300);

    let link = new Joint.dia.Link({
        source: { id: rect.id },
        target: { id: rect2.id }
    });

    graph.addCells([rect, rect2, link]);
  },


  render: function() {
    return (
      <div ref="paper" style={{width: "100%", height: "400px", background: "yellow"}}/>
    );

  }
});
