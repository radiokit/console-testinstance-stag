import React from 'react';


export default React.createClass({
  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
  },


  childContextTypes: {
    paper: React.PropTypes.object,
  },


  getChildContext: function() {
    return {
      paper: this.state.paper,
    };
  },


  getInitialState: function() {
    return {
      paper: null,
    }
  },


  componentDidMount: function() {
    this.setState({
      paper: Raphael(this.refs.paper, this.props.width, this.props.height)
    });
  },


  componentWillUnmount: function() {
    if(this.state.paper) {
      delete this.state.paper;
    }
  },


  render: function() {
    if(this.state.paper) {
      return (
        <div ref="paper">
          {this.props.children.map((child) => {
            return React.cloneElement(child);
          })}
        </div>
      );

    } else {
      return <div ref="paper" />;
    }
  }
});
