export default {
  apps: {
    electron: {
      devices: {
        index: {
          header: "Audio Devices",
          actions: {
            create: "Add device",
            delete: "Remove selected devices",
          },

          table: {
            loading: "Fetching list of connected devices",
            header: {
              name: "Name",
            },
          },

          modals: {
            delete: {
              header: "Delete device",
              message: {
                confirmation: "Are you sure that you want to delete %(count)s selected device(s)?",
                acknowledgement: "Deleted %(count)s device(s).",
                progress: "Deleting in progress…",
              },
              action: {
                proceed: "Delete",
                cancel: "Cancel",
                close: "Close",
              }
            }
          }
        }
      }
    }
  }
}
