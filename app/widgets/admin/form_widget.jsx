import React from 'react';


export default React.createClass({
  propTypes: {
    onSubmit: React.PropTypes.func
  },


  onSubmit: function(e) {
    e.preventDefault();
    this.props.onSubmit(e);
  },


  render: function() {
    return (<form className="form" role="form" onSubmit={this.onSubmit}>
      {this.props.children}
    </form>);
  }
});