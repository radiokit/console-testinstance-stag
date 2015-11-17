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
    selectable: React.PropTypes.bool,
    onSelect: React.PropTypes.func
  },


  getDefaultProps: function() {
    return {
      actions: [],
      selectable: false
    }
  },


  getInitialState: function() {
    return {
      selectedRecordIds: new Immutable.Seq().toIndexedSeq(),
    }
  },


  getAllRowIds: function() {
    return this.props.records.map((record) => { return record.get("id"); });
  },


  callOnSelect: function() {
    if(this.props.onSelect) {
      this.props.onSelect(this.props.records.filter((record) => { return this.state.selectedRecordIds.includes(record.get("id")); }));
    }
  },


  onHeaderSelect: function(state) {
    if(state === true) {
      this.setState({
        selectedRecordIds: this.getAllRowIds(),
        headerSelected: true
      }, () => { this.callOnSelect() });

    } else {
      this.setState({
        selectedRecordIds: new Immutable.Seq().toIndexedSeq(),
        headerSelected: false
      }, () => { this.callOnSelect() });
    }
  },


  onRowSelect: function(state, record) {
    if(state === true) {
      let newSelectedRowIds = this.state.selectedRecordIds.concat(Immutable.Seq.of(record.get("id")));
      let allRowIds = this.getAllRowIds();

      this.setState({
        selectedRecordIds: newSelectedRowIds,
        headerSelected: allRowIds.sort().equals(newSelectedRowIds.sort())
      }, () => { this.callOnSelect() });

    } else {
      this.setState({
        selectedRecordIds: this.state.selectedRecordIds.filterNot((id) => { return id === record.get("id"); }),
        headerSelected: false
      }, () => { this.callOnSelect() });
    }
  },


  render: function() {
    return (<table className="table table-hover">
      <TableHeader attributes={this.props.attributes} contentPrefix={this.props.contentPrefix} selectable={this.props.selectable} headerSelected={this.state.headerSelected} onHeaderSelect={this.onHeaderSelect} />
      <TableBody attributes={this.props.attributes} records={this.props.records} selectable={this.props.selectable} selectedRecordIds={this.state.selectedRecordIds} onRowSelect={this.onRowSelect} />
    </table>);
  }
});
