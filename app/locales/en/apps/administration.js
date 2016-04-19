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

      broadcast_channels: {
        show: {
          actions: {
            back: "Back to the channels index",
            delete: "Delete this channel",
          },
        },

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

        tags_schema: {
          actions: {
            add_category: "Add category",
          },
          modals: {

            edit_category: {
              header: "Edit category",
              form: {
                name: {
                  label: "Category name",
                  hint: "Type new category name"
                },
              },
              message: {
                confirmation: "Do you want to edit this category",
                acknowledgement: "Category edited.",
                progress: "Editing category…",
              },
              action: {
                proceed: "Edit",
                cancel: "Cancel",
                close: "Close",
              }
            },


            edit_tag: {
              header: "Edit tag",
              form: {
                name: {
                  label: "Tag name",
                  hint: "Edit tag name"
                },
              },
              message: {
                confirmation: "Do you want to edit this tag",
                acknowledgement: "Tag edited.",
                progress: "Editing tag…",
              },
              action: {
                proceed: "Edit",
                cancel: "Cancel",
                close: "Close",
              }
            },

            delete_category: {
              header: "Delete category",
              message: {
                confirmation: "Do you want to delete this category?",
                acknowledgement: "Category deleted.",
                progress: "Deleting category",
              },
              action: {
                proceed: "Delete",
                cancel: "Cancel",
                close: "Close",
              }
            },
            delete_tag: {
              header: "Delete tag",
              message: {
                confirmation: "Do you want to delete this tag?",
                acknowledgement: "Tag deleted.",
                progress: "Deleting tag",
              },
              action: {
                proceed: "Delete",
                cancel: "Cancel",
                close: "Close",
              }
            },

            create_category: {
              header: "Create category",
              form: {
                name: {
                  label: "Category name",
                  hint: "Type new category name"
                },
              },
              message: {
                acknowledgement: "Category created.",
                progress: "Creating category…",
              },
              action: {
                proceed: "Create",
                cancel: "Cancel",
                close: "Close",
              }
            },

            create_tag: {
              header: "Create tag",
              form: {
                name: {
                  label: "Tag name",
                  hint: "Type new tag name"
                },
              },
              message: {
                acknowledgement: "Tag created.",
                progress: "Creating tag…",
              },
              action: {
                proceed: "Create",
                cancel: "Cancel",
                close: "Close",
              }
            },

          },
        },


        show: {
          actions: {
            back: "Back to the file repositories index",
            delete: "Delete this file repository",
          },

          tabs: {
            headers: {
              metadata_schema: "Metadata",
              tags_schema: "Tags",
            },

            body: {
              metadata_schema: {
                table: {
                  index: {
                    actions: {
                      create: "Add metadata field",
                    },

                    table: {
                      header: {
                        name: "Field name",
                        key: "Key",
                        kind: "Value type",
                      }
                    },

                    modals: {
                      create: {
                        header: "Add metadata field",
                        action: {
                          proceed: "Add metadata field",
                          close: "Close",
                          cancel: "Cancel",
                        },
                        acknowledgement: {
                          info: "Metadata field was added succesfully.",
                        },
                        form: {
                          name: {
                            label: "Field name",
                            hint: "Choose any name that will describe contents of this field, e.g. \"composer\".",
                          },
                          key: {
                            label: "Key",
                            hint: "Unique key describing role of this field for the system.",
                          },
                          kind: {
                            label: "Value type",
                            values: {
                              string: "Text (one line)",
                              db: "Decibels",
                              integer: "Number (integer)",
                              text: "Text (multiline)",
                              float: "Number (with decimal part)",
                              date: "Date",
                              time: "Time",
                              datetime: "Date & Time",
                              url: "URL",
                              duration: "Duration",
                            }
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },

        index: {
          header: "File Repositories",
          actions: {
            create: "Add file repository",
            delete: "Delete selected file repositories",
          },

          table: {
            loading: "Fetching list of file repositories",
            header: {
              name: "Name",
              files_count: "Files count",
              files_size_total: "Files' total size",
              user_account: "Client account"
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
                user_account: {
                  label: "Client account",
                }
              },
              message: {
                acknowledgement: "File repository added succesfully",
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
