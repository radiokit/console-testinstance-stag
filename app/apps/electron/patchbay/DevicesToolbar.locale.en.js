export default {
  apps: {
    electron: {
      patchbay: {
        toolbar: {
          client: {
            create: 'Add device',
            edit: 'Edit device',
            delete: 'Delete device',
          },
          audiolink: {
            active: {
              not_selected: 'Select Audio Link',
              enable: 'Enable',
              disable: 'Disable',
            },
          },

          modals: {
            update: {
              header: 'Edit device',

              form: {
                os_name: {
                  label: 'Hardware I/O',
                },
                name: {
                  label: 'Name of the device',
                },
                bitrate: {
                  label: 'Bitrate (kbit/s)',
                },
                latency: {
                  label: 'Latency (ms)',
                },
                audio_type: {
                  label: 'Audio type',
                  values: {
                    generic: 'Generic',
                    voice: 'Voice',
                  },
                },
              },

              action: {
                proceed: 'Update device',
                cancel: 'Cancel',
                close: 'Close',
              },

              message: {
                acknowledgement: 'Update successful.',
              },
            },

            delete: {
              client: {
                header: 'Delete device',
                message: {
                  confirmation: 'Are you sure that you want to delete %(count)s selected device(s)?',
                  acknowledgement: 'Deleted %(count)s device(s).',
                  progress: 'Deleting in progress…',
                },
                action: {
                  proceed: 'Delete',
                  cancel: 'Cancel',
                  close: 'Close',
                },
              },

              link: {
                header: 'Delete link',
                message: {
                  confirmation: 'Are you sure that you want to delete selected link?',
                  acknowledgement: 'Deleted link.',
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
  },
};
