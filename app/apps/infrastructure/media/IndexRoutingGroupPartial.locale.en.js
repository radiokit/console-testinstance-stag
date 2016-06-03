export default {
  apps: {
    infrastructure: {
      media: {
        index: {
          tabs: {
            routing_group: {
              table: {
                index: {
                  actions: {
                    create: "Add routing group",
                    delete: "Delete selected routing groups",
                  },

                  table: {
                    loading: "Fetching list of routing groups",
                    header: {
                      id: "ID",
                      name: "Name",
                      level: "Level",
                    },
                  },

                  modals: {
                    delete: {
                      header: "Delete routing group",
                      message: {
                        confirmation: "Are you sure that you want to delete %(count)s selected routing group(s)?",
                        acknowledgement: "Deleted %(count)s routing group(s).",
                        progress: "Deleting in progress…",
                      },
                      action: {
                        proceed: "Delete",
                        cancel: "Cancel",
                        close: "Close",
                      }
                    },

                    create: {
                      header: "Add routing group",
                      form: {
                        name: {
                          label: "Name",
                        },
                      },

                      message: {
                        acknowledgement: "routing group has been added succesfully.",
                      },

                      action: {
                        proceed: "Add routing group",
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
