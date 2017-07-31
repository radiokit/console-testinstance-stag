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
      royalties: {
        index() {
          return '/apps/broadcast/royalties/index';
        },
      },
      stats: {
        index() {
          return '/apps/broadcast/stats/index';
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
      file_repositories: {
        index() {
          return '/apps/administration/file_repositories/index';
        },
      },
      broadcast_channels: {
        index() {
          return '/apps/administration/broadcast_channels/index';
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

    dj: {
      icon: 'library-music',
      go_live: {
        index() {
          return '/apps/dj/go_live/index';
        },
      },
      your_library: {
        index() {
          return '/apps/dj/your_library/index';
        },
      },
      your_profile: {
        index() {
          return '/apps/dj/your_profile/index';
        },
      },
    },
  },
};
