export default {
  apps: {
    administration: {
      broadcast_channels: {
        show: {
          tabs: {
            headers: {
              streams: "Strumienie",
            },

            body: {
              streams: {
                table: {
                  index: {
                    actions: {
                      create: "Dodaj strumień",
                      delete: "Usuń strumienie",
                    },

                    modals: {
                      create: {
                        header: "Dodawanie strumienia",
                        action: {
                          proceed: "Dodaj strumień",
                          cancel: "Anuluj",
                          close: "Zamknij",
                        },
                        message: {
                          acknowledgement: "Pomyślnie utworzono strumień.",
                        },
                        form: {
                          name: {
                            label: "Nazwa",
                            hint: "Wybierz jakąkolwiek nazwę, która pozwoli Ci odróżnić ten strumień od innych.",
                          },
                          audio_codec: {
                            label: "Kodek",
                            values: {
                              mp3: "MP3",
                            },
                          },
                          audio_quality: {
                            label: "Jakość",
                            values: {
                              medium: "Średnia",
                            },
                          },
                          protocol: {
                            label: "Protokół",
                            values: {
                              http: "HTTP",
                            },
                          },
                        },
                      },
                    },

                    table: {
                      loading: "Ładowanie strumieni...",

                      header: {
                        name: "Nazwa",
                        audio_codec: "Kodek",
                        audio_quality: "Jakość",
                        protocol: "Protokół",
                        public_urls: "Adres publiczny",
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
