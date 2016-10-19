export default {
  apps: {
    administration: {
      file_repositories: {
        show: {
          tabs: {
            body: {
              variants_schema: {
                table: {
                  index: {
                    actions: {
                      create: "Add variant",
                    },

                    table: {
                      header: {
                        name: "Name",
                        key: "Key",
                        format_kind: "Format",
                      },
                      loading: "Loading list of variants...",
                    },

                    modals: {
                      create: {
                        header: "Add variant",
                        action: {
                          proceed: "Add variant",
                          close: "Close",
                          cancel: "Cancel",
                        },
                        message: {
                          progress: "Adding variant...",
                          acknowledgement: "Variants were added succesfully.",
                        },
                        form: {
                          name: {
                            label: "Field name",
                            hint: "Choose any name that will allow you to distinguish this variant from another.",
                          },
                          key: {
                            label: "Key",
                          },
                          format_kind: {
                            label: "Value type",
                            values: {
                              mp3: "MP3",
                              opus: "Ogg/Opus",
                            },
                          },
                        },
                      },
                      delete: {
                        header: "Remove variant",
                        action: {
                          proceed: "Remove variant",
                          close: "Close",
                          cancel: "Cancel",
                        },
                        message: {
                          progress: "Deleting variants... ",
                          confirmation: "Do you really want to remove this variant?",
                          acknowledgement: "Variants were succesfully removed.",
                        },
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
