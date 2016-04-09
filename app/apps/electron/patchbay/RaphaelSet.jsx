import React from 'react';


export default React.createClass({
  propTypes: {
    attrs: React.PropTypes.object,
  },


  contextTypes: {
    paper: React.PropTypes.object.isRequired,
  },


  componentDidMount: function() {
    this.set = this.context.paper.set();

    if(this.props.attrs) {
      for(let attrKey of Object.keys(this.props.attrs)) {
        this.set.attr(attrKey, this.props.attrs[attrKey]);
      }
    }
  },


  componentWillReceiveProps: function(nextProps) {
    // TODO apply attrs
  },


  componentWillUnmount: function() {
    this.set.remove();
    delete this.set;
  },


  render: function() {
    return (
      <div>
        {this.props.children.map((child) => {
          return React.cloneElement(child);
        })}
      </div>
    );
  }
});
