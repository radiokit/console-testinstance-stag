import AccountHelper from './account_helper.js';

export default {
  apps: {
    joint: {
      devices: {
        index: function(context) {
          return "/apps/joint/" + AccountHelper.getCurrentAccountIdFromContext(context) + "/devices/index";
        },

        create: function(context) {
          return "/apps/joint/" +  AccountHelper.getCurrentAccountIdFromContext(context) + "/devices/create";
        },

        add: function(context, role) {
          return "/apps/joint/" +  AccountHelper.getCurrentAccountIdFromContext(context) + "/devices/add/" + role;
        }
      }
    },
    shows: {
      index: {
        new: function(context) {
          return "/apps/shows/" +  AccountHelper.getCurrentAccountIdFromContext(context) + "/new";
        },
        create: function(context) {
          return "/apps/shows/" +  AccountHelper.getCurrentAccountIdFromContext(context) + "/create";
        },
        show: function(context) {
          return "/apps/shows/" +  AccountHelper.getCurrentAccountIdFromContext(context) + "/show";
        },
      }
    }
  }
}
