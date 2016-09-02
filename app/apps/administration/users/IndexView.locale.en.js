export default {
  apps: {
    administration: {
      users: {
        index: {
          header: "Users",
          actions: {
            create: "Add user",
            delete: "Delete selected users",
          },

          table: {
            loading: "Fetching list of users",
            header: {
              email: "e-mail",
              first_name: "First name",
              last_name: "Last name",
              phone: "Phone",
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
                    library_limited: "Library (upload only)",
                    administration: "Administration",
                    broadcast: "Broadcast",
                    freezer: "Freezer",
                    infrastructure: "Infrastructure",
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
