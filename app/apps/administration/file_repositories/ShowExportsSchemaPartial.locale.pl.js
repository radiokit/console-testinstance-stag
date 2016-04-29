export default {
  apps: {
    administration: {
      file_repositories: {
        show: {
          tabs: {
            body: {
              exports_schema: {
                table: {
                  index: {
                    actions: {
                      create: "Dodaj eksport",
                    },

                    table: {
                      header: {
                        name: "Nazwa",
                        key: "Klucz",
                        kind: "Rodzaj",
                      }
                    },

                    modals: {
                      create: {
                        header: "Dodaj eksport",
                        action: {
                          proceed: "Dodaj",
                          close: "Close",
                          cancel: "Cancel",
                        },
                        message: {
                          acknowledgement: "Dodano eksport",
                          progress: "Dodawanie eksportów...",
                        },
                        form: {
                          name: {
                            label: "Nazwa",
                            hint: "Nazwa eksportu zrozumiała dla użytkownika.",
                          },
                          key: {
                            label: "Klucz",
                            hint: "Unikalny klucz identyfikujący ten eksport w systemie.",
                          },
                          kind: {
                            label: "Rodzaj",
                            values: {
                              mixcloud: "MixCloud",
                            }
                          },
                        },
                      },
                      delete: {
                        header: "Usuń eksporty",
                        action: {
                          proceed: "Usuń",
                          close: "Zamknij",
                          cancel: "Anuluj",
                        },
                        message: {
                          progress: "Usuwanie eksportów...",
                          confirmation: "Czy napewno chcesz usunąć te eksporty?",
                          acknowledgement: "Usunięto eksporty.",
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
