import React from 'react';

import TableCell from './table_cell_widget.jsx';
import TableSelector from './table_selector_widget.jsx';

export default React.createClass({
  propTypes: {
    attributes: React.PropTypes.object.isRequired,
    actions: React.PropTypes.arrayOf(React.PropTypes.string),
    selectable: React.PropTypes.bool,
    selected: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    record: React.PropTypes.object.isRequired
  },


  getDefaultProps: function() {
    return {
      actions: [],
      selectable: false,
      selected: false
    }
  },


  onSelect: function(state) {
    if(this.props.onSelect) {
      this.props.onSelect(state, this.props.record);
    }
  },


  renderSelector: function(record) {
    if(this.props.selectable) {
      return (<TableSelector onSelect={this.onSelect} selected={this.props.selected} />);
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
    let klass;
    if(this.props.selected) {
      klass = "warning";
    }

    return (
      <tr className={klass}>
        {this.renderSelector()}
        {Object.keys(this.props.attributes).map((attribute) => { return <TableCell key={attribute} attributeName={attribute} attributeConfig={this.props.attributes[attribute]} record={this.props.record} />; })}
        {this.props.actions.map((action) => { return this.renderAction(this.props.record, action) })}
      </tr>
    );
  }
});
