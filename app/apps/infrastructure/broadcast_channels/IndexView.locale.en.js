export default {
  apps: {
    infrastructure: {
      broadcast_channels: {
        index: {
          header: "Channels",
          actions: {
            create: "Add channel",
            delete: "Delete selected channels",
          },

          table: {
            loading: "Fetching list of channels",
            header: {
              name: "Name",
              slug: "Address",
              timezone: "Time zone",
              media_routing_group_id: "Routing Group ID",
              user_account: "Account",
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
                  label: "Name",
                  hint: "Choose any name that will help you to distinguish this channel from others.",
                },
                slug: {
                  label: "Unique address",
                  hint: "It is going to be part of stream URLs.",
                },
                timezone: {
                  label: "Time zone",
                  hint: "Time zone in the TZDATA format",
                },
                media_routing_group_id: {
                  label: "Routing Group ID",
                },
                description: {
                  label: "Description",
                },
                genre: {
                  label: "Genre/Format",
                },
                homepage_url: {
                  label: "Home page URL",
                },
                user_account: {
                  label: "Account",
                }
              },

              message: {
                acknowledgement: "Channel added succesfully",
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
