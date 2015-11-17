import React from 'react';
import Immutable from 'immutable';

import TableBody from './table_body_widget.jsx';
import TableHeader from './table_header_widget.jsx';


export default React.createClass({
  propTypes: {
    attributes: React.PropTypes.object.isRequired,
    actions: React.PropTypes.arrayOf(React.PropTypes.element),
    contentPrefix: React.PropTypes.string.isRequired,
    records: React.PropTypes.object.isRequired,
    selectable: React.PropTypes.bool
  },


  getDefaultProps: function() {
    return {
      actions: [],
      selectable: false
    }
  },


  getInitialState: function() {
    return {
      selectedRowIds: new Immutable.Seq().toIndexedSeq(),
    }
  },


  getAllRowIds: function() {
    return this.props.records.map((record) => { return record.get("id"); });
  },


  onHeaderSelect: function(state) {
    if(state === true) {
      this.setState({
        selectedRowIds: this.getAllRowIds(),
        headerSelected: true
      });

    } else {
      this.setState({
        selectedRowIds: new Immutable.Seq().toIndexedSeq(),
        headerSelected: false
      });
    }
  },


  onRowSelect: function(state, record) {
    if(state === true) {
      let newSelectedRowIds = this.state.selectedRowIds.concat(Immutable.Seq.of(record.get("id")));
      let allRowIds = this.getAllRowIds();

      this.setState({
        selectedRowIds: newSelectedRowIds,
        headerSelected: allRowIds.sort().equals(newSelectedRowIds.sort())
      });

    } else {
      this.setState({
        selectedRowIds: this.state.selectedRowIds.filterNot((id) => { return id === record.get("id"); }),
        headerSelected: false
      });
    }
  },


  render: function() {
    return (<table className="table table-hover">
      <TableHeader attributes={this.props.attributes} contentPrefix={this.props.contentPrefix} selectable={this.props.selectable} headerSelected={this.state.headerSelected} onHeaderSelect={this.onHeaderSelect} />
      <TableBody attributes={this.props.attributes} records={this.props.records} selectable={this.props.selectable} selectedRowIds={this.state.selectedRowIds} onRowSelect={this.onRowSelect} />
    </table>);
  }
});
