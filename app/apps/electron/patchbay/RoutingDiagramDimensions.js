export default {
  getHeaderHeight: function() {
    return 8;
  },


  getClientWidth: function() {
    return 200;
  },


  getClientHeight: function(audioInterfacesCount) {
    let height = audioInterfacesCount * (this.getAudioInterfaceHeight() + this.getAudioInterfaceMargin()) + this.getAudioInterfaceMargin() * 2;
    if(height < 60) {
      return 60;
    } else {
      return height;
    }
  },


  getAudioInterfaceHeight: function() {
    return 16;
  },


  getAudioInterfaceWidth: function() {
    return 16;
  },


  getAudioInterfaceMargin: function() {
    return 8;
  },
}
