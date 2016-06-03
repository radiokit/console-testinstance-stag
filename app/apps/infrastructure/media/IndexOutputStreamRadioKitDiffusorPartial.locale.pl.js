export default {
  apps: {
    infrastructure: {
      media: {
        index: {
          tabs: {
            output_stream_radiokit_diffusor: {
              table: {
                index: {
                  actions: {
                    create: "Add RadioKit Diffusor output",
                    delete: "Delete selected RadioKit Diffusor outputs",
                  },

                  table: {
                    loading: "Fetching list of RadioKit Diffusor outputs",
                    header: {
                      id: "ID",
                      name: "Name",
                      mount: "Mount",
                      level: "Level",
                    },
                  },

                  modals: {
                    delete: {
                      header: "Delete RadioKit Diffusor output",
                      message: {
                        confirmation: "Are you sure that you want to delete %(count)s selected RadioKit Diffusor output(s)?",
                        acknowledgement: "Deleted %(count)s RadioKit Diffusor output(s).",
                        progress: "Deleting in progress…",
                      },
                      action: {
                        proceed: "Delete",
                        cancel: "Cancel",
                        close: "Close",
                      }
                    },

                    create: {
                      header: "Add RadioKit Diffusor output",
                      form: {
                        name: {
                          label: "Name",
                        },
                        mount: {
                          label: "Mount"
                        }
                      },

                      message: {
                        acknowledgement: "RadioKit Diffusor output has been added succesfully.",
                      },

                      action: {
                        proceed: "Add RadioKit Diffusor output",
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
