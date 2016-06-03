export default {
  apps: {
    infrastructure: {
      broadcast_channels: {
        show: {
          tabs: {
            headers: {
              streams: "Streams",
            },

            body: {
              streams: {
                table: {
                  index: {
                    actions: {
                      create: "Add stream",
                      delete: "Delete selected streams",
                    },

                    modals: {
                      delete: {
                        header: "Delete stream",
                        action: {
                          proceed: "Delete",
                          cancel: "Cancel",
                          close: "Close",
                        },
                        message: {
                          confirmation: "Are you sure that you want to delete %(count)s selected stream(s)?",
                          acknowledgement: "Deleted %(count)s stream(s).",
                          progress: "Deleting in progress…",
                        },
                      },
                      create: {
                        header: "Add stream",
                        action: {
                          proceed: "Add stream",
                          cancel: "Cancel",
                          close: "Close",
                        },
                        message: {
                          acknowledgement: "Stream added succesfully",
                        },
                        form: {
                          name: {
                            label: "Name",
                            hint: "Choose any name that will help you to distinguish this stream from others.",
                          },
                          audio_codec: {
                            label: "Codec",
                            values: {
                              mp3: "MP3",
                            },
                          },
                          audio_quality: {
                            label: "Quality",
                            values: {
                              medium: "Medium",
                            },
                          },
                          protocol: {
                            label: "Protocol",
                            values: {
                              http: "HTTP",
                            },
                          },
                        },
                      },
                    },

                    table: {
                      loading: "Loading streams...",

                      header: {
                        name: "Name",
                        audio_codec: "Codec",
                        audio_quality: "Quality",
                        protocol: "Protocol",
                        public_urls: "Public URL",
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
