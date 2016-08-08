import React from 'react';

import TableCell from './table_cell_widget.jsx';
import TableSelector from './table_selector_widget.jsx';

export default React.createClass({
  propTypes: {
    attributes: React.PropTypes.object.isRequired,
    selectable: React.PropTypes.bool,
    selected: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    record: React.PropTypes.object.isRequired,
    linkFunc: React.PropTypes.func,
  },


  getDefaultProps: function() {
    return {
      selectable: false,
      selected: false
    }
  },


  onSelect: function(state) {
    if(this.props.onSelect) {
      this.props.onSelect(state, this.props.record);
    }
  },


  onTableCellClick: function() {
    if(this.props.linkFunc) {
      this.props.linkFunc(this.props.record);
    }
  },


  renderSelector: function(record) {
    if(this.props.selectable) {
      return (<TableSelector onSelect={this.onSelect} selected={this.props.selected} />);
    }
  },


  render: function() {
    let klass;
    if(this.props.selected) {
      klass = "warning";
    }

    return (
      <tr className={klass}>
        {this.renderSelector()}
        {Object.keys(this.props.attributes).map((attribute) => { return <TableCell onClick={this.onTableCellClick} key={attribute} attributeName={attribute} attributeConfig={this.props.attributes[attribute]} record={this.props.record} />; })}
      </tr>
    );
  }
});
