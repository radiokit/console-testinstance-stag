export default {
  apps: {
    broadcast: {
      auto: {
        index: {
          header: 'Automatic scheduling',
          table: {
            header: {
              name: 'Name',
              time_start: 'Hour from',
              time_stop: 'Hour to',
              on_monday: 'Mon',
              on_tuesday: 'Tue',
              on_wednesday: 'Wed',
              on_thursday: 'Thu',
              on_friday: 'Fri',
              on_saturday: 'Sat',
              on_sunday: 'Sun',
            },
          },

          actions: {
            create: 'Add automatic scheduler',
            delete: 'Delete selected automatic schedulers',
          },

          modals: {
            delete: {
              header: 'Delete automatic scheduler',
              message: {
                confirmation: 'Are you sure that you want to delete %(count)s selected automatic scheduler(s)?',
                acknowledgement: 'Deleted %(count)s automatic scheduler(s).',
                progress: 'Deleting in progress…',
              },
              action: {
                proceed: 'Delete',
                cancel: 'Cancel',
                close: 'Close',
              },
            },
          },
        },
      },
    },
  },
};
