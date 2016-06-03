export default {
  apps: {
    infrastructure: {
      media: {
        index: {
          tabs: {
            input_stream_rtp: {
              table: {
                index: {
                  actions: {
                    create: "Add RTP input",
                    delete: "Delete selected RTP inputs",
                  },

                  table: {
                    loading: "Fetching list of RTP inputs",
                    header: {
                      id: "ID",
                      name: "Name",
                      level: "Level",
                    },
                  },

                  modals: {
                    delete: {
                      header: "Delete RTP input",
                      message: {
                        confirmation: "Are you sure that you want to delete %(count)s selected RTP input(s)?",
                        acknowledgement: "Deleted %(count)s RTP input(s).",
                        progress: "Deleting in progress…",
                      },
                      action: {
                        proceed: "Delete",
                        cancel: "Cancel",
                        close: "Close",
                      }
                    },

                    create: {
                      header: "Add RTP input",
                      form: {
                        name: {
                          label: "Name",
                        },
                      },

                      message: {
                        acknowledgement: "RTP input has been added succesfully.",
                      },

                      action: {
                        proceed: "Add RTP input",
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
