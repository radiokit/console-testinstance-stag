import React from 'react';
import ReactDOM from 'react-dom';

// based on http://stackoverflow.com/questions/32139455/indeterminate-checkbox-in-react-jsx

export default React.createClass({
  componentDidMount: function() {
    if (this.props.indeterminate === true) {
      console.log("DID MOUNT TRUE")
      this.setIndeterminate(true);
    }
  },


  componentDidUpdate: function(previousProps) {
    if (previousProps.indeterminate !== this.props.indeterminate) {
      this.setIndeterminate(this.props.indeterminate);
    }
  },


  setIndeterminate: function(indeterminate) {
    const node = ReactDOM.findDOMNode(this);
    node.indeterminate = indeterminate;
  },


  render: function() {
    const { indeterminate, type, ...props } = this.props;
    return <input type="checkbox" {...props} />;
  }
});
