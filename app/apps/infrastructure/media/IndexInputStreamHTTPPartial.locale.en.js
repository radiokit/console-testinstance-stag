export default {
  apps: {
    infrastructure: {
      media: {
        index: {
          tabs: {
            input_stream_http: {
              table: {
                index: {
                  actions: {
                    create: "Add HTTP stream input",
                    delete: "Delete selected HTTP stream inputs",
                  },

                  table: {
                    loading: "Fetching list of HTTP stream inputs",
                    header: {
                      id: "ID",
                      name: "Name",
                      location: "Location",
                      level: "Level",
                    },
                  },

                  modals: {
                    delete: {
                      header: "Delete HTTP stream input",
                      message: {
                        confirmation: "Are you sure that you want to delete %(count)s selected HTTP stream input(s)?",
                        acknowledgement: "Deleted %(count)s HTTP stream input(s).",
                        progress: "Deleting in progress…",
                      },
                      action: {
                        proceed: "Delete",
                        cancel: "Cancel",
                        close: "Close",
                      }
                    },

                    create: {
                      header: "Add HTTP stream input",
                      form: {
                        name: {
                          label: "Name",
                        },
                        location: {
                          label: "Location",
                        },
                      },

                      message: {
                        acknowledgement: "HTTP stream input has been added succesfully.",
                      },

                      action: {
                        proceed: "Add HTTP stream input",
                        cancel: "Cancel",
                        close: "Close",
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
