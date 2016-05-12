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
          }
        }
      },
    }
  }
}
