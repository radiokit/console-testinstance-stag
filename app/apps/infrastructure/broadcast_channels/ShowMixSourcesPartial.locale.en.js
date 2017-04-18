export default {
  apps: {
    infrastructure: {
      broadcast_channels: {
        show: {
          tabs: {
            body: {
              mix_sources: {
                table: {
                  index: {
                    actions: {
                      create: "Add mix source",
                      delete: "Delete selected mix sources",
                    },

                    modals: {
                      delete: {
                        header: "Delete mix source",
                        action: {
                          proceed: "Delete",
                          cancel: "Cancel",
                          close: "Close",
                        },
                        message: {
                          confirmation: "Are you sure that you want to delete %(count)s selected mix source(s)?",
                          acknowledgement: "Deleted %(count)s mix source(s).",
                          progress: "Deleting in progress…",
                        },
                      },
                      create: {
                        header: "Add mix source",
                        action: {
                          proceed: "Add mix source",
                          cancel: "Cancel",
                          close: "Close",
                        },
                        message: {
                          acknowledgement: "Stream added succesfully",
                        },
                        form: {
                          name: {
                            label: "Name",
                            hint: "Choose any name that will help you to distinguish this mix source from others.",
                          },
                          description: {
                            label: "Descrition",
                          },
                          metadata_string: {
                            label: "Metadata",
                          },
                          switch_mount: {
                            label: "Switch Mount",
                          },
                        },
                      },
                    },

                    table: {
                      loading: "Loading mix sources...",

                      header: {
                        name: "Name",
                        description: "Description",
                        metadata_string: "Metadata",
                        switch_mount: "Switch Mount",
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
