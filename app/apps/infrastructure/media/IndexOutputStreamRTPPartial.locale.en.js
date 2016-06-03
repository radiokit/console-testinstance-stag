export default {
  apps: {
    infrastructure: {
      media: {
        index: {
          tabs: {
            output_stream_rtp: {
              table: {
                index: {
                  actions: {
                    create: "Add RTP output",
                    delete: "Delete selected RTP outputs",
                  },

                  table: {
                    loading: "Fetching list of RTP outputs",
                    header: {
                      id: "ID",
                      name: "Name",
                      level: "Level",
                    },
                  },

                  modals: {
                    delete: {
                      header: "Delete RTP output",
                      message: {
                        confirmation: "Are you sure that you want to delete %(count)s selected RTP output(s)?",
                        acknowledgement: "Deleted %(count)s RTP output(s).",
                        progress: "Deleting in progress…",
                      },
                      action: {
                        proceed: "Delete",
                        cancel: "Cancel",
                        close: "Close",
                      }
                    },

                    create: {
                      header: "Add RTP output",
                      form: {
                        name: {
                          label: "Name",
                        },
                      },

                      message: {
                        acknowledgement: "RTP output has been added succesfully.",
                      },

                      action: {
                        proceed: "Add RTP output",
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
