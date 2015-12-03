import React from 'react';
import Translate from 'react-translate-component';

import TableSelector from './table_selector_widget.jsx';


export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    attributes: React.PropTypes.object.isRequired,
    selectable: React.PropTypes.bool,
    headerSelected: React.PropTypes.bool,
    onSelectAll: React.PropTypes.func,
    actions: React.PropTypes.arrayOf(React.PropTypes.string),
    records: React.PropTypes.object.isRequired
  },


  getDefaultProps: function() {
    return {
      actions: [],
      selectable: false,
      headerSelected: false,
    }
  },


  onSelect: function(state) {
    if(this.props.onSelectAll) {
      this.props.onSelectAll(state);
    }
  },


  renderSelector: function(record) {
    if(this.props.selectable) {
      return (<TableSelector header={true} onSelect={this.onSelect} selected={this.props.records.count() !== 0 && this.props.headerSelected} />);
    }
  },


  render: function() {
    return (<thead>
      <tr>
        {this.renderSelector()}
        {Object.keys(this.props.attributes).map((attribute) => {
          if(this.props.attributes[attribute].headerText) {
            return (<th key={"cell-" + attribute}>{this.props.attributes[attribute].headerText}</th>);

          } else {
            return (<Translate key={"cell-" + attribute} component="th" content={this.props.contentPrefix + ".header." + attribute} />);
          }
        })}

        {this.props.actions.map((action) => {
          return <th key={"action-" + action} />
        })}
      </tr>
    </thead>);
  }
});
