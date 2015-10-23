import WindowHelper from './window_helper.js';

export default {
  hideMenuBar: function() {
    if(!WindowHelper.isWindowMd()) {
      document.body.classList.remove('menubar-visible'); // FIXME we should not modify DOM nodes we don't own, stupid template!
    }
  },


  showMenuBar: function() {
    if(!WindowHelper.isWindowMd()) {
      document.body.classList.add('menubar-visible'); // FIXME we should not modify DOM nodes we don't own, stupid template!
    }
  }
}