import React from 'react';
import { Link } from 'react-router';

import TableCellString from './table_cell_string.jsx';
import TableCellDb from './table_cell_db.jsx';
import TableCellUrl from './table_cell_url.jsx';
import TableCellText from './table_cell_text.jsx';
import TableCellFloat from './table_cell_float.jsx';
import TableCellInteger from './table_cell_integer.jsx';
import TableCellDuration from './table_cell_duration.jsx';
import TableCellDate from './table_cell_date.jsx';
import TableCellDateTime from './table_cell_datetime.jsx';
import TableCellTime from './table_cell_time.jsx';

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
    let value;
    if(typeof(attributeConfig.valueFunc) === "function") {
      value = attributeConfig.valueFunc(record, attribute);

    } else {
      value = record.get(attribute);
    }
    let cell;


    switch(attributeConfig.renderer) {
      case "string":
        cell = (<TableCellString {...attributeConfig.props} record={record} attribute={attribute} value={value}/>);
        break;

      case "db":
        cell = (<TableCellDb {...attributeConfig.props} record={record} attribute={attribute} value={value} />);
        break;

      case "url":
        cell = (<TableCellUrl {...attributeConfig.props} record={record} attribute={attribute} value={value} />);
        break;

      case "text":
        cell = (<TableCellText {...attributeConfig.props} record={record} attribute={attribute} value={value} />);
        break;

      case "float":
        cell = (<TableCellFloat {...attributeConfig.props} record={record} attribute={attribute} value={value} />);
        break;

      case "integer":
        cell = (<TableCellInteger {...attributeConfig.props} record={record} attribute={attribute} value={value} />);
        break;

      case "duration":
        cell = (<TableCellDuration {...attributeConfig.props} record={record} attribute={attribute} value={value} />);
        break;

      case "date":
        cell = (<TableCellDate {...attributeConfig.props} record={record} attribute={attribute} value={value} />);
        break;

      case "datetime":
        cell = (<TableCellDateTime {...attributeConfig.props} record={record} attribute={attribute} value={value} />);
        break;

      case "time":
        cell = (<TableCellTime {...attributeConfig.props} record={record} attribute={attribute} value={value} />);
        break;


      default:
        throw new Error("Unknown table cell renderer '" + attributeConfig.renderer + "'");
    }

    if(typeof(attributeConfig.linkFunc) === "function") {
      return (<td key={"cell-" + attribute}><Link to={attributeConfig.linkFunc(record)}>{cell}</Link></td>);

    } else {
      return (<td key={"cell-" + attribute}>{cell}</td>);
    }
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
