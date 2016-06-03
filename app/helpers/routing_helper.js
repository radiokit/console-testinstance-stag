export default {
  apps: {
    electron: {
      icon: 'blur-radial',
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
    },

    infrastructure: {
      icon: 'server-network',
      computing_nodes: {
        index() {
          return '/apps/infrastructure/computing_nodes/index';
        },
      },
      media: {
        index() {
          return '/apps/infrastructure/media/index';
        },
      },
    },

    administration: {
      icon: 'settings',
      broadcast_channels: {
        index() {
          return '/apps/administration/broadcast_channels/index';
        },
      },
      users: {
        index() {
          return '/apps/administration/users/index';
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
