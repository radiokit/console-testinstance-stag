export default {
  apps: {
    administration: {
      file_repositories: {
        show: {
          tabs: {
            body: {
              metadata_schema: {
                table: {
                  index: {
                    actions: {
                      create: "Dodaj pole metadanych",
                    },

                    table: {
                      header: {
                        name: "Field name",
                        key: "Key",
                        kind: "Value type",
                      }
                    },

                    modals: {
                      create: {
                        header: "Dodaj pole metadanych",
                        action: {
                          proceed: "Dodaj",
                          close: "Close",
                          cancel: "Cancel",
                        },
                        message: {
                          acknowledgement: "Dodano pole metadanych",
                          progress: "Dodawanie pól metedanych...",
                        },
                        form: {
                          name: {
                            label: "Nazwa pola",
                            hint: "Choose any name that will describe contents of this field, e.g. \"composer\".",
                          },
                          key: {
                            label: "Key",
                            hint: "Unique key describing role of this field for the system.",
                          },
                          kind: {
                            label: "Value type",
                            values: {
                              string: "Text (one line)",
                              db: "Decibels",
                              integer: "Number (integer)",
                              text: "Text (multiline)",
                              float: "Number (with decimal part)",
                              date: "Date",
                              time: "Time",
                              datetime: "Date & Time",
                              url: "URL",
                              duration: "Duration",
                              waveform: "Waveform",
                              image: "Obraz",
                              file: "Plik",
                            }
                          },
                        },
                      },
                      delete: {
                        header: "Usuń pola metadanych",
                        action: {
                          proceed: "Usuń",
                          close: "Zamknij",
                          cancel: "Anuluj",
                        },
                        message: {
                          progress: "Usuwanie pól metadanych...",
                          confirmation: "Czy napewno chcesz usunąć te pola metadanych?",
                          acknowledgement: "Usunięto pola metadanych.",
                        },
                      },
                    },
                  },
                },
              }
            }
          }
        },
      },
    }
  }
}
