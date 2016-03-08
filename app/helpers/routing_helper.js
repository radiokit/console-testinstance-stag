import AccountHelper from './account_helper.js';

export default {
  apps: {
    electron: {
      icon: "blur-radial",
      devices: {
        index: function(context) {
          return "/apps/electron/devices/index";
        },
      },
    },

    broadcast: {
      icon: "radio-tower",
      playlist: {
        index: function(context) {
          return "/apps/broadcast/playlist/index";
        },
      },
      live: {
        index: function(context) {
          return "/apps/broadcast/live/index";
        },
      },
    },

    infrastructure: {
      icon: "server-network",
      computing_nodes: {
        index: function(context) {
          return "/apps/infrastructure/computing_nodes/index";
        },
      },
      external_inputs: {
        index: function(context) {
          return "/apps/infrastructure/external_inputs/index";
        },
      },
      transmissions: {
        index: function(context) {
          return "/apps/infrastructure/transmissions/index";
        },
      },
      patchbay: {
        index: function(context) {
          return "/apps/infrastructure/patchbay/index";
        },
      },
    },

    administration: {
      icon: "settings",
      user_accounts: {
        index: function(context) {
          return "/apps/administration/user_accounts/index";
        },
      },
      broadcast_channels: {
        index: function(context) {
          return "/apps/administration/broadcast_channels/index";
        },
      },
      editors: {
        index: function(context) {
          return "/apps/administration/editors/index";
        },
      },
      file_repositories: {
        index: function(context) {
          return "/apps/administration/file_repositories/index";
        },
      },
    },

    library: {
      icon: "library-music",
      file_repositories: {
        index: function(context) {
          return "/apps/library/file_repositories/index";
        },
      },
    },
  }
}
