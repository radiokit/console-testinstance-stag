export default {
  apps: {
    administration: {
      file_repositories: {
        show: {
          tabs: {
            body: {
              imports_schema: {
                table: {
                  index: {
                    actions: {
                      create: "Dodaj import",
                    },

                    table: {
                      header: {
                        name: "Nazwa",
                        key: "Klucz",
                        kind: "Rodzaj",
                        connector_settings: "Ustawienia",
                      }
                    },

                    modals: {
                      create: {
                        header: "Dodaj import",
                        action: {
                          proceed: "Dodaj",
                          close: "Close",
                          cancel: "Cancel",
                        },
                        message: {
                          acknowledgement: "Dodano import",
                          progress: "Dodawanie importów...",
                        },
                        form: {
                          name: {
                            label: "Nazwa",
                            hint: "Nazwa importu zrozumiała dla użytkownika.",
                          },
                          json_endpoint: {
                            label: "Endpoint URL",
                          },
                          kind: {
                            label: "Rodzaj",
                            values: {
                              json: "JSON",
                            }
                          },
                        },
                      },

                      delete: {
                        header: "Usuń importy",
                        action: {
                          proceed: "Usuń",
                          close: "Zamknij",
                          cancel: "Anuluj",
                        },
                        message: {
                          progress: "Usuwanie importów...",
                          confirmation: "Czy napewno chcesz usunąć te importy?",
                          acknowledgement: "Usunięto importy.",
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
