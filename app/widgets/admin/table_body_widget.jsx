import React from 'react';


export default React.createClass({  
  propTypes: {
    attributes: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    records: React.PropTypes.object.isRequired
  },

  renderRow: function(record) {
    return (
      <tr key={record.get("id")}>
        {this.props.attributes.map((attribute) => { return this.renderCell(record, attribute) })}
      </tr>
    );
  },


  renderCell: function(record, attribute) {
    return (<td key={attribute}>{record.get(attribute)}</td>);
  },


  render: function() {
    return (
      <tbody>
        {this.props.records.map((record) => { return this.renderRow(record); })}    
      </tbody>
    );
  }
});