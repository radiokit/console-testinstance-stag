export default {
  apps: {
    almanac: {
      resources: {
        show: {
          tabs: {
            body: {
              reservations: {
                table: {
                  index: {
                    actions: {
                      create: 'Add reservation',
                      delete: 'Delete selected reservations',
                    },

                    modals: {
                      delete: {
                        header: 'Delete reservation',
                        action: {
                          proceed: 'Delete',
                          cancel: 'Cancel',
                          close: 'Close',
                        },
                        message: {
                          confirmation: 'Are you sure that you want to delete %(count)s selected reservation(s)?',
                          acknowledgement: 'Deleted %(count)s reservation(s).',
                          progress: 'Deleting in progress…',
                        },
                      },
                      create: {
                        header: 'Add reservation',
                        action: {
                          proceed: 'Add reservation',
                          cancel: 'Cancel',
                          close: 'Close',
                        },
                        message: {
                          acknowledgement: 'Reservation added succesfully',
                        },
                        form: {
                          description: {
                            label: 'Description',
                          },
                          start_at: {
                            label: 'Start at',
                          },
                          stop_at: {
                            label: 'Stop at',
                          },
                        },
                      },
                    },

                    table: {
                      loading: 'Loading reservations...',

                      header: {
                        description: 'Description',
                        start_at: 'Start at',
                        stop_at: 'Stop at',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
