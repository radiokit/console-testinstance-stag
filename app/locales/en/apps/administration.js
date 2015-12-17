export default {
  apps: {
    administration: {
      navigation: {
        title: "Administration",
        user_accounts: {
          title: "Clients' Accounts",
        },
        editors: {
          title: "Editors' Accounts",
        },
        broadcast_channels: {
          title: "Broadcast Channels",
        },
        file_repositories: {
          title: "File Repositories",
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

      broadcast_channels: {
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
                  hint: "Choose any name that will help you to distinguish this channel from others.",
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

      file_repositories: {
        index: {
          header: "File Repositories",
          actions: {
            create: "Add file repository",
            delete: "Remove selected file repositories",
          },

          table: {
            loading: "Fetching list of file repositories",
            header: {
              name: "Name",
            },
          },

          modals: {
            delete: {
              header: "Delete file repository",
              message: {
                confirmation: "Are you sure that you want to delete %(count)s selected file repository/repositories?",
                acknowledgement: "Deleted %(count)s file repository/repositories.",
                progress: "Deleting in progress…",
              },
              action: {
                proceed: "Delete",
                cancel: "Cancel",
                close: "Close",
              }
            },

            create: {
              header: "Add file repository",
              form: {
                name: {
                  label: "Name of the file repository",
                  hint: "Choose any name that will help you to distinguish this file repository from others.",
                },
              },

              acknowledgement: {
                info: "File repository added succesfully",
              },

              action: {
                proceed: "Add file repository",
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
