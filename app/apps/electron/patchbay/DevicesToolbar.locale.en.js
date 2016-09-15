export default {
  apps: {
    electron: {
      patchbay: {
        toolbar: {
          client: {
            create: 'Add device',
            edit: 'Edit',
            delete: 'Delete',
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
              header: 'Edit',

              form: {
                os_name: {
                  label: 'Name as in the system',
                },
                name: {
                  label: 'Your name',
                },
                bitrate: {
                  label: 'Bitrate (kbit/s)',
                },
                latency: {
                  label: 'Buffer (ms)',
                },
                dataloss: {
                  label: 'Data correction overhead',
                  hint: 'How many percent of the data is expected to be lost in transmission. Increasing this will decrease quality unless you increase bandwidth too',
                },
                peer_to_peer: {
                  label: 'Peer to peer',
                  values: {
                    true: 'true',
                    false: 'false',
                  },
                },
                sender_ip: {
                  label: 'Sender\'s IP',
                },
                sender_control_port: {
                  label: 'Sender\'s control port',
                },
                receiver_ip: {
                  label: 'Receiver\'s IP',
                },
                receiver_data_port: {
                  label: 'Receiver\'s data port',
                },
                receiver_control_port: {
                  label: 'Receiver\'s control port',
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
                proceed: 'Update',
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
                  confirmation: 'Are you sure that you want to delete selected device?',
                  acknowledgement: 'Deleted device.',
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
