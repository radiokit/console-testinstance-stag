import React from 'react';


import Spinner from 'spin.js';

export default React.createClass({
  


  componentDidMount: function() {
    let opts = {
        lines: 17 // The number of lines to draw
      , length: 10 // The length of each line
      , width: 5 // The line thickness
      , radius: 39 // The radius of the inner circle
      , scale: 0.25 // Scales overall size of the spinner
      , corners: 1 // Corner roundness (0..1)
      , color: '#000' // #rgb or #rrggbb or array of colors
      , opacity: 0.25 // Opacity of the lines
      , rotate: 0 // The rotation offset
      , direction: 1 // 1: clockwise, -1: counterclockwise
      , speed: 0.9 // Rounds per second
      , trail: 57 // Afterglow percentage
      , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
      , zIndex: 2e9 // The z-index (defaults to 2000000000)
      , className: 'spinner' // The CSS class to assign to the spinner
      , top: '50%' // Top position relative to parent
      , left: '50%' // Left position relative to parent
      , shadow: false // Whether to render a shadow
      , hwaccel: true // Whether to use hardware acceleration
      , position: 'absolute' // Element positioning
    }

    this.spinner = new Spinner(opts).spin(React.findDOMNode(this.refs.spinner));
  },


  componentWillUnmount: function() {
    this.spinner.stop();
  },


  render: function() {
    return <div ref="spinner"/>;
  }
});
