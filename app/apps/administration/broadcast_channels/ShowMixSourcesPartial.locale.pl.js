export default {
  apps: {
    administration: {
      broadcast_channels: {
        show: {
          tabs: {
            body: {
              mix_sources: {
                table: {
                  index: {
                    actions: {
                      create: "Dodaj źródło",
                      delete: "Usuń zaznaczone źródła",
                    },

                    modals: {
                      delete: {
                        header: "Usuwanie źródeł",
                        action: {
                          proceed: "Usuń",
                          cancel: "Anuluj",
                          close: "Zamknij",
                        },
                        message: {
                          confirmation: "Czy na pewno chcesz usunąć zaznaczone źródła (%(count)s szt.)?",
                          acknowledgement: "Usunięto %(count)s źródeł.",
                          progress: "Trwa usuwanie źródeł…",
                        },
                      },
                      create: {
                        header: "Dodawanie źródeł",
                        action: {
                          proceed: "Dodaj źródło",
                          cancel: "Anuluj",
                          close: "Zamknij",
                        },
                        message: {
                          acknowledgement: "Pomyślnie utworzono źródło.",
                        },
                        form: {
                          name: {
                            label: "Nazwa",
                            hint: "Wybierz jakąkolwiek nazwę, która pozwoli Ci odróżnić to źródło od innych.",
                          },
                          description: {
                            label: "Opis",
                          },
                          metadata_string: {
                            label: "Metadane",
                          },
                          switch_mount: {
                            label: "Mount na Switchu",
                          },
                        },
                      },
                    },

                    table: {
                      loading: "Ładowanie źródeł...",

                      header: {
                        name: "Nazwa",
                        description: "Opis",
                        metadata_string: "Metadane",
                        switch_mount: "Mount na switchu",
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
