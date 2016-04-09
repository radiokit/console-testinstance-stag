import React from 'react';


export default React.createClass({
  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    text: React.PropTypes.string.isRequired,
    attrs: React.PropTypes.object,
  },


  contextTypes: {
    paper: React.PropTypes.object.isRequired,
  },


  componentDidMount: function() {
    this.text = this.context.paper.text(this.props.x, this.props.y, this.props.text);

    if(this.props.attrs) {
      for(let attrKey of Object.keys(this.props.attrs)) {
        this.text.attr(attrKey, this.props.attrs[attrKey]);
      }
    }
  },


  componentWillReceiveProps: function(nextProps) {
    if(this.props.x !== nextProps.x) {
      this.text.attr("x", nextProps.x);
    }

    if(this.props.y !== nextProps.y) {
      this.text.attr("y", nextProps.y);
    }

    if(this.props.text !== nextProps.text) {
      this.text.attr("text", nextProps.text);
    }

    // TODO apply attrs
  },


  componentWillUnmount: function() {
    this.text.remove();
    delete this.text;
  },


  render: function() {
    return (
      <div/>
    );
  }
});
