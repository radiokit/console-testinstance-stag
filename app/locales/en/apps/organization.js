export default {
  apps: {
    organization: {
      navigation: {
        title: "Organization",
        user_accounts: {
          title: "Accounts",
        },
      },

      user_accounts: {
        index: {
          header: "Accounts",
          actions: {
            create: "Add account",
            delete: "Remove selected accounts",
          },

          table: {
            loading: "Fetching list of accounts",
            header: {
              name_custom: "Name (custom)",
              name_formal: "Name (formal)",
            },
          },

          modals: {
            delete: {
              header: "Delete account",
              message: {
                confirmation: "Are you sure that you want to delete %(count)s selected account(s)?",
                acknowledgement: "Deleted %(count)s account(s).",
                progress: "Deleting in progress…",
              },
              action: {
                proceed: "Delete",
                cancel: "Cancel",
                close: "Close",
              }
            },

            create: {
              header: "Add account",
              form: {
                name_custom: {
                  label: "Name (custom)",
                  hint: "Type name under which this account is publicly known",
                },
                name_formal: {
                  label: "Name (formal)",
                  hint: "Type formal name of the client's organization or its full name if it's a person",
                },
              },

              acknowledgement: {
                info: "Account added succesfully",
              },

              action: {
                proceed: "Add account",
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
