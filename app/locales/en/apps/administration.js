export default {
  apps: {
    administration: {
      navigation: {
        title: "Administration",
        subtitle: "Control panel",
        user_accounts: {
          title: "Clients' Accounts",
        },
        editors: {
          title: "Users' Accounts",
        },
        broadcast_channels: {
          title: "Broadcast Channels",
        },
        file_repositories: {
          title: "File Repositories",
        },
      },

      user_accounts: {
        show: {
          actions: {
            back: "Back to the accounts index",
            delete: "Delete this account",
          },
        },

        index: {
          header: "Accounts",
          actions: {
            create: "Add account",
            delete: "Delete selected accounts",
          },

          table: {
            loading: "Fetching list of accounts",
            header: {
              name: "Name (custom)",
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
                name: {
                  label: "Name (custom)",
                  hint: "Type name under which this account is publicly known.",
                },
                name_formal: {
                  label: "Name (formal)",
                  hint: "Type formal name of the client's administration or its full name if it's a person",
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

      editors: {
        show: {
          actions: {
            back: "Back to the editors index",
            delete: "Delete this editor",
          },
        },


        index: {
          header: "Users",
          actions: {
            create: "Add editor",
            delete: "Delete selected editors",
          },

          table: {
            loading: "Fetching list of editors",
            header: {
              email: "e-mail",
              first_name: "First name",
              last_name: "Last name",
              phone: "Phone",
            },
          },

          modals: {
            delete: {
              header: "Delete editor",
              message: {
                confirmation: "Are you sure that you want to delete %(count)s selected editor(s)?",
                acknowledgement: "Deleted %(count)s editor(s).",
                progress: "Deleting in progress…",
              },
              action: {
                proceed: "Delete",
                cancel: "Cancel",
                close: "Close",
              }
            },

            create: {
              header: "Add editor",
              form: {
                email: {
                  label: "e-mail",
                  hint: "Type editor's e-mail address. It will serve as login.",
                },
                first_name: {
                  label: "First name",
                },
                last_name: {
                  label: "Last name",
                },
                phone: {
                  label: "Phone",
                },
                locale: {
                  label: "Language of the user interface",
                  values: {
                    en: "English",
                    pl: "Polish",
                  }
                },
              },

              acknowledgement: {
                info: "User added succesfully",
              },

              action: {
                proceed: "Add editor",
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
