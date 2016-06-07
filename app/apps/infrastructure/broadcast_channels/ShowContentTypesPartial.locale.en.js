export default {
  apps: {
    infrastructure: {
      broadcast_channels: {
        show: {
          tabs: {
            body: {
              content_types: {
                table: {
                  index: {
                    actions: {
                      create: "Add content type",
                      delete: "Delete selected content types",
                    },

                    modals: {
                      delete: {
                        header: "Delete content type",
                        action: {
                          proceed: "Delete",
                          cancel: "Cancel",
                          close: "Close",
                        },
                        message: {
                          confirmation: "Are you sure that you want to delete %(count)s selected content type(s)?",
                          acknowledgement: "Deleted %(count)s content type(s).",
                          progress: "Deleting in progress…",
                        },
                      },
                      create: {
                        header: "Add content type",
                        action: {
                          proceed: "Add content type",
                          cancel: "Cancel",
                          close: "Close",
                        },
                        message: {
                          acknowledgement: "Stream added succesfully",
                        },
                        form: {
                          name: {
                            label: "Name",
                            hint: "Choose any name that will help you to distinguish this content type from others.",
                          },
                        },
                      },
                    },

                    table: {
                      loading: "Loading content types...",

                      header: {
                        name: "Name",
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
