import React from 'react';

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
import TableCellFile from './table_cell_file.jsx';
import TableCellImage from './table_cell_image.jsx';
import TableCellScopeUserAccount from './table_cell_scope_user_account.jsx';
import TableCellScopeOrganizationAccount from './table_cell_scope_organization_account.jsx';
import TableCellScopeBroadcastChannel from './table_cell_scope_broadcast_channel.jsx';
import TableCellReferenceClientUser from './TableCellReferenceClientUser.jsx';
import TableCellPlayButton from './table_cell_play_button.jsx';

import RenderHelper from '../../helpers/render_helper.js';


const TableCellWidget = (props) => {
  let value;
  let cellKlass = `cell-${props.attributeConfig.renderer}`;
  let cellKey = `cell-${props.attributeName}`;
  if (props.onClick) {
    cellKlass += ' clickable';
  }


  if (typeof(props.attributeConfig.valueFunc) === 'function') {
    value = props.attributeConfig.valueFunc(props.record, props.attributeName);
  } else {
    value = props.record.get(props.attributeName);
  }

  let cell;
  if(typeof(props.attributeConfig.renderer) === 'function') {
    let cellProps = {
              record: props.record,
              attribute: props.attributeName,
              value: value,
              ...props.attributeConfig.props};

    cell = React.createElement(
      props.attributeConfig.renderer,
      cellProps);

    return (<td onClick={props.onClick} className={`cell-${props.attributeConfig.cellClassName}`} key={cellKey}>{cell}</td>);

  } else {
    if (value !== null ||
      props.attributeConfig.renderer === 'peakmeter' ||
      props.attributeConfig.renderer === 'lambda' ||
      props.attributeConfig.renderer === 'scope-user-account' ||
      props.attributeConfig.renderer === 'scope-organization-account' ||
      props.attributeConfig.renderer === 'scope-broadcast-channel' ||
      props.attributeConfig.renderer === 'reference-client-user') {

      switch (props.attributeConfig.renderer) {
        case 'lambda':
          cell = (
            <TableCellLambda {...props.attributeConfig.props}
              record={props.record}
              attribute={props.attributeName}
              value={value}
            />);
          break;

        case 'counter':
          cell = (
            <TableCellCounter {...props.attributeConfig.props}
              record={props.record}
              attribute={props.attributeName}
              value={value}
            />);
          break;

        case 'string':
          cell = (
            <TableCellString {...props.attributeConfig.props}
              record={props.record}
              attribute={props.attributeName}
              value={value}
            />);
          break;

        case 'boolean':
          cell = (
            <TableCellBoolean {...props.attributeConfig.props}
              record={props.record}
              attribute={props.attributeName}
              value={value}
            />);
          break;

        case 'image':
          cell = (
            <TableCellImage {...props.attributeConfig.props}
              record={props.record}
              attribute={props.attributeName}
              value={value}
            />);
          break;

        case 'file':
          cell = (
            <TableCellFile {...props.attributeConfig.props}
              record={props.record}
              attribute={props.attributeName}
              value={value}
            />);
          break;

        case 'db':
          cell = (
            <TableCellDb {...props.attributeConfig.props}
              record={props.record}
              attribute={props.attributeName}
              value={value}
            />);
          break;

        case 'url':
          cell = (
            <TableCellUrl {...props.attributeConfig.props}
              record={props.record}
              attribute={props.attributeName}
              value={value}
            />);
          break;

        case 'text':
          cell = (
            <TableCellText {...props.attributeConfig.props}
              record={props.record}
              attribute={props.attributeName}
              value={value}
            />);
          break;

        case 'float':
          cell = (
            <TableCellFloat {...props.attributeConfig.props}
              record={props.record}
              attribute={props.attributeName}
              value={value}
            />);
          break;

        case 'integer':
          cell = (
            <TableCellInteger {...props.attributeConfig.props}
              record={props.record}
              attribute={props.attributeName}
              value={value}
            />);
          break;

        case 'percent':
          cell = (
            <TableCellPercent {...props.attributeConfig.props}
              record={props.record}
              attribute={props.attributeName}
              value={value}
            />);
          break;

        case 'duration':
          cell = (
            <TableCellDuration {...props.attributeConfig.props}
              record={props.record}
              attribute={props.attributeName}
              value={value}
            />);
          break;

        case 'date':
          cell = (
            <TableCellDate {...props.attributeConfig.props}
              record={props.record}
              attribute={props.attributeName}
              value={value}
            />);
          break;

        case 'datetime':
          cell = (
            <TableCellDateTime {...props.attributeConfig.props}
              record={props.record}
              attribute={props.attributeName}
              value={value}
            />);
          break;

        case 'time':
          cell = (
            <TableCellTime {...props.attributeConfig.props}
              record={props.record}
              attribute={props.attributeName}
              value={value}
            />);
          break;

        case 'icon':
          cell = (
            <TableCellIcon {...props.attributeConfig.props}
              record={props.record}
              attribute={props.attributeName}
              value={value}
            />);
          break;

        case 'toggle':
          cell = (
            <TableCellToggle {...props.attributeConfig.props}
              record={props.record}
              attribute={props.attributeName}
              value={value}
            />);
          break;

        case 'peakmeter':
          cell = (
            <TableCellPeakmeter {...props.attributeConfig.props}
              record={props.record}
              attribute={props.attributeName}
            />);
          break;

        case 'filesize':
          cell = (
            <TableCellFileSize {...props.attributeConfig.props}
              record={props.record}
              attribute={props.attributeName}
              value={value}
            />);
          break;

        // FIXME deprecated, use scope-organization-account instead
        case 'scope-user-account':
          cell = (
            <TableCellScopeUserAccount {...props.attributeConfig.props}
              record={props.record}
            />);
          break;

        case 'scope-organization-account':
          cell = (
            <TableCellScopeOrganizationAccount {...props.attributeConfig.props}
              record={props.record}
            />);
          break;

        case 'scope-broadcast-channel':
          cell = (
            <TableCellScopeBroadcastChannel {...props.attributeConfig.props}
              record={props.record}
            />);
          break;

        case 'reference-client-user':
          cell = (
            <TableCellReferenceClientUser {...props.attributeConfig.props}
              record={props.record}
            />);
          break;

        case 'play':
          cell = (
            <TableCellPlayButton {...props.attributeConfig.props}
              record={props.record}
              attribute={props.attributeName}
              value={value}
            />);
          break;

        default:
          throw new Error(`Unknown table cell renderer ${props.attributeConfig.renderer}`);
      }
    }
    return (<td onClick={props.onClick} className={cellKlass} key={cellKey}>{cell}</td>);
  }
  return (<td onClick={props.onClick} className={cellKlass} key={cellKey} />);
};

TableCellWidget.propTypes = {
  attributeName: React.PropTypes.string.isRequired,
  attributeConfig: React.PropTypes.object.isRequired,
  record: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func,
};

export default TableCellWidget;
