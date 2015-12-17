export default {
  apps: {
    administration: {
      navigation: {
        title: "Administration",
        user_accounts: {
          title: "Accounts",
        },
        editors: {
          title: "Editors",
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
        index: {
          header: "Editors",
          actions: {
            create: "Add editor",
            delete: "Remove selected editors",
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
                info: "Editor added succesfully",
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
