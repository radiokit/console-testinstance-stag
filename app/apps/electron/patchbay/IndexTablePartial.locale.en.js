export default {
  apps: {
    electron: {
      patchbay: {
        table: {
          index: {
            actions: {
              create: "Add rule",
              delete: "Delete rules",
            },
            modals: {
              create: {
                header: "Add rule",
                action: {
                  proceed: "Add rule",
                  cancel: "Cancel",
                  close: "Close",
                },
                form: {
                  source_audio_interface_id: {
                    label: "Source (audio interface)",
                  },
                  destination_audio_interface_id: {
                    label: "Destination (audio interface)",
                  },
                  message: {
                    acknowledgement: "Rule was successfully created",
                  },
                },
              },
              delete: {
                header: "Delete rules",
                message: {
                  confirmation: "Are you sure you want to delete selected rules?",
                },
                action: {
                  proceed: "Delete rules",
                  cancel: "Cancel",
                },
              },
            },
            table: {
              loading: "Loading rules...",
              header: {
                source_audio_interface: "Source (audio interface)",
                destination_audio_interface: "Destination (audio interface)",
              }
            }
          }
        }
      },
    }
  }
}
