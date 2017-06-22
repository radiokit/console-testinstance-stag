export default {
  apps: {
    administration: {
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
              metadata_string: "Metadata",
              metadata_updated_at: "Metadata updated at",
              timezone: "Time zone",
              lineup_base_url: "Lineup base URL",
              lineup_channel_id: "Lineup channel ID",
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
                lineup_base_url: {
                  label: "Lineup base URL",
                },
                lineup_channel_id: {
                  label: "Lineup channel ID",
                },
                media_routing_group_id: {
                  label: "Routing Group ID",
                  hint: "Copy Routing ID from Media section or contact administrator",
                },
                metadata_string: {
                  label: "Metadata",
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
            },

            update: {
              header: "Edit channel",
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
                lineup_base_url: {
                  label: "Lineup base URL",
                },
                lineup_channel_id: {
                  label: "Lineup channel ID",
                },
                media_routing_group_id: {
                  label: "Routing Group ID",
                  hint: "Copy Routing ID from Media section or contact administrator",
                },
                metadata_string: {
                  label: "Metadata",
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
                proceed: "Update channel",
                cancel: "Cancel",
                close: "Close",
              }
            },

          }
        },
      },
    }
  }
}
