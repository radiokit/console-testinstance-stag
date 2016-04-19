import WindowHelper from './window_helper.js';

export default {
  hideMenuBar() {
    if (!WindowHelper.isWindowMd()) {
      // FIXME we should not modify DOM nodes we don't own, stupid template!
      document.body.classList.remove('menubar-visible');
    }
  },

  showMenuBar() {
    if (!WindowHelper.isWindowMd()) {
      // FIXME we should not modify DOM nodes we don't own, stupid template!
      document.body.classList.add('menubar-visible');
    }
  },

  toggleMenuBarPin() {
    // FIXME we should not modify DOM nodes we don't own, stupid template!
    document.body.classList.toggle('menubar-pin');
  },

  toggleMenuBarVisibility() {
    // FIXME we should not modify DOM nodes we don't own, stupid template!
    document.body.classList.toggle('menubar-visible');
  },
};
