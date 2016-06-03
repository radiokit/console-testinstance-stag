export default {
  apps: {
    infrastructure: {
      media: {
        index: {
          tabs: {
            input_file_radiokit_vault: {
              table: {
                index: {
                  actions: {
                    create: "Add RadioKit Vault file input",
                    delete: "Delete selected RadioKit Vault file inputs",
                  },

                  table: {
                    loading: "Fetching list of RadioKit Vault file inputs",
                    header: {
                      id: "ID",
                      name: "Name",
                      file: "File",
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
                      header: "Delete RadioKit Vault file input",
                      message: {
                        confirmation: "Are you sure that you want to delete %(count)s selected RadioKit Vault file input(s)?",
                        acknowledgement: "Deleted %(count)s RadioKit Vault file input(s).",
                        progress: "Deleting in progress…",
                      },
                      action: {
                        proceed: "Delete",
                        cancel: "Cancel",
                        close: "Close",
                      }
                    },

                    create: {
                      header: "Add RadioKit Vault file input",
                      form: {
                        name: {
                          label: "Name",
                        },
                        file: {
                          label: "File",
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
                        acknowledgement: "RadioKit Vault file input has been added succesfully.",
                      },

                      action: {
                        proceed: "Add RadioKit Vault file input",
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
