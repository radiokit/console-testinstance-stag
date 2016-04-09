import React from 'react';


export default React.createClass({
  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    attrs: React.PropTypes.object,
  },


  contextTypes: {
    paper: React.PropTypes.object.isRequired,
  },


  componentDidMount: function() {
    this.rect = this.context.paper.rect(this.props.x, this.props.y, this.props.width, this.props.height);

    if(this.props.attrs) {
      for(let attrKey of Object.keys(this.props.attrs)) {
        this.rect.attr(attrKey, this.props.attrs[attrKey]);
      }
    }
  },


  componentWillReceiveProps: function(nextProps) {
    if(this.props.x !== nextProps.x) {
      this.rect.attr("x", nextProps.x);
    }

    if(this.props.y !== nextProps.y) {
      this.rect.attr("y", nextProps.y);
    }

    if(this.props.width !== nextProps.width) {
      this.rect.attr("width", nextProps.width);
    }

    if(this.props.height !== nextProps.height) {
      this.rect.attr("height", nextProps.height);
    }

    // TODO apply attrs
  },


  componentWillUnmount: function() {
    this.rect.remove();
    delete this.rect;
  },


  render: function() {
    return (
      <div/>
    );
  }
});
