import React from 'react';

import TableRow from './table_row_widget.jsx';

export default React.createClass({
  propTypes: {
    attributes: React.PropTypes.object.isRequired,
    actions: React.PropTypes.arrayOf(React.PropTypes.string),
    selectable: React.PropTypes.bool,
    headerSelected: React.PropTypes.bool,
    onRowSelect: React.PropTypes.func,
    records: React.PropTypes.object.isRequired
  },


  getDefaultProps: function() {
    return {
      actions: [],
      selectable: false,
      headerSelected: false
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
        {this.props.records.map((record) => { return <TableRow key={record.get("id")} onRowSelect={this.onRowSelect} record={record} attributes={this.props.attributes} actions={this.props.actions} selectable={this.props.selectable} />; })}
      </tbody>
    );
  }
});
