export default {
  header: 'Current Playlist',
  add_button: 'Add track',
  add_dj_button: 'Add automaton',
  update_button: 'Edit track',
  delete_button: 'Remove track',
  add: {
    header: 'Adding new track',
    form: {
      file: {
        label: 'File',
        hint: 'Search files',
      },
      start_at: {
        label: 'Starts at',
      },
      stop_at: {
        label: 'Stops at',
      },
      name: {
        label: 'Name',
      },
    },
    action: {
      cancel: 'Cancel',
      proceed: 'Add to playlist',
      close: 'Close',
    },
    info: {
      type_and_desc: 'Type and description',
    },
    message: {
      progress: 'Adding new track...',
      acknowledgement: 'Track was successfully added',
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
      close: 'Close',
    },
    info: {
      type_and_desc: 'Type and description',
    },
    message: {
      progress: 'Editing track...',
      acknowledgement: 'Track was successfully edited',
    },
  },
  delete: {
    header: 'Deleting track',
    message: {
      confirmation: 'The track is going to be removed.',
      progress: 'Deleting items...',
    },
    action: {
      cancel: 'Cancel',
      proceed: 'Delete',
      close: 'Close',
    },
  },
};
