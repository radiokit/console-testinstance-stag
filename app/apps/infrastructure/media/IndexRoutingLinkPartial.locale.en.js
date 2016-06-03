export default {
  apps: {
    infrastructure: {
      media: {
        index: {
          tabs: {
            routing_link: {
              table: {
                index: {
                  actions: {
                    create: "Add routing link",
                    delete: "Delete selected routing links",
                  },

                  table: {
                    loading: "Fetching list of routing links",
                    header: {
                      id: "ID",
                      name: "Name",
                      level: "Level",
                      input_stream_rtp_id: "In Stream RTP ID",
                      input_stream_http_id: "In Stream HTTP ID",
                      input_file_http_id: "In File HTTP ID",
                      input_file_radiokit_vault_id: "In File Vault ID",
                      output_stream_rtp_id: "Out Stream RTP ID",
                      output_stream_radiokit_diffusor_id: "Out Stream Diffusor ID",
                      routing_group_id: "Routing Group ID",
                      routing_link_id: "Routing Link ID",

                    },
                  },

                  modals: {
                    delete: {
                      header: "Delete routing link",
                      message: {
                        confirmation: "Are you sure that you want to delete %(count)s selected routing link(s)?",
                        acknowledgement: "Deleted %(count)s routing link(s).",
                        progress: "Deleting in progress…",
                      },
                      action: {
                        proceed: "Delete",
                        cancel: "Cancel",
                        close: "Close",
                      }
                    },

                    create: {
                      header: "Add routing link",
                      form: {
                        name: {
                          label: "Name",
                        },
                        input_stream_rtp_id: {
                          label: "In Stream RTP ID",
                        },
                        input_stream_http_id: {
                          label: "In Stream HTTP ID",
                        },
                        input_file_http_id: {
                          label: "In File HTTP ID",
                        },
                        input_file_radiokit_vault_id: {
                          label: "In File Vault ID",
                        },
                        output_stream_rtp_id: {
                          label: "Out Stream RTP ID",
                        },
                        output_stream_radiokit_diffusor_id: {
                          label: "Out Stream Diffusor ID",
                        },
                        routing_group_id: {
                          label: "Routing Group ID",
                        },
                        routing_link_id: {
                          label: "Routing Link ID",
                        },
                      },

                      message: {
                        acknowledgement: "routing link has been added succesfully.",
                      },

                      action: {
                        proceed: "Add routing link",
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
