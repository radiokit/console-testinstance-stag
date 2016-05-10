export default {
  apps: {
    administration: {
      file_repositories: {
        show: {
          tabs: {
            body: {
              imports_schema: {
                table: {
                  index: {
                    actions: {
                      create: "Add import",
                    },

                    table: {
                      header: {
                        name: "Name",
                        kind: "Kind",
                        connector_settings: "Settings",
                      }
                    },

                    modals: {
                      create: {
                        header: "Add import",
                        action: {
                          proceed: "Add import",
                          close: "Close",
                          cancel: "Cancel",
                        },
                        message: {
                          progress: "Adding import...",
                          acknowledgement: "Imports were added succesfully.",
                        },
                        form: {
                          name: {
                            label: "Field name",
                            hint: "Choose any name that will allow you to distinguish this import from another.",
                          },
                          json_endpoint: {
                            label: "Endpoint URL",
                          },
                          kind: {
                            label: "Value type",
                            values: {
                              json: "JSON",
                            }
                          },
                        },
                      },
                      delete: {
                        header: "Remove import",
                        action: {
                          proceed: "Remove import",
                          close: "Close",
                          cancel: "Cancel",
                        },
                        message: {
                          progress: "Deleting imports... ",
                          confirmation: "Do you really want to remove this import?",
                          acknowledgement: "Imports were succesfully removed.",
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
