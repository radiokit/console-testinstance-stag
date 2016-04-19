export default {
  SCREEN_XS: 480,
  SCREEN_SM: 768,
  SCREEN_MD: 992,
  SCREEN_LG: 1200,

  isWindowXs() {
    return window.innerWidth <= this.SCREEN_XS;
  },

  isWindowSm() {
    return window.innerWidth <= this.SCREEN_SM;
  },

  isWindowMd() {
    return window.innerWidth <= this.SCREEN_MD;
  },

  isWindowLg() {
    return window.innerWidth <= this.SCREEN_LG;
  },
};
