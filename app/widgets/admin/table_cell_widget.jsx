import React from 'react';
import { Link } from 'react-router';

import TableCellLambda from './table_cell_lambda.jsx';
import TableCellString from './table_cell_string.jsx';
import TableCellDb from './table_cell_db.jsx';
import TableCellUrl from './table_cell_url.jsx';
import TableCellCounter from './table_cell_counter.jsx';
import TableCellText from './table_cell_text.jsx';
import TableCellFloat from './table_cell_float.jsx';
import TableCellBoolean from './table_cell_boolean.jsx';
import TableCellInteger from './table_cell_integer.jsx';
import TableCellPercent from './table_cell_percent.jsx';
import TableCellDuration from './table_cell_duration.jsx';
import TableCellDate from './table_cell_date.jsx';
import TableCellDateTime from './table_cell_datetime.jsx';
import TableCellTime from './table_cell_time.jsx';
import TableCellIcon from './table_cell_icon.jsx';
import TableCellToggle from './table_cell_toggle.jsx';
import TableCellFileSize from './table_cell_filesize.jsx';
import TableCellPeakmeter from './table_cell_peakmeter.jsx';
import TableCellWaveform from './table_cell_waveform.jsx';
import TableCellFile from './table_cell_file.jsx';
import TableCellImage from './table_cell_image.jsx';
import TableCellScopeUserAccount from './table_cell_scope_user_account.jsx';
import TableCellScopeBroadcastChannel from './table_cell_scope_broadcast_channel.jsx';
import TableCellPlayButton from './table_cell_play_button.jsx';
import TableCellJournalAction from './table_cell_journal_action.jsx';
import TableCellJournalParams from './table_cell_journal_params.jsx';
import TableCellJournalProduct from './table_cell_journal_product.jsx';
import TableCellJournalSeverity from './table_cell_journal_severity.jsx';


export default React.createClass({
  propTypes: {
    attributeName: React.PropTypes.string.isRequired,
    attributeConfig: React.PropTypes.object.isRequired,
    record: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func,
  },


  render: function() {
    let value;
    let cellKlass = `cell-${this.props.attributeConfig.renderer}`;
    let cellKey = `cell-${this.props.attributeName}`;
    if(this.props.onClick) {
      cellKlass += " clickable";
    }


    if(typeof(this.props.attributeConfig.valueFunc) === "function") {
      value = this.props.attributeConfig.valueFunc(this.props.record, this.props.attributeName);

    } else {
      value = this.props.record.get(this.props.attributeName);
    }

    if(value !== null ||
      this.props.attributeConfig.renderer === "peakmeter" ||
      this.props.attributeConfig.renderer === "lambda" ||
      this.props.attributeConfig.renderer === "scope-user-account" ||
      this.props.attributeConfig.renderer === "scope-broadcast-channel") {
      let cell;

      switch(this.props.attributeConfig.renderer) {
        case "lambda":
          cell = (<TableCellLambda {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value}/>);
          break;

        case "counter":
          cell = (<TableCellCounter {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value}/>);
          break;

        case "string":
          cell = (<TableCellString {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value}/>);
          break;

        case "boolean":
          cell = (<TableCellBoolean {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value}/>);
          break;

        case "waveform":
          cell = (<TableCellWaveform {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value}/>);
          break;

        case "image":
          cell = (<TableCellImage {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value}/>);
          break;

        case "file":
          cell = (<TableCellFile {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value}/>);
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

        case "percent":
          cell = (<TableCellPercent {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value} />);
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

        case "icon":
          cell = (<TableCellIcon {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value} />);
          break;

        case "toggle":
          cell = (<TableCellToggle {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value} />);
          break;

        case "peakmeter":
          cell = (<TableCellPeakmeter {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} />);
          break;

        case "filesize":
          cell = (<TableCellFileSize {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value} />);
          break;

        case "scope-user-account":
          cell = (<TableCellScopeUserAccount {...this.props.attributeConfig.props} record={this.props.record} />);
          break;

        case "scope-broadcast-channel":
          cell = (<TableCellScopeBroadcastChannel {...this.props.attributeConfig.props} record={this.props.record} />);
          break;

        case "play":
          cell = (<TableCellPlayButton {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value} />);
          break;

        case "journal-action":
          cell = (<TableCellJournalAction {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value}/>);
          break;

        case "journal-params":
          cell = (<TableCellJournalParams {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value}/>);
          break;

        case "journal-product":
          cell = (<TableCellJournalProduct {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value}/>);
          break;


        case "journal-severity":
          cell = (<TableCellJournalSeverity {...this.props.attributeConfig.props} record={this.props.record} attribute={this.props.attributeName} value={value}/>);

          break;

        default:
          throw new Error("Unknown table cell renderer '" + this.props.attributeConfig.renderer + "'");
      }

      return (<td onClick={this.props.onClick} className={cellKlass} key={cellKey}>{cell}</td>);

    } else {
      return (<td onClick={this.props.onClick} className={cellKlass} key={cellKey}/>);
    }
  }
});
