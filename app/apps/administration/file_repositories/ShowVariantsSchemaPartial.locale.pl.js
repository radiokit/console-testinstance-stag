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
                      create: "Dodaj wariant",
                    },

                    table: {
                      header: {
                        name: "Nazwa",
                        key: "Klucz",
                        format_kind: "Format",
                      },
                      loading: "Ładowanie listy wariantów...",
                    },

                    modals: {
                      create: {
                        header: "Dodaj wariant",
                        action: {
                          proceed: "Dodaj",
                          close: "Close",
                          cancel: "Cancel",
                        },
                        message: {
                          acknowledgement: "Dodano wariant",
                          progress: "Dodawanie wariantów...",
                        },
                        form: {
                          name: {
                            label: "Nazwa",
                            hint: "Nazwa procesora zrozumiała dla użytkownika.",
                          },
                          key: {
                            label: "Klucz",
                          },
                          format_kind: {
                            label: "Rodzaj",
                            values: {
                              mp3: "MP3",
                              opus: "Ogg/Opus",
                            }
                          },
                        },
                      },

                      delete: {
                        header: "Usuń warianty",
                        action: {
                          proceed: "Usuń",
                          close: "Zamknij",
                          cancel: "Anuluj",
                        },
                        message: {
                          progress: "Usuwanie wariantów...",
                          confirmation: "Czy napewno chcesz usunąć te warianty?",
                          acknowledgement: "Usunięto warianty.",
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
