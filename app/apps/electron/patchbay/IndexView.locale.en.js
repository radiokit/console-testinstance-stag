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
              os_name: {
                label: "Hardware I/O"
              },
              name: {
                label: "Name of the device"
              },
              active: {
                label: "Active",
              },
              bitrate_playback: {
                label: "Playback bitrate",
              },
              bitrate_capture: {
                label: "Capture bitrate",
              },
              latency_playback: {
                label: "Playback latency",
              },
              latency_capture: {
                label: "Capture latency",
              },
            },

            action: {
              proceed: "Update device",
              cancel: "Cancel",
              close: "Close",
              enable: "Enable",
              disable: "Disable",
            },

            message: {
              acknowledgement: "Update successful.",
            },

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
