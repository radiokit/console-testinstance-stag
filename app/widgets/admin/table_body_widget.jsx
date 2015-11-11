import React from 'react';

import TableCellText from './table_cell_text.jsx';

export default React.createClass({
  propTypes: {
    attributes: React.PropTypes.object.isRequired,
    actions: React.PropTypes.arrayOf(React.PropTypes.string),
    records: React.PropTypes.object.isRequired
  },


  getDefaultProps: function() {
    return {
      actions: []
    }
  },


  renderRow: function(record) {
    return (
      <tr key={record.get("id")}>
        {Object.keys(this.props.attributes).map((attribute) => { return this.renderCell(record, attribute) })}
        {this.props.actions.map((action) => { return this.renderAction(record, action) })}
      </tr>
    );
  },


  renderCell: function(record, attribute) {
    let attributeConfig = this.props.attributes[attribute];
    let value = record.get(attribute);
    let cell;

    switch(attributeConfig.renderer) {
      case "text":
        cell = (<TableCellText {...attributeConfig.props} record={record} attributeName={attribute}>{value}</TableCellText>);
        break;

      default:
        throw new Error("Unknown table cell renderer '" + attributeConfig.renderer + "'");
    }

    return (<td key={"cell-" + attribute}>{cell}</td>);
  },


  renderAction: function(record, action) {
    var actionBody;

    switch(action) {
      case "delete":
        actionBody = (<button type="button" className="btn btn-icon-toggle" data-toggle="tooltip" data-placement="top" data-original-title="Delete"><i className="mdi mdi-delete"/></button>)
        break;
    }

    return (<td key={"action-" + action} className="text-right">{actionBody}</td>);
  },


  render: function() {
    return (
      <tbody>
        {this.props.records.map((record) => { return this.renderRow(record); })}
      </tbody>
    );
  }
});
