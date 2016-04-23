export default {
  apps: {
    administration: {
      file_repositories: {
        show: {
          tabs: {
            body: {
              export_schema: {
                table: {
                  index: {
                    actions: {
                      create: "Add export field",
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
                            label: "Nazwa pola",
                            hint: "Choose any name that will describe contents of this field, e.g. \"composer\".",
                          },
                          key: {
                            label: "Klucz",
                            hint: "Unique key describing role of this field for the system.",
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
