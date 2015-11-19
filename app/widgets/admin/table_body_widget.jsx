import React from 'react';
import Immutable from 'immutable';

import TableRow from './table_row_widget.jsx';

export default React.createClass({
  propTypes: {
    attributes: React.PropTypes.object.isRequired,
    actions: React.PropTypes.arrayOf(React.PropTypes.string),
    selectable: React.PropTypes.bool,
    selectedRecordIds: React.PropTypes.object,
    onRowSelect: React.PropTypes.func,
    records: React.PropTypes.object.isRequired
  },


  getDefaultProps: function() {
    return {
      actions: [],
      selectable: false,
      selectedRecordIds: new Immutable.Seq().toIndexedSeq(),
    }
  },


  onRowSelect: function(state, record) {
    if(this.props.onRowSelect) {
      this.props.onRowSelect(state, record);
    }
  },


  render: function() {
    return (
      <tbody>
        {this.props.records.map((record) => { return <TableRow key={record.get("id")} onSelect={this.onRowSelect} selected={this.props.selectedRecordIds.includes(record.get("id"))} record={record} attributes={this.props.attributes} actions={this.props.actions} headerSelected={this.props.headerSelected} selectable={this.props.selectable} />; })}
      </tbody>
    );
  }
});
