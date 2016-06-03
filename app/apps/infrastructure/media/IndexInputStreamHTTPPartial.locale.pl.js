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
                    create: "Add HTTP input",
                    delete: "Delete selected HTTP inputs",
                  },

                  table: {
                    loading: "Fetching list of HTTP inputs",
                    header: {
                      id: "ID",
                      name: "Name",
                      location: "Location",
                      level: "Level",
                    },
                  },

                  modals: {
                    delete: {
                      header: "Delete HTTP input",
                      message: {
                        confirmation: "Are you sure that you want to delete %(count)s selected HTTP input(s)?",
                        acknowledgement: "Deleted %(count)s HTTP input(s).",
                        progress: "Deleting in progress…",
                      },
                      action: {
                        proceed: "Delete",
                        cancel: "Cancel",
                        close: "Close",
                      }
                    },

                    create: {
                      header: "Add HTTP input",
                      form: {
                        name: {
                          label: "Name",
                        },
                        location: {
                          label: "Location",
                        },
                      },

                      message: {
                        acknowledgement: "HTTP input has been added succesfully.",
                      },

                      action: {
                        proceed: "Add HTTP input",
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
