export default {
  apps: {
    broadcast: {
      stats: {
        charts: {
          statuses: {
            upToDate: "Chart is up to date",
            loading: "Loading chart data...",
            error: "Could not load chart data",
          },
          labels: {
            connections: " (Connections)",
            listeners: " (Listeners)",
            xAxisLabel: "Time (UTC)",
            over_one_minute: "Over 1 minute",
            over_five_minutes: "Over 5 minutes",
            over_fifteen_minutes: "Over 15 minutes",
            over_thirty_minutes: "Over 30 minutes",
            over_one_hour: "Over 1 hour",
            over_three_hours: "Over 3 hours",
            over_twelve_hours: "Over 12 hours"
          },
        },
        index: {
          show : {
            header: "Stats",
          },
          actions: {
            create: "Add user",
            delete: "Delete selected users",
          },

          targetTable: {
            loading: "Fetching targets",
            header: {
              name: "List of targets",
            },
          },

          channelTable: {
            loading: "Fetching channels",
            header: {
              channel_id: "List of channels"
            },
          },

          modals: {
            delete: {
              header: "Delete user",
              message: {
                confirmation: "Are you sure that you want to delete %(count)s selected user(s)?",
                acknowledgement: "Deleted %(count)s user(s).",
                progress: "Deleting in progress…",
              },
              action: {
                proceed: "Delete",
                cancel: "Cancel",
                close: "Close",
              }
            },

            create: {
              header: "Add user",
              form: {
                email: {
                  label: "e-mail",
                  hint: "Type user's e-mail address. It will serve as login.",
                },
                account_ids: {
                  label: "Accounts",
                  hint: "Select accounts to which this user belongs. Hold Ctrl while clicking to select/deselect multiple accounts.",
                },
                apps_available: {
                  label: "Available applications",
                  values: {
                    electron: "Electron",
                    library: "Library",
                    administration: "Administration",
                    broadcast: "Broadcast",
                    freezer: "Freezer",
                    administration: "administration",
                  },
                  hint: "Select applications enabled for this user. Hold Ctrl while clicking to select/deselect multiple applications.",
                },
                locale: {
                  label: "Language of the user interface",
                  values: {
                    en: "English",
                    pl: "Polish",
                  }
                },
              },

              message: {
                acknowledgement: "User has been added succesfully. Message with confirmation link was delivered on his/her mailbox.",
              },

              action: {
                proceed: "Add user",
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
