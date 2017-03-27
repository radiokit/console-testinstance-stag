export default {
  apps: {
    almanac: {
      resources: {
        index: {
          header: 'Resources',
          actions: {
            create: 'Add resource',
            delete: 'Delete selected resources',
          },

          table: {
            loading: 'Fetching list of resources',
            header: {
              name: 'Name',
              notification_emails: 'Notified users',
              organization_account: 'Account',
            },
          },

          modals: {
            delete: {
              header: 'Delete resource',
              message: {
                confirmation: 'Are you sure that you want to delete %(count)s selected resource(s)?',
                acknowledgement: 'Deleted %(count)s resource(s).',
                progress: 'Deleting in progress…',
              },
              action: {
                proceed: 'Delete',
                cancel: 'Cancel',
                close: 'Close',
              },
            },

            create: {
              header: 'Add resource',
              form: {
                name: {
                  label: 'Name',
                  hint: 'Choose any name that will help you to distinguish this resource from others.',
                },
                notification_emails: {
                  label: 'Notified users',
                  hint: 'List of comma-separated e-mails of users that should be notified about reservations\' changes',
                },
                organization_account: {
                  label: 'Account',
                },
              },

              message: {
                acknowledgement: 'Resource added succesfully',
              },

              action: {
                proceed: 'Add resource',
                cancel: 'Cancel',
                close: 'Close',
              },
            },

            update: {
              header: 'Edit resource',
              form: {
                name: {
                  label: 'Name',
                  hint: 'Choose any name that will help you to distinguish this resource from others.',
                },
                notification_emails: {
                  label: 'Notified users',
                  hint: 'List of comma-separated e-mails of users that should be notified about reservations\' changes',
                },
                organization_account: {
                  label: 'Account',
                },
              },

              message: {
                acknowledgement: 'Resource saved succesfully',
              },

              action: {
                proceed: 'Save resource',
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
