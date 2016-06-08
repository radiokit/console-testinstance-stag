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
    onSort: React.PropTypes.func,
    actions: React.PropTypes.arrayOf(React.PropTypes.string),
    records: React.PropTypes.object.isRequired,
    sortedAttribute: React.PropTypes.string,
    sortedDirection: React.PropTypes.string,
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


  onSort: function(attribute, direction) {
    if(this.props.onSort) {
      this.props.onSort(attribute, direction);
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
          let label;

          if(this.props.attributes[attribute].headerText) {
            label = this.props.attributes[attribute].headerText;

          } else {
            label = <Translate component="span" content={this.props.contentPrefix + ".header." + attribute} />;
          }

          if(this.props.attributes[attribute].sortable === true) {
            if(this.props.sortedAttribute === attribute) {
              if(this.props.sortedDirection === "asc") {
                label = <a onClick={this.onSort.bind(this, attribute, "desc")}>{label}&nbsp;<i className="mdi mdi-chevron-up" /></a>;
              } else {
                label = <a onClick={this.onSort.bind(this, attribute, "asc")}>{label}&nbsp;<i className="mdi mdi-chevron-down" /></a>;
              }

            } else {
              label = <a onClick={this.onSort.bind(this, attribute, "asc")}>{label}</a>;
            }
          }

          return (<th key={"cell-" + attribute}>{label}</th>);
        })}

        {this.props.actions.map((action) => {
          return <th key={"action-" + action} />
        })}
      </tr>
    </thead>);
  }
});
