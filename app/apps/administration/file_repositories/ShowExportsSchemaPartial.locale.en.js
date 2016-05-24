export default {
  apps: {
    administration: {
      file_repositories: {
        show: {
          tabs: {
            body: {
              exports_schema: {
                table: {
                  index: {
                    actions: {
                      create: "Add export",
                    },

                    table: {
                      header: {
                        name: "Name",
                        key: "Key",
                        kind: "Kind",
                        connector_state: "State",
                        connector_credentials: "Username",
                      },
                      loading: "Loading exports...",                      
                    },

                    modals: {
                      create: {
                        header: "Add export",
                        action: {
                          proceed: "Add export",
                          close: "Close",
                          cancel: "Cancel",
                        },
                        message: {
                          progress: "Adding export...",
                          acknowledgement: "Exports were added succesfully.",
                        },
                        form: {
                          name: {
                            label: "Field name",
                            hint: "Choose any name that will allow you to distinguish this export from another.",
                          },
                          key: {
                            label: "Key",
                            hint: "Unique key describing role of this export for the system.",
                          },
                          kind: {
                            label: "Value type",
                            values: {
                              mixcloud: "MixCloud",
                            }
                          },
                        },
                      },
                      delete: {
                        header: "Remove export",
                        action: {
                          proceed: "Remove export",
                          close: "Close",
                          cancel: "Cancel",
                        },
                        message: {
                          progress: "Deleting exports... ",
                          confirmation: "Do you really want to remove this export?",
                          acknowledgement: "Exports were succesfully removed.",
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
    }
  }
}
