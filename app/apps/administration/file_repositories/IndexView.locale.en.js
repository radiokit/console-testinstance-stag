export default {
  apps: {
    administration: {
      file_repositories: {
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
    }
  }
}
