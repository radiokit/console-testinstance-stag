export default {
  getClientWidth: function() {
    return 100;
  },


  getClientHeight: function(audioInterfacesCount) {
    return audioInterfacesCount * this.getAudioInterfaceHeight() + 100;
  },


  getAudioInterfaceHeight: function() {
    return 20;
  }
}
