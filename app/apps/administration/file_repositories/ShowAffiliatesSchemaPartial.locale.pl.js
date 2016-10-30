export default {
  apps: {
    administration: {
      file_repositories: {
        show: {
          tabs: {
            body: {
              affiliates_schema: {
                table: {
                  index: {
                    actions: {
                      create: "Dodaj wariant",
                    },

                    table: {
                      header: {
                        name: "Nazwa",
                        key: "Klucz",
                        kind: "Rodzaj",
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
                          kind: {
                            label: "Rodzaj",
                            values: {
                              itunes: "iTunes",
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
