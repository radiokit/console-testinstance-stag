export default {
  apps: {
    infrastructure: {
      navigation: {
        title: "Infrastructure",
        subtitle: "Network configuration and monitoring",

        broadcast_channels: {
          title: "Broadcast Channels",
        },
      },

      patchbay: {
        index: {
          header: "Patchbay",
        }
      },

      external_inputs: {
        index: {
          header: "External Audio Inputs",
          actions: {
            create: "Add input",
            delete: "Remove selected inputs",
          },

          table: {
            loading: "Fetching list of external audio inputs",
            header: {
              name: "Name",
              location: "Location",
              level: "Level",
            },
          },

          modals: {
            delete: {
              header: "Delete input",
              message: {
                confirmation: "Are you sure that you want to delete %(count)s selected input(s)?",
                acknowledgement: "Deleted %(count)s input(s).",
                progress: "Deleting in progress…",
              },
              action: {
                proceed: "Delete",
                cancel: "Cancel",
                close: "Close",
              }
            },

            create: {
              header: "Add input",
              form: {
                name: {
                  label: "Name",
                  hint: "Choose any name that will help you to distinguish this input from others.",
                },
                location: {
                  label: "Location of the stream",
                  hint: "It has to be a valid http:// or https:// address",
                },
              },

              acknowledgement: {
                info: "Input added succesfully",
              },

              action: {
                proceed: "Add input",
                cancel: "Cancel",
                close: "Close",
              }
            }
          }
        },
      },

      transmissions: {
        show: {
          actions: {
            back: "Back to the tranmissions index",
            delete: "Delete this transmission",
          },
        },

        index: {
          header: "Transmissions",
          table: {
            loading: "Fetching list of transmissions",
            header: {
              device_name: "Device",
              audio_interface_name: "Audio Interface",
              level: "Level",
            },
          },
        },
      },
    }
  }
}
