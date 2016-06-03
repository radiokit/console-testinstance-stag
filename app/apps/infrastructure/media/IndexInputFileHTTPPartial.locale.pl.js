export default {
  apps: {
    infrastructure: {
      media: {
        index: {
          tabs: {
            input_file_http: {
              table: {
                index: {
                  actions: {
                    create: "Add HTTP file input",
                    delete: "Delete selected HTTP file inputs",
                  },

                  table: {
                    loading: "Fetching list of HTTP file inputs",
                    header: {
                      id: "ID",
                      name: "Name",
                      location: "Location",
                      level: "Level",
                      start_at: "Start at",
                      stop_at: "Stop at",
                      cue_in_at: "Cue In at",
                      cue_out_at: "Cue Out at",
                      inserted_at: "Inserted at",
                    },
                  },

                  modals: {
                    delete: {
                      header: "Delete HTTP file input",
                      message: {
                        confirmation: "Are you sure that you want to delete %(count)s selected HTTP file input(s)?",
                        acknowledgement: "Deleted %(count)s HTTP file input(s).",
                        progress: "Deleting in progress…",
                      },
                      action: {
                        proceed: "Delete",
                        cancel: "Cancel",
                        close: "Close",
                      }
                    },

                    create: {
                      header: "Add HTTP file input",
                      form: {
                        name: {
                          label: "Name",
                        },
                        location: {
                          label: "Location",
                        },
                        start_at: {
                          label: "Start at",
                        },
                        stop_at: {
                          label: "Stop at",
                        },
                        cue_in_at: {
                          label: "Cue In at",
                        },
                        cue_out_at: {
                          label: "Cue Out at",
                        },
                      },

                      message: {
                        acknowledgement: "HTTP file input has been added succesfully.",
                      },

                      action: {
                        proceed: "Add HTTP file input",
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
