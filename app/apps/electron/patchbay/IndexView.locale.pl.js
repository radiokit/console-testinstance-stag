export default {
  apps: {
    electron: {
      patchbay: {
        header: "Krosownica",
        tabs: {
          headers: {
            diagram: "Diagram",
            table: "Tabela",
          },
        },

        update_button: "Edytuj urządzenie",
        modals: {
          update: {
            header: "Edycja urządzenia",

            form: {
              name: {
                label: "Nazwa urządzenia",
              },
            },

            action: {
              proceed: "Edytuj urządzenie",
              cancel: "Anuluj",
              close: "Zamknij",
            },

            message: {
              acknowledgement: "Zapisano zmiany.",
            },

          },

          delete: {
            client: {
              header: "Usuwanie podłączonego urządzenia",
              message: {
                confirmation: "Czy na pewno chcesz usunąć zaznaczone urządzenie?",
                acknowledgement: "Usunięto urządzenie.",
                progress: "Trwa usuwanie urządzenia…",
              },
              action: {
                proceed: "Usuń",
                cancel: "Anuluj",
                close: "Zamknij",
              }
            },

            link: {
              header: "Usuwanie powiązania",
              message: {
                confirmation: "Czy na pewno chcesz usunąć zaznaczone powiązanie?",
                acknowledgement: "Usunięto powiązanie.",
                progress: "Trwa usuwanie powiązania",
              },
              action: {
                proceed: "Usuń",
                cancel: "Anuluj",
                close: "Zamknij",
              }
            }
          }
        },
      },
    }
  }
}
