import React from 'react';
import Translate from 'react-translate-component';

import TableSelector from './table_selector_widget.jsx';


export default React.createClass({
  propTypes: {
    attributes: React.PropTypes.object.isRequired,
    selectable: React.PropTypes.bool,
    headerSelected: React.PropTypes.bool,
    onHeaderSelect: React.PropTypes.func,
    actions: React.PropTypes.arrayOf(React.PropTypes.string),
  },


  getDefaultProps: function() {
    return {
      actions: [],
      selectable: false,
      headerSelected: false,
    }
  },


  onSelect: function(state) {
    if(this.props.onHeaderSelect) {
      this.props.onHeaderSelect(state);
    }
  },


  renderSelector: function(record) {
    if(this.props.selectable) {
      return (<TableSelector header={true} onSelect={this.onSelect} selected={this.props.headerSelected} />);
    }
  },


  render: function() {
    return (<thead>
      <tr>
        {this.renderSelector()}
        {Object.keys(this.props.attributes).map((attribute) => {
          if(this.props.attributes[attribute].headerText) {
            return (<th key={"cell-" + attribute}>{this.props.attributes[attribute].headerText}</th>);

          // FIXME fix determining automatic name
          // } else if(this.props.attributes[attribute].headerTextKey) {
          //   return <Translate key={"cell-" + attribute} component="th" content={this.props.attributes[attribute].headerTextKey} />

          } else {
            return (<th key={"cell-" + attribute}>{attribute}</th>);
          }
        })}

        {this.props.actions.map((action) => {
          return <th key={"action-" + action} />
        })}
      </tr>
    </thead>);
  }
});
