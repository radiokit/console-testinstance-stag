export default {
  apps: {
    joint: {
      devices: {
        index: function(options) {
          return "/apps/joint/" + options.userAccountId + "/devices/index";
        },

        create: function(options) {
          return "/apps/joint/" + options.userAccountId + "/devices/create";
        },

      }
    }
  }
}