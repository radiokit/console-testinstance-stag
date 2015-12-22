import React from 'react';
import Immutable from 'immutable';

import TableRow from './table_row_widget.jsx';

export default React.createClass({
  propTypes: {
    attributes: React.PropTypes.object.isRequired,
    actions: React.PropTypes.arrayOf(React.PropTypes.string),
    selectable: React.PropTypes.bool,
    selectedRecordIds: React.PropTypes.object,
    onSelectRecord: React.PropTypes.func,
    records: React.PropTypes.object.isRequired,
    linkFunc: React.PropTypes.func,
  },


  getDefaultProps: function() {
    return {
      actions: [],
      selectable: false,
      selectedRecordIds: new Immutable.Seq().toIndexedSeq(),
    }
  },


  onSelectRecord: function(state, record) {
    if(this.props.onSelectRecord) {
      this.props.onSelectRecord(state, record);
    }
  },


  render: function() {
    return (
      <tbody>
        {this.props.records.map((record) => { return <TableRow key={record.get("id")} linkFunc={this.props.linkFunc} onSelect={this.onSelectRecord} selected={this.props.selectedRecordIds.includes(record.get("id"))} record={record} attributes={this.props.attributes} actions={this.props.actions} headerSelected={this.props.headerSelected} selectable={this.props.selectable} />; })}
      </tbody>
    );
  }
});
