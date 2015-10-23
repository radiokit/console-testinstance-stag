import React from 'react';

import TableBody from './table_body_widget.jsx';
import TableHeader from './table_header_widget.jsx';


export default React.createClass({  
  propTypes: {
    attributes: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
    records: React.PropTypes.object.isRequired
  },


  render: function() {
    return (<table className="table">
      <TableHeader attributes={this.props.attributes} contentPrefix={this.props.contentPrefix} />
      <TableBody attributes={this.props.attributes} records={this.props.records} />
    </table>);
  }
});