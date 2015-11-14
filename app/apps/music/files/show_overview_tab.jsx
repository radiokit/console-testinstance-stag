import React from 'react';

export default React.createClass({
  propTypes: {
    currentFile: React.PropTypes.object.isRequired,
  },


  render: function() {
    return (
      <div>
        <img src="http://www.freddythunder.com/blog_images/wav2png2.png" style={{width: "100%", overflow: "hidden"}}/>  
      </div>
    );
  }
});
