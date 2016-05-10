export default {
  apps: {
    broadcast: {
      playlist: {
        header: 'Current Playlist',
        add_button: 'Add track',
        update_button: 'Edit track',
        delete_button: 'Remove track',
        add: {
          header: 'Adding new track',
          form: {
            file: {
              label: 'File',
            },
            name: {
              label: 'Name',
            },
            start_at: {
              label: 'Starts at',
            },
            stop_at: {
              label: 'Stops at',
            },
          },
          action: {
            cancel: 'Cancel',
            proceed: 'Proceed',
          },
        },
        update: {
          header: 'Edit track',
          form: {
            name: {
              label: 'Name',
            },
            start_at: {
              label: 'Starts at',
            },
            stop_at: {
              label: 'Stops at',
            },
          },
          action: {
            cancel: 'Cancel',
            proceed: 'Proceed',
          },
        },
        delete: {
          header: 'Deleting track',
          message: {
            confirmation: 'The track is going to be removed.',
          },
          action: {
            cancel: 'Cancel',
            proceed: 'Proceed',
          },
        },
      },
    },
  },
};
