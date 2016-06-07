export default {
  apps: {
    infrastructure: {
      broadcast_channels: {
        show: {
          tabs: {
            body: {
              content_types: {
                table: {
                  index: {
                    actions: {
                      create: "Dodaj rodzaj treści",
                      delete: "Usuń zaznaczone rodzaje treści",
                    },

                    modals: {
                      delete: {
                        header: "Usuwanie rodzajów treści",
                        action: {
                          proceed: "Usuń",
                          cancel: "Anuluj",
                          close: "Zamknij",
                        },
                        message: {
                          confirmation: "Czy na pewno chcesz usunąć zaznaczone rodzaje treści (%(count)s szt.)?",
                          acknowledgement: "Usunięto %(count)s rodzajów treści.",
                          progress: "Trwa usuwanie rodzajów treści…",
                        },
                      },
                      create: {
                        header: "Dodawanie rodzajów treści",
                        action: {
                          proceed: "Dodaj rodzaj treści",
                          cancel: "Anuluj",
                          close: "Zamknij",
                        },
                        message: {
                          acknowledgement: "Pomyślnie utworzono rodzaj treści.",
                        },
                        form: {
                          name: {
                            label: "Nazwa",
                            hint: "Wybierz jakąkolwiek nazwę, która pozwoli Ci odróżnić ten rodzaj treści od innych.",
                          },
                        },
                      },
                    },

                    table: {
                      loading: "Ładowanie rodzajów treści...",

                      header: {
                        name: "Nazwa",
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
