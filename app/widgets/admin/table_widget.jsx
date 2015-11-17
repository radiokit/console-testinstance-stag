import React from 'react';

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
      headerSelected: false
    }
  },


  onHeaderSelect: function(state) {
    console.log("HEADER");
    console.log(state);
    // this.setState({ headerSelected: true });
  },


  onRowSelect: function(state, record) {
    console.log("ROW");
    console.log(state);
    console.log(record.toJS());
  },


  render: function() {
    return (<table className="table table-hover">
      <TableHeader attributes={this.props.attributes} contentPrefix={this.props.contentPrefix} selectable={this.props.selectable} onHeaderSelect={this.onHeaderSelect} />
      <TableBody attributes={this.props.attributes} records={this.props.records} selectable={this.props.selectable} headerSelected={this.state.headerSelected} onRowSelect={this.onRowSelect} />
    </table>);
  }
});
