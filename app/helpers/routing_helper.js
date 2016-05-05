export default {
  apps: {
    electron: {
      icon: 'blur-radial',
      devices: {
        index() {
          return '/apps/electron/devices/index';
        },
      },
      transmissions: {
        index() {
          return '/apps/electron/transmissions/index';
        },
      },
      patchbay: {
        index() {
          return '/apps/electron/patchbay/index';
        },
      },
    },

    broadcast: {
      icon: 'radio-tower',
      playlist: {
        index() {
          return '/apps/broadcast/playlist';
        },
      },
      live: {
        index() {
          return '/apps/broadcast/live/index';
        },
      },
    },

    infrastructure: {
      icon: 'server-network',
      computing_nodes: {
        index() {
          return '/apps/infrastructure/computing_nodes/index';
        },
      },
      external_inputs: {
        index() {
          return '/apps/infrastructure/external_inputs/index';
        },
      },
      transmissions: {
        index() {
          return '/apps/infrastructure/transmissions/index';
        },
      },
      patchbay: {
        index() {
          return '/apps/infrastructure/patchbay/index';
        },
      },
    },

    administration: {
      icon: 'settings',
      user_accounts: {
        index() {
          return '/apps/administration/user_accounts/index';
        },
      },
      broadcast_channels: {
        index() {
          return '/apps/administration/broadcast_channels/index';
        },
      },
      editors: {
        index() {
          return '/apps/administration/editors/index';
        },
      },
      file_repositories: {
        index() {
          return '/apps/administration/file_repositories/index';
        },
      },
    },

    library: {
      icon: 'library-music',
      file_repositories: {
        index() {
          return '/apps/library/file_repositories/index';
        },
      },
    },
  },
};
