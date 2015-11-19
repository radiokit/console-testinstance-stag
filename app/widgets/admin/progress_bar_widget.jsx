import React from 'react';


export default React.createClass({
  propTypes: {
    type: React.PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
    position: React.PropTypes.number.isRequired,
    max: React.PropTypes.number.isRequired,
    label: React.PropTypes.string,
  },


  getDefaultProps: function() {
    return {
      position: 0,
      max: 100,
    }
  },


  render: function() {
    let klass;
    if(this.props.type) {
      klass = "progress-bar progress-bar-" + this.props.type;
    } else {
      klass = "progress-bar";
    }

    return (
      <div className="progress">
        <div className={klass} role="progressbar" aria-valuenow={this.props.position} aria-valuemin="0" aria-valuemax={this.props.max} style={{width: (this.props.position / this.props.max * 100) + "%"}}>
          <span className="sr-only">{this.props.label}</span>
        </div>
      </div>
    );
  }
});
