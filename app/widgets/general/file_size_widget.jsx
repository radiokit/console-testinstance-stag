import React from 'react';

export default React.createClass({
  propTypes: {
    size: React.PropTypes.number.isRequired
  },

  SIZES: ['b', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],


  renderFileSize: function() {
    if(this.props.size == 0) {
      return "0 b"
    }

    var i = parseInt(Math.floor(Math.log(this.props.size) / Math.log(1024)));
    if(i == 0) {
      return this.props.size / Math.pow(1024, i) + ' ' + this.SIZES[0];

    } else {
      var valueFractional = (this.props.size / Math.pow(1024, i));
      if(i > 2) {
        var value = this.roundToOne(valueFractional);

      } else {
        var value = Math.round(valueFractional);
      }

      return value + ' ' + this.SIZES[i];
    }
  },


  roundToOne: function(num) {
    return +(Math.round(num + "e+1") + "e-1");
  },


  render: function() {
    return (
      <span>
        {this.renderFileSize()}
      </span>
    );
  }
});
