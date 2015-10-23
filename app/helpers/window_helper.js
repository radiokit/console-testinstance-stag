export default {
  SCREEN_XS: 480,
  SCREEN_SM: 768,
  SCREEN_MD: 992,
  SCREEN_LG: 1200,


  isWindowXs: function() {
    return window.innerWidth <= this.SCREEN_XS;
  },


  isWindowSm: function() {
    return window.innerWidth <= this.SCREEN_SM;
  },


  isWindowMd: function() {
    return window.innerWidth <= this.SCREEN_MD;
  },


  isWindowLg: function() {
    return window.innerWidth <= this.SCREEN_LG;
  }
}