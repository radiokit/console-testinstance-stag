export default {
  apps: {
    electron: {
      patchbay: {
        header: "Patchbay",
        tabs: {
          headers: {
            diagram: "Diagram",
            table: "Table",
          },
        },

        update_button: "Edit device",
        modals: {
          update: {
            header: "Edit device",

            form: {
              name: {
                label: "Name of the device"
              }
            },

            action: {
              proceed: "Update device",
              cancel: "Cancel",
              close: "Close",
            }
          },

          delete: {
            client: {
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
            },

            link: {
              header: "Delete link",
              message: {
                confirmation: "Are you sure that you want to delete selected link?",
                acknowledgement: "Deleted link.",
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
      },
    }
  }
}
