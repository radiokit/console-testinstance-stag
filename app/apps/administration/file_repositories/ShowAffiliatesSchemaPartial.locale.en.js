export default {
  apps: {
    administration: {
      file_repositories: {
        show: {
          tabs: {
            body: {
              affiliates_schema: {
                table: {
                  index: {
                    actions: {
                      create: "Add affiliate",
                    },

                    table: {
                      header: {
                        name: "Name",
                        key: "Key",
                        kind: "Kind",
                      },
                      loading: "Loading list of affiliates...",
                    },

                    modals: {
                      create: {
                        header: "Add affiliate",
                        action: {
                          proceed: "Add affiliate",
                          close: "Close",
                          cancel: "Cancel",
                        },
                        message: {
                          progress: "Adding affiliate...",
                          acknowledgement: "Affiliates were added succesfully.",
                        },
                        form: {
                          name: {
                            label: "Field name",
                            hint: "Choose any name that will allow you to distinguish this affiliate from another.",
                          },
                          key: {
                            label: "Key",
                          },
                          kind: {
                            label: "Value type",
                            values: {
                              itunes: "iTunes",
                            },
                          },
                        },
                      },
                      delete: {
                        header: "Remove affiliate",
                        action: {
                          proceed: "Remove affiliate",
                          close: "Close",
                          cancel: "Cancel",
                        },
                        message: {
                          progress: "Deleting affiliates... ",
                          confirmation: "Do you really want to remove this affiliate?",
                          acknowledgement: "Affiliates were succesfully removed.",
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
