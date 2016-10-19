export default {
  apps: {
    administration: {
      file_repositories: {
        show: {
          tabs: {
            body: {
              processing_schema: {
                table: {
                  index: {
                    actions: {
                      create: "Add processor",
                    },

                    table: {
                      header: {
                        name: "Name",
                        kind: "Kind",
                        connector_settings: "Settings",
                      },
                      loading: "Loading list of processors...",
                    },

                    modals: {
                      create: {
                        header: "Add processor",
                        action: {
                          proceed: "Add processor",
                          close: "Close",
                          cancel: "Cancel",
                        },
                        message: {
                          progress: "Adding processor...",
                          acknowledgement: "Processors were added succesfully.",
                        },
                        form: {
                          name: {
                            label: "Field name",
                            hint: "Choose any name that will allow you to distinguish this processor from another.",
                          },
                          kind: {
                            label: "Value type",
                            values: {
                              transcode: {
                                audio: {
                                  webbrowser: "Encoding audio to webbrowser format",
                                },
                              },
                              analysis: {
                                audio: {
                                  duration: "Computing duration",
                                  replaygain: "Computing ReplayGain",
                                  tags: "Extraction of metadata",
                                },
                              },
                            },
                          },
                        },
                      },
                      delete: {
                        header: "Remove processor",
                        action: {
                          proceed: "Remove processor",
                          close: "Close",
                          cancel: "Cancel",
                        },
                        message: {
                          progress: "Deleting processors... ",
                          confirmation: "Do you really want to remove this processor?",
                          acknowledgement: "Processors were succesfully removed.",
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
