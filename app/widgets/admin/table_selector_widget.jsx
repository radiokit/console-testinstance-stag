import React from 'react';

export default React.createClass({
  propTypes: {
    selected: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    header: React.PropTypes.bool
  },


  getDefaultProps: function() {
    return {
      selected: false,
      header: false
    }
  },


  render: function() {
    if(this.props.header) {
      return (<th style={{width: "1ex"}}><input type="checkbox" checked={this.props.selected} onChange={(e) => { if(this.props.onSelect) { this.props.onSelect(e.target.checked); } }} /></th>);

    } else {
      return (<td style={{width: "1ex"}}><input type="checkbox" checked={this.props.selected} onChange={(e) => { if(this.props.onSelect) { this.props.onSelect(e.target.checked); } }} /></td>);
    }
  },
});
