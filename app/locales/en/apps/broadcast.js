export default {
  apps: {
    broadcast: {
      navigation: {
        title: "Broadcast",
        playlist: {
          title: "Schedule",
        },
        live: {
          title: "Live",
        },
        channels: {
          title: "Channels",
        },
      },

      playlist: {
        header: "Current Playlist"
      },

      channels: {
        index: {
          header: "Channels",
          actions: {
            create: "Add channel",
            delete: "Remove selected channels",
          },

          table: {
            loading: "Fetching list of channels",
            header: {
              name: "Name",
            },
          },

          modals: {
            delete: {
              header: "Delete channel",
              message: {
                confirmation: "Are you sure that you want to delete %(count)s selected channel(s)?",
                acknowledgement: "Deleted %(count)s channel(s).",
                progress: "Deleting in progress…",
              },
              action: {
                proceed: "Delete",
                cancel: "Cancel",
                close: "Close",
              }
            },

            create: {
              header: "Add channel",
              form: {
                name: {
                  label: "Name of the channel",
                  hint: "Choose any name that will help you to distinguish this channel from others",
                },
              },

              acknowledgement: {
                info: "Channel added succesfully",
              },

              action: {
                proceed: "Add channel",
                cancel: "Cancel",
                close: "Close",
              }
            }
          }
        },
      },
      
    }
  }
}
