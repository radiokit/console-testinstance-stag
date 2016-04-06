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

import ClientLinkDiagram from './ClientLinkDiagram.jsx';

export default React.createClass({
  contextTypes: {
    currentUserAccount: React.PropTypes.object.isRequired,
  },
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
  },

  getInitialState() {
    return {};
  },

  handleFetch(_event, _query, data) {
    data = Immutable.Map(data.map(i => [i.get('id'), i]))
    this.setState({data})
    for(let [id, client] of data) {
      window.data.query("plumber", "Resource.Architecture.AudioInterface")
        .where("references", "deq", "owner", Data.buildRecordGlobalID("auth", "Client.Standalone", client.get("id")))
        .select("id", "name", "direction", "transmission_enabled", "os_name")
        .on("fetch", (_event, _query, interfaces) => {
          this.setState({
            data: this.state.data.setIn(
              [id, "interfaces"],
              Immutable.Map(interfaces.map(i => [i.get('id'), i]))
            )});
        }).fetch()
    }
  },

  initData() {
    console.log("DUPA");
    this.setState({data: undefined});
    this._query = window.data.query('auth', 'Client.Standalone').select('id', 'name').on('fetch', this.handleFetch).fetch()

  },
  componentWillMount() {
    this.setState({data: undefined});
    this.initData()
  },
  componentWillUnmount() {
    this._query.teardown();
  },

  getDiagramData() {
    return this.state.data;
  },
  renderInterfaces(item, idx) {
    if(!item.get('interfaces')) {
      return <div>Loading interfaces...</div>;
    }
    return (
      <ul>

        {item.get('interfaces').map((iface, idx) => (
          <li key={idx}>
            {iface.get('direction')}: {iface.get('name')}
          </li>
        ))}
      </ul>
    )
  },
  renderList() {
    let data = this.getDiagramData();
    if(!data) {
      return <div>Loading...</div>;
    }
    return (
      <ul>
        {data.map((item, idx) => (
          <li key={idx}>
            <h5>{item.get('name')}</h5>
            {this.renderInterfaces(item, idx)}
          </li>
        ))}
      </ul>
    )
  },
  render: function() {
    return (
      <div>
        <ClientLinkDiagram data={this.state.data}/>
        <button onClick={this.initData}>Refresh!</button>
        <div>{JSON.stringify(this.state.data)}</div>
        {this.renderList()}
      </div>
    );

  }
});
