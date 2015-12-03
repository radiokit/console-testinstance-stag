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
    attributeName: React.PropTypes.string.isRequired,
    attributeConfig: React.PropTypes.object.isRequired,
    record: React.PropTypes.object.isRequired
  },


  render: function() {
    let value;
    if(typeof(this.props.attributeConfig.valueFunc) === "function") {
      value = this.props.attributeConfig.valueFunc(this.props.record, this.props.attributeName);

    } else {
      value = this.props.record.get(this.props.attributeName);
    }

    if(value) {
      let cell;

      switch(this.props.attributeConfig.renderer) {
        case "counter":
          cell = (<TableCellString {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value.count()}/>);
          break;

        case "string":
          cell = (<TableCellString {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value}/>);
          break;

        case "db":
          cell = (<TableCellDb {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value} />);
          break;

        case "url":
          cell = (<TableCellUrl {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value} />);
          break;

        case "text":
          cell = (<TableCellText {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value} />);
          break;

        case "float":
          cell = (<TableCellFloat {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value} />);
          break;

        case "integer":
          cell = (<TableCellInteger {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value} />);
          break;

        case "duration":
          cell = (<TableCellDuration {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value} />);
          break;

        case "date":
          cell = (<TableCellDate {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value} />);
          break;

        case "datetime":
          cell = (<TableCellDateTime {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value} />);
          break;

        case "time":
          cell = (<TableCellTime {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value} />);
          break;


        default:
          throw new Error("Unknown table cell renderer '" + this.props.attributeConfig.renderer + "'");
      }

      if(typeof(this.props.attributeConfig.linkFunc) === "function") {
        return (<td key={"cell-" + this.props.attributeName}><Link to={this.props.attributeConfig.linkFunc(this.props.record)}>{cell}</Link></td>);

      } else {
        return (<td key={"cell-" + this.props.attributeName}>{cell}</td>);
      }
    } else {
      return (<td key={"cell-" + this.props.attributeName}/>);
    }
  }
});
