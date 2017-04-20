export default {
  apps: {
    almanac: {
      icon: 'calendar-text',
      announcements: {
        index() {
          return '/apps/almanac/announcements/index';
        },
      },
      resources: {
        index() {
          return '/apps/almanac/resources/index';
        },
      },
    },

    electron: {
      icon: 'blur-radial',
      // transmissions: {
      //   index() {
      //     return '/apps/electron/transmissions/index';
      //   },
      // },
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
      auto: {
        index() {
          return '/apps/broadcast/auto/index';
        },
      },
      switch: {
        index() {
          return '/apps/broadcast/switch/index';
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
      broadcast_channels: {
        index() {
          return '/apps/infrastructure/broadcast_channels/index';
        },
      },
    },

    administration: {
      icon: 'settings',
      users: {
        index() {
          return '/apps/administration/users/index';
        },
      },
      //   journal: {
      //     index() {
      //       return '/apps/administration/journal/index';
      //     },
      // },
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

      library_limited: {
        icon: 'library-music',
        file_repositories: {
          index() {
            return '/apps/library_limited/file_repositories/index';
          },
        },
      },
    },
};
