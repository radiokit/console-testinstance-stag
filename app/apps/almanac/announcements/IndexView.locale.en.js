export default {
  apps: {
    almanac: {
      announcements: {
        index: {
          header: 'Announcements',
          actions: {
            create: 'Add announcement',
            delete: 'Delete selected announcements',
          },

          table: {
            loading: 'Fetching list of announcements',
            header: {
              name: 'Subject',
              body: 'Message',
              organization_account: 'Account',
              inserted_at: 'Creation date',
            },
          },

          modals: {
            delete: {
              header: 'Delete announcement',
              message: {
                confirmation: 'Are you sure that you want to delete %(count)s selected announcement(s)?',
                acknowledgement: 'Deleted %(count)s announcement(s).',
                progress: 'Deleting in progress…',
              },
              action: {
                proceed: 'Delete',
                cancel: 'Cancel',
                close: 'Close',
              },
            },

            create: {
              header: 'Add announcement',
              form: {
                name: {
                  label: 'Subject',
                },
                body: {
                  label: 'Message',
                },
                organization_account: {
                  label: 'Account',
                },
              },

              message: {
                acknowledgement: 'Announcement added succesfully',
              },

              action: {
                proceed: 'Add announcement',
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
